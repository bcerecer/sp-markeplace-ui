export type Wallet = {
  address: null | string;
};

export type GlobalState = {
  wallet: Wallet;
};

import { createGlobalState } from 'react-hooks-global-state';

const initialState: GlobalState = {
  wallet: {
    address: null,
  },
};

export const { useGlobalState } = createGlobalState(initialState);
