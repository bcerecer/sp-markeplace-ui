import { AptosAccount, AptosClient } from 'aptos';

export class SpacePowderClient {
  spacePowderData = {
    ownerAddress: '0xd8928bd1e4dcf324fc430c19ce9f88564df97a8acfa83a346232f281f997a943',
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
