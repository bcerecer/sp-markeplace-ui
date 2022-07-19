import { AptosAccount, AptosClient } from 'aptos';

type MartianSignParams = {
  func: string;
  args: any[]; // TODO: add proper type. This can be an array of string/buffer/, etc
  type_arguments: string[];
};

export class SpacePowderClient {
  spacePowderData = {
    ownerAddress: '0x069F2CBCF3934C8B6B0FF79F10B5DB1E12CEDFB932F2C74CF365E26CCBE52DC3',
    module: 'FixedPriceSale',
  };
  aptosClient: AptosClient;

  constructor(aptosClient: AptosClient) {
    this.aptosClient = aptosClient;
  }

  async submitTransactionHelper(account: AptosAccount, payload: any) {
    const txn_request = await this.aptosClient.generateTransaction(account.address(), payload);
    const signed_txn = await this.aptosClient.signTransaction(account, txn_request);
    const res = await this.aptosClient.submitTransaction(signed_txn);
    await this.aptosClient.waitForTransaction(res['hash']);
  }

  getListTokenTransactionMartianParams(
    collectionOwnerAddress: string,
    collectionName: string,
    tokenName: string,
    price: number
  ): MartianSignParams {
    return {
      func: `${this.spacePowderData.ownerAddress}::${this.spacePowderData.module}::list_token`,
      args: [
        collectionOwnerAddress,
        Buffer.from(collectionName).toString('hex'),
        Buffer.from(tokenName).toString('hex'),
        price.toString(),
      ],
      type_arguments: [],
    };
  }
  // list_token(seller: &signer, collection_owner_addres: address, collection_name: vector<u8>, token_name: vector<u8>, price: u64)
  async listToken(
    seller: AptosAccount,
    collectionOwnerAddress: string,
    collectionName: string,
    tokenName: string,
    price: number
  ) {
    const payload: {
      function: string;
      arguments: string[];
      type: string;
      type_arguments: any[];
    } = {
      type: 'script_function_payload',
      function: `${this.spacePowderData.ownerAddress}::${this.spacePowderData.module}::list_token`,
      type_arguments: [],
      arguments: [
        collectionOwnerAddress,
        Buffer.from(collectionName).toString('hex'),
        Buffer.from(tokenName).toString('hex'),
        price.toString(),
      ],
    };
    await this.submitTransactionHelper(seller, payload);
  }

  // buy_token(buyer: &signer, seller_addr: address, collection_owner_addres: address, collection_name: vector<u8>, token_name: vector<u8>)
  async buyToken(
    buyer: AptosAccount,
    sellerAddress: string,
    collectionOwnerAddress: string,
    collectionName: string,
    tokenName: string
  ) {
    const payload: {
      function: string;
      arguments: string[];
      type: string;
      type_arguments: any[];
    } = {
      type: 'script_function_payload',
      function: `${this.spacePowderData.ownerAddress}::${this.spacePowderData.module}::buy_token`,
      type_arguments: [],
      arguments: [
        sellerAddress,
        collectionOwnerAddress,
        Buffer.from(collectionName).toString('hex'),
        Buffer.from(tokenName).toString('hex'),
      ],
    };
    await this.submitTransactionHelper(buyer, payload);
  }

  // delist_token(seller: &signer, collection_owner_addres: address, collection_name: vector<u8>, token_name: vector<u8>)
  async delistToken(
    seller: AptosAccount,
    collectionOwnerAddress: string,
    collectionName: string,
    tokenName: string
  ) {
    const payload: {
      function: string;
      arguments: string[];
      type: string;
      type_arguments: any[];
    } = {
      type: 'script_function_payload',
      function: `${this.spacePowderData.ownerAddress}::${this.spacePowderData.module}::delist_token`,
      type_arguments: [],
      arguments: [
        collectionOwnerAddress,
        Buffer.from(collectionName).toString('hex'),
        Buffer.from(tokenName).toString('hex'),
      ],
    };
    await this.submitTransactionHelper(seller, payload);
  }
}
