import { Button, Modal } from 'flowbite-react';
import React, { useState } from 'react';
import { Label } from '../../Label/Label';
import Image from 'next/image';
import AptosLogo from '../../../../public/icons/aptos.svg';
import MartianLogo from '../../../../public/icons/martian.svg';
import { Wallet, useGlobalState } from '../../../utils/state';
import { MartianWalletConnectResponse } from '../../../utils/Wallet/martian';

const availableWallets = [
  {
    icon: MartianLogo,
    name: 'Martian',
    website: 'martianwallet.xyz ',
    connect: (wallet: Wallet, setWallet: (u: React.SetStateAction<Wallet>) => void) => {
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

const ConnectWalletModal = () => {
  const [wallet, setWallet] = useGlobalState('wallet');
  const [openModal, setOpenModal] = useState<string | undefined>();

  return (
    <>
      <Button onClick={() => setOpenModal('connect-wallet')}>Toggle modal</Button>
      <Modal
        show={openModal === 'connect-wallet'}
        size="md"
        popup
        onClose={() => setOpenModal(undefined)}
      >
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
                      className="flex gap-4 p-3 rounded-lg hover:bg-gray-600 cursor-pointer"
                      onClick={() => walletProvider.connect(wallet, setWallet)}
                    >
                      <Image src={walletProvider.icon} width={35} height={35} />
                      <div className="flex flex-col">
                        <Label>{walletProvider.name}</Label>
                        <Label className="text-xs font-light">{walletProvider.website}</Label>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ConnectWalletModal;
