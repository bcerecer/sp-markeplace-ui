import { Button, Card, Modal, TextInput } from 'flowbite-react';
import AptCoinLogo from 'public/icons/aptos.svg';
import Image from 'next/image';
import { Wallet, useGlobalState } from 'src/utils/state';
import { useToasts } from '@components/Toast/ToastLayout';
import { useState } from 'react';
import Label from '@components/Label/Label';
import { spacePowderClient } from 'src/utils/aptos';
import { useProfileTokens } from 'src/pages/profile';

export type TokenCardVariant = 'listed' | 'unlisted' | 'toList';

export type TokenCardProps = {
  variant: TokenCardVariant;
  imgSrc: string;
  collectionOwnerAddress: string;
  collectionName: string;
  tokenName: string;
  price?: number;
};

const footerContentSize = 'h-[10px]';

const ListedFooterContent = (props: { tokenName: string; price: number }): JSX.Element => {
  const { tokenName, price } = props;
  const [wallet, _] = useGlobalState('wallet');
  const { addToast } = useToasts();

  const onClickBuyToken = (wallet: Wallet, addToast: any, tokenName: string, price: number) => {
    if (wallet.address) {
      // TODO: get amount of tokens and check if is greater or equal to price. If not, add toast failure saying not enough money
      // add martian transaction and if it fails, show toast saying that transaction failed
      // If transaction succeeds, say nft was successfully bought and update nft to reflect that
      console.log(`id: ${tokenName}, price: ${price}`);
    } else {
      addToast({
        variant: 'info',
        title: 'Wallet not found',
        text: 'Please connect wallet',
      });
    }
    return;
  };

  return (
    <div className={`w-full ${footerContentSize} flex items-center justify-between`}>
      <div>
        <span className="absolute pt-[2px] flex items-center">
          <Image className="" src={AptCoinLogo} width={15} height={15} />
        </span>
        {/* TODO: Refactor this to use ... if it overflows width */}
        <p className="text-sm max-w-[160px] font-bold text-gray-700 dark:text-white pl-[20px]">
          {price}
        </p>
      </div>
      <Button size="xs" onClick={() => onClickBuyToken(wallet, addToast, tokenName, price)}>
        <span className="font-extrabold">Buy</span>
      </Button>
    </div>
  );
};

const ToListFooterContent = (props: TokenCardProps) => {
  const { collectionOwnerAddress, collectionName, tokenName } = props;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { addToast } = useToasts();
  const { removeToken } = useProfileTokens();

  const onClickListToken = () => {
    setIsModalOpen(true);
    return;
  };

  const handleSubmit = (event: any) => {
    // Prevent page refresh
    event.preventDefault();

    const { tokenPrice } = event.target;
    const _tokenPrice: number = tokenPrice.value;

    const isMartianWalletInstalled = window.martian?.address;
    if (isMartianWalletInstalled) {
      const listTokenArgs = spacePowderClient.getListTokenTransactionMartianParams(
        collectionOwnerAddress,
        collectionName,
        tokenName,
        _tokenPrice
      );
      // Connect
      window.martian.signGenericTransaction(
        listTokenArgs.func,
        listTokenArgs.args,
        listTokenArgs.type_arguments,
        (resp: any) => {
          if (resp.status === 200) {
            addToast({
              variant: 'success',
              title: 'Success',
              text: 'NFT listed successfully',
            });
            removeToken(tokenName);
          } else {
            addToast({
              variant: 'failure',
              title: 'Fail',
              text: 'Problem listing NFT',
            });
          }
          setIsModalOpen(false);
        }
      );
      return;
    }
  };

  return (
    <div>
      <div className={`w-full ${footerContentSize} flex items-center justify-center`}>
        <Button size="sm" onClick={() => onClickListToken()}>
          <span className="font-extrabold">Add Listing</span>
        </Button>
      </div>
      {/* Part of modal */}
      <Modal show={isModalOpen} size="md" popup onClose={() => setIsModalOpen(false)}>
        <Modal.Header />
        <div className="w-full flex items-center justify-center absolute top-[10px] pointer-events-none	gap-1">
          <Label className="text-xl font-bold tracking-widest">Add Listing</Label>
        </div>
        <Modal.Body>
          <form
            autoComplete="off"
            className="min-w-[500px] flex flex-col p-3 gap-4 space-y-6 pt-3"
            onSubmit={handleSubmit}
          >
            <div className="w-full flex items-end gap-2">
              <div className="mb-2 block">
                <Label htmlFor="tokenPrice" className="text-lg font-bold">
                  Price:{' '}
                </Label>
              </div>
              {/* TODO: Add a max number to TextInput */}
              <TextInput
                type="number"
                id="tokenPrice"
                placeholder="0.00"
                required={true}
                shadow={true}
              />
            </div>
            <Button size="xl" type="submit">
              <span className="font-extrabold">List Now</span>
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

const getFooterVariant = (tokenCardProps: TokenCardProps): JSX.Element => {
  switch (tokenCardProps.variant) {
    case 'listed':
      return (
        <ListedFooterContent tokenName={tokenCardProps.tokenName} price={tokenCardProps.price} />
      );
    case 'unlisted':
      return <div className={footerContentSize}></div>;
    case 'toList':
      return <ToListFooterContent {...tokenCardProps} />;
    default:
      return <div className={footerContentSize}></div>;
  }
};

const TokenCard = (props: TokenCardProps): JSX.Element => {
  const { imgSrc, collectionName, tokenName } = props;

  const nftCardFooter = getFooterVariant(props);

  return (
    <div className="max-w-sm">
      <Card imgAlt="Meaningful alt text for an image that is not purely decorative" imgSrc={imgSrc}>
        <div className="pb-2">
          <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
            {tokenName}
          </h5>
          <p className="text-xs font-normal text-gray-700 dark:text-gray-400">{collectionName}</p>
        </div>
        {nftCardFooter}
      </Card>
    </div>
  );
};

export default TokenCard;
