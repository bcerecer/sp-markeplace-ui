type LambdaOptionsType = any;

export const awsApiEndpoint = 'https://crt8ffw113.execute-api.us-east-1.amazonaws.com/Prod';

export const awsUpdateTokenEndpoint = `${awsApiEndpoint}/token`;

export const awsUpdateTokenOptions = (
  transaction: string,
  tokenIdString: string
): LambdaOptionsType => {
  return {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transaction: transaction, tokenIdString: tokenIdString }),
  };
};
