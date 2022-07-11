import { Button } from '@material-tailwind/react';
import { useGlobalState } from '../../utils/state';
import { MartianWalletConnectResponse } from '../../utils/Wallet/martian';

export const ConnectWalletButton = (): JSX.Element => {
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
      });
    }
    // Wallet not installed, redirect to Martian's website
    window.open('https://www.martianwallet.xyz/', '_blank');
  };

  return (
    <Button variant="gradient" size="sm" onClick={() => getMartianProvider()}>
      {wallet.address ? 'Disconnect Wallet' : 'Connect Wallet'}
    </Button>
  );
};

export default ConnectWalletButton;
