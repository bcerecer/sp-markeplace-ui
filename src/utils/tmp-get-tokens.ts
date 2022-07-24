import { WalletClient } from '@martiandao/aptos-web3-bip44.js';
import { AptosClient } from 'aptos';

/*
 TODO: Create task to check this
 This is probably just a temporary fix since rn MartianWallet doesn't properly fetch tokens as they compare if a DepositEvent = WithdrawalEvent
  and if that the case, they assume user doesn't has the token, but they don't check how many events of each can be (i.e 2 DepositEvent != 1 WithdrawalEvent)
  In this case, the user has the token
 */
// returns a list of token IDs of the tokens in a user's account (including the tokens that were minted)

type TokenId = {
  creator: string;
  collection: string;
  name: string;
};

const getTokenIdString = (tokenId: TokenId) => {
  return `${tokenId.creator}::${tokenId.collection}::${tokenId.name}`;
};

const getTokenIdFromString = (tokenIdString: string): TokenId => {
  const splittedTokenId = tokenIdString.split('::', 3);
  return {
    creator: splittedTokenId[0],
    collection: splittedTokenId[1],
    name: splittedTokenId[2],
  };
};

export class LocalGetTokensClient {
  aptosClient: AptosClient;
  martianWalletClient: WalletClient;

  constructor(aptosClient: AptosClient, martianWalletClient: WalletClient) {
    this.aptosClient = aptosClient;
    this.martianWalletClient = martianWalletClient;
  }

  getEventStream = async (address: string, eventHandleStruct: string, fieldName: string) => {
    // TODO: this is a soft limit as if not provided, the events call has a limit of 25 only
    const limit = 1000;
    const response = await fetch(
      `${this.aptosClient.nodeUrl}/accounts/${address}/events/${eventHandleStruct}/${fieldName}?limit=${limit}`,
      {
        method: 'GET',
      }
    );

    if (response.status == 404) {
      return [];
    }

    return await response.json();
  };

  // returns a list of token IDs of the tokens in a user's account (including the tokens that were minted)
  async getTokenIds(address: string) {
    const depositEvents = await this.getEventStream(
      address,
      '0x1::token::TokenStore',
      'deposit_events'
    );
    const depositEventsMap = new Map<string, number>();
    depositEvents.map((depositEvent: any) => {
      const tokenIdString = getTokenIdString(depositEvent.data.id);
      const value = depositEventsMap.has(tokenIdString)
        ? (depositEventsMap.get(tokenIdString) as number)
        : 0;
      depositEventsMap.set(tokenIdString, value + 1);
    });

    const withdrawEvents = await this.getEventStream(
      address,
      '0x1::token::TokenStore',
      'withdraw_events'
    );
    const withdrawEventsMap = new Map<string, number>();
    withdrawEvents.map((withdrawEvent: any) => {
      const tokenIdString = getTokenIdString(withdrawEvent.data.id);
      const value = withdrawEventsMap.has(tokenIdString)
        ? (withdrawEventsMap.get(tokenIdString) as number)
        : 0;
      withdrawEventsMap.set(tokenIdString, value + 1);
    });

    const tokenIds: TokenId[] = [];

    depositEventsMap.forEach((depositEventsNumber, tokenIdString) => {
      const matchingWithdrawalEventsNumber = withdrawEventsMap.has(tokenIdString)
        ? (withdrawEventsMap.get(tokenIdString) as number)
        : 0;
      if (depositEventsNumber > matchingWithdrawalEventsNumber) {
        tokenIds.push(getTokenIdFromString(tokenIdString));
      }
    });

    return tokenIds;
  }

  async getTokens(address: string) {
    const tokenIds = await this.getTokenIds(address);
    const tokens = [];
    for (const tokenId of tokenIds) {
      const resources: any[] = await this.aptosClient.getAccountResources(tokenId.creator);
      const accountResource: { type: string; data: any } = resources.find(
        (r) => r.type === '0x1::token::Collections'
      );

      const tableItemRequest: Types.TableItemRequest = {
        key_type: '0x1::token::TokenId',
        value_type: '0x1::token::TokenData',
        key: tokenId,
      };
      const token = (
        await this.aptosClient.getTableItem(
          accountResource.data.token_data.handle,
          tableItemRequest
        )
      ).data;

      const collectionData = await this.martianWalletClient.getCollection(
        tokenId.creator,
        token.collection
      );
      token.collectionData = collectionData;
      tokens.push(token);
    }
    return tokens;
  }
}
