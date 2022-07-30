type LambdaOptionsType = {
  method: string;
  headers: {};
  body?: string;
};

// TODO: Move to environment variable
export const awsApiEndpoint = 'https://crt8ffw113.execute-api.us-east-1.amazonaws.com/Prod/';

class AwsLambdasClient {
  private static get(methodExecution: string, options: LambdaOptionsType) {
    console.log('Starting AwsLambdasClient get');
    const requestUrl = `${awsApiEndpoint}${methodExecution}`;
    return new Promise<{ success: boolean; body: any }>((res) => {
      fetch(requestUrl, options)
        .then(async (response) => {
          if (!response.ok) {
            console.log('Inside of AwsLambdasClient, response NOT ok get: ', response);
            res({ success: false, body: response.body });
            return;
          }
          console.log('Inside of AwsLambdasClient, response ok get: ', response);
          res({ success: true, body: await response.json() });
        })
        .catch((err) => {
          console.log('error ', err);
          res({ success: false, body: err });
        });
    });
  }

  public static async updateToken(transaction: string, tokenIdString: string) {
    return this.get('token', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transaction: transaction, tokenIdString: tokenIdString }),
    });
  }

  public static async fetchWalletTokens(walletAddress: string) {
    console.log('calling fetchWalletTokens, walletAddress: ', walletAddress);
    return this.get(`tokens?walletAddress=${walletAddress}`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
  }

  public static async submitCollectionForm(
    collectionName: string,
    collectionCreatorAddress: string
  ) {
    console.log('Inside AwsLambdaClient submitCollectionForm');
    return this.get('collection', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        collectionName: collectionName,
        collectionCreatorAddress: collectionCreatorAddress,
      }),
    });
  }
}

export default AwsLambdasClient;
