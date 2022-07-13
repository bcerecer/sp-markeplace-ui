import { Button } from '@material-tailwind/react';
import { useGlobalState } from '../../../../utils/state';
import { MartianWalletConnectResponse } from '../../../../utils/Wallet/martian';

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
    <Button
      variant="gradient"
      size="sm"
      fullWidth
      onClick={() => getMartianProvider()}
      className="flex items-center"
    >
      <div className="pr-[5px]">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M3 7.5H18.5C19.8807 7.5 21 8.61929 21 10V17C21 18.3807 19.8807 19.5 18.5 19.5H5.5C4.11929 19.5 3 18.3807 3 17V7.5Z"
            stroke="white"
            stroke-width="1.25"
            stroke-linejoin="round"
          />
          <path
            d="M19 7.5V6.5C19 5.39543 18.1046 4.5 17 4.5H5C3.89543 4.5 3 5.39543 3 6.5V7.5"
            stroke="white"
            stroke-width="1.25"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </div>
      <div className="w-full">{wallet.address ? 'Disconnect' : 'Connect'}</div>
    </Button>
  );
};

export default ConnectWalletButton;
