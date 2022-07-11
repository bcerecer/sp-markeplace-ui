import { AptosAccount, AptosClient, FaucetClient } from 'aptos';

const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';
const FAUCET_URL = process.env.APTOS_FAUCET_URL || 'https://faucet.devnet.aptoslabs.com';

const getAptosClient = (): AptosClient => {
  return new AptosClient(NODE_URL);
};

const getFaucetClient = (): FaucetClient => new FaucetClient(NODE_URL, FAUCET_URL);

export const aptosClient = getAptosClient();
export const aptosFaucetClient = getFaucetClient();

export const fundAptosAccount = async (account: AptosAccount) => {
  await aptosFaucetClient.fundAccount(account.address(), 5000);
};
