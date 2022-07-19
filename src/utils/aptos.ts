import { AptosClient, FaucetClient, TokenClient } from 'aptos';
import { WalletClient } from '@martiandao/aptos-web3-bip44.js';
import { SpacePowderClient } from 'src/blockchain/space-powder/fixed-price-sale';

export const NODE_URL = process.env.APTOS_NODE_URL || 'https://fullnode.devnet.aptoslabs.com';
export const FAUCET_URL = process.env.APTOS_FAUCET_URL || 'https://faucet.devnet.aptoslabs.com';
export const TOKEN_STORE = '0x1::Token::TokenStore';

/**************** APTOS ****************/

const getAptosClient = (): AptosClient => {
  return new AptosClient(NODE_URL);
};
export const aptosClient = getAptosClient();

const getFaucetClient = (): FaucetClient => new FaucetClient(NODE_URL, FAUCET_URL);
export const aptosFaucetClient = getFaucetClient();

const getTokenClient = (): TokenClient => new TokenClient(aptosClient);
export const aptosTokenClient = getTokenClient();

/**************** MARTIAN ****************/

const getMartianWalletClient = () => new WalletClient(NODE_URL, FAUCET_URL);
export const martianWalletClient = getMartianWalletClient();

const getMartianTokenClient = () => new TokenClient(aptosClient);
export const martianTokenClient = getMartianTokenClient();

/**************** SPACE POWDER ****************/

const getSpacePowderClient = () => new SpacePowderClient(aptosClient);
export const spacePowderClient = getSpacePowderClient();
