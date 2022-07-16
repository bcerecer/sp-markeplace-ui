import { Modal, Spinner } from 'flowbite-react';
import React, { useState } from 'react';
import { Label } from '../Label/Label';
import Image from 'next/image';
import AptosLogo from '../../../public/icons/aptos.svg';
import MartianLogo from '../../../public/icons/martian.svg';
import { Wallet, useGlobalState } from '../../utils/state';
import { MartianWalletConnectResponse } from '../../utils/Wallet/martian';
import { useToasts } from '../Toast/ToastLayout';

// TODO: Refactor this component into two separate components once proper global state management is added

// Part of connect button logic
const walletDisconnectedToast = {
  variant: 'disconnected',
  title: 'Disconnected',
  text: 'Wallet has been disconnected',
};

// Part of modal logic
const walletNotInstalledToast = {
  variant: 'info',
  title: 'Martian wallet required',
  text: 'Redirecting to Martian Wallet page',
};
const walletConnectedToast = {
  variant: 'connected',
  title: 'Connected',
  text: 'Wallet has been connected',
};

const availableWallets = [
  {
    icon: MartianLogo,
    name: 'Martian',
    website: 'martianwallet.xyz ',
    connect: (
      wallet: Wallet,
      setWallet: (u: React.SetStateAction<Wallet>) => void,
      addToast: any
    ) => {
      const isMartianWalletInstalled = window.martian;

      if (isMartianWalletInstalled) {
        // Connect
        window.martian.connect((resp: MartianWalletConnectResponse) => {
          setWallet((p) => ({ ...p, address: resp.address }));
          addToast(walletConnectedToast);
        });
        return;
      }
      // Wallet not installed, redirect to Martian's website
      addToast(walletNotInstalledToast);
      setTimeout(() => {
        window.open('https://www.martianwallet.xyz/', '_blank');
      }, 2300);
    },
  },
  /*
  {
    icon: FewchaLogo,
    name: 'Fewcha',
    website: 'fewcha.app',
  },
  */
];

export const ConnectWalletButton = (): JSX.Element => {
  const [wallet, setWallet] = useGlobalState('wallet');
  const { addToast } = useToasts();
  // Part of modal logic
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);

  // Part of connect button logic
  const connectButtonClick = () => {
    const isMartianWalletInstalled = window.martian;

    if (!wallet.address) {
      // Open ConnectWalletModal
      setIsModalOpen(true);
      return;
    }

    if (isMartianWalletInstalled) {
      // Disconnect
      if (wallet.address) {
        window.martian.disconnect();
        setWallet((p) => ({ ...p, address: null }));
        addToast(walletDisconnectedToast);
        return;
      }
    }
  };

  // TOOD: Refactor to use Button from flowbite-react once they allow do pass className (need w-full)
  return (
    <>
      {/* Part of connect button */}
      <div className="w-[140px]">
        <button
          type="button"
          className="w-full inline-flex items-center px-3 py-2 border border-transparent shadow-sm text-base font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700"
          onClick={() => connectButtonClick()}
        >
          <div className="pr-[6px]">
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
                strokeWidth="1.9"
                strokeLinejoin="round"
              />
              <path
                d="M19 7.5V6.5C19 5.39543 18.1046 4.5 17 4.5H5C3.89543 4.5 3 5.39543 3 6.5V7.5"
                stroke="white"
                strokeWidth="1.9"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="w-full text-base">{wallet.address ? 'Disconnect' : 'Connect'}</div>
        </button>
      </div>
      {/* Part of modal */}
      {!wallet.address && (
        <Modal show={isModalOpen} size="md" popup onClose={() => setIsModalOpen(false)}>
          <Modal.Header />
          <div className="w-full flex items-center justify-center absolute top-[10px] pointer-events-none	">
            <Image src={AptosLogo} width={35} height={35} />
            <Label className="text-xl font-bold tracking-widest">APTOS</Label>
          </div>
          {/* TODO: Come up with a solution to handle as many overflowing wallets nicely */}
          <Modal.Body>
            <div className="w-full space-y-6 pt-3">
              <div className="max-h-[500px] w-full space-y-6 px-6  overflow-y-auto ">
                <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                  Select your wallet
                </h3>
                <div>
                  {availableWallets.map((walletProvider) => {
                    return (
                      <div
                        key={walletProvider.name}
                        className="flex gap-4 p-3 rounded-lg hover:bg-gray-600 cursor-pointer"
                        onClick={() => {
                          setIsConnecting(true);
                          walletProvider.connect(wallet, setWallet, addToast);
                          setIsConnecting(false);
                          setIsModalOpen(false);
                        }}
                      >
                        {isConnecting ? (
                          <Spinner aria-label="Default status example" />
                        ) : (
                          <Image src={walletProvider.icon} width={35} height={35} />
                        )}
                        <div className="flex flex-col">
                          <Label className="cursor-pointer">{walletProvider.name}</Label>
                          <Label className="text-xs font-light cursor-pointer">
                            {walletProvider.website}
                          </Label>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      )}
    </>
  );
};

export default ConnectWalletButton;
