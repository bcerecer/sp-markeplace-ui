import React from 'react';
import { useGlobalState } from '../../utils/state';
import { MartianWalletConnectResponse } from '../../utils/Wallet/martian';

const LandingView = (): JSX.Element => {
  const [wallet, setWallet] = useGlobalState('wallet');

  const getMartianProvider = () => {
    const isMartianWalletInstalled = window.martian;

    if (isMartianWalletInstalled) {
      // Disconnect
      if (wallet.address) {
        window.martian.disconnect();
        setWallet((p) => ({ ...p, address: null }));
        return;
      }

      // Connect
      return window.martian.connect((resp: MartianWalletConnectResponse) => {
        setWallet((p) => ({ ...p, address: resp.address }));
        // 0xc4265dc8a5d90715f8a60bebf16688819427bca928a537ad35f798d4d1267716
      });
    }
    // Wallet not installed, redirect to Martian's website
    window.open('https://www.martianwallet.xyz/', '_blank');
  };

  return (
    <div>
      <button onClick={() => getMartianProvider()}>Connect Martian wallet</button>
      <div>{wallet.address}</div>
    </div>
  );
};

export default LandingView;
