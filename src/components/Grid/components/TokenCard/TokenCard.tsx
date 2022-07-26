import { Button, Card, Modal, TextInput } from 'flowbite-react';
import AptCoinLogo from 'public/icons/aptos.svg';
import Image from 'next/image';
import { Wallet, useGlobalState } from 'src/utils/state';
import { useToasts } from '@components/Toast/ToastLayout';
import { useState } from 'react';
import Label from '@components/Label/Label';
import { spacePowderClient } from 'src/utils/aptos';
import { useProfileTokens } from 'src/pages/profile';
import { supabaseClient } from 'src/utils/supabase';
import { awsUpdateTokenEndpoint, awsUpdateTokenOptions } from 'src/utils/aws';

export type TokenCardVariant = 'listed' | 'unlisted' | 'toList';

export type TokenCardProps = {
  variant: TokenCardVariant;
  imgSrc: string;
  collectionCreatorAddress: string;
  collectionName: string;
  tokenName: string;
  sellerAddress?: string;
  price?: number;
};

const footerContentSize = 'h-[10px]';

const ListedFooterContent = (props: TokenCardProps): JSX.Element => {
  const { collectionCreatorAddress, collectionName, tokenName, sellerAddress, price } = props;
  const [wallet, _] = useGlobalState('wallet');
  const { addToast } = useToasts();

  const onClickBuyToken = (
    sellerAddress: string,
    wallet: Wallet,
    addToast: any,
    tokenName: string
  ) => {
    if (wallet.address) {
      // TODO: get amount of tokens and check if is greater or equal to price. If not, add toast failure saying not enough money
      // add martian transaction and if it fails, show toast saying that transaction failed
      // If transaction succeeds, say nft was successfully bought and update nft to reflect that

      const payload = spacePowderClient.getBuyTokenPayload(
        sellerAddress,
        collectionCreatorAddress,
        collectionName,
        tokenName
      );
      window.martian.signGenericTransaction(payload).then(async (resp: any) => {
        const currentTime = new Date().toISOString();
        if (resp.success) {
          console.log(`tokenId: ${collectionCreatorAddress}::${collectionName}::${tokenName}`);
          console.log(`transactions: `, resp.txnHash);
          const transaction = resp.txnHash;
          const tokenId = `${collectionCreatorAddress}::${collectionName}::${tokenName}`;

          const options = awsUpdateTokenOptions(transaction, tokenId);
          console.log('options: ', options);
          console.log('JSON.stringify(options): ', JSON.stringify(options));
          await fetch(awsUpdateTokenEndpoint, options).then((response) =>
            console.log('aws update response: ', JSON.stringify(response))
          );

          addToast({
            variant: 'success',
            title: 'Success',
            text: 'NFT  bought successfully',
          });

          await supabaseClient.from('transactions').insert({
            txn_hash: resp.txnHash,
            token_id: `${collectionCreatorAddress}::${collectionName}::${tokenName}`,
            created_at: currentTime,
          });

          // TODO: update token from collection
        } else {
          addToast({
            variant: 'failure',
            title: 'Error',
            text: 'Problem buying NFT.',
          });
        }
      });
      return;
    } else {
      addToast({
        variant: 'info',
        title: 'Connect wallet',
        text: 'Connect wallet to continue',
      });
    }
  };

  const onClickDelistToken = (sellerAddress: string, addToast: any, tokenName: string) => {
    const payload = spacePowderClient.getDelistTokenPayload(
      collectionCreatorAddress,
      collectionName,
      tokenName
    );
    window.martian.signGenericTransaction(payload).then(async (resp: any) => {
      const currentTime = new Date().toISOString();
      if (resp.success) {
        await supabaseClient
          .from('tokens')
          .update({
            listed: false,
            holder_address: wallet.address,
            seller_address: null,
            price: null,
            updated_at: currentTime,
          })
          .match({ id: `${collectionCreatorAddress}::${collectionName}::${tokenName}` });

        addToast({
          variant: 'success',
          title: 'Success',
          text: 'NFT  delisted successfully',
        });

        await supabaseClient.from('transactions').insert({
          txn_hash: resp.txnHash,
          token_id: `${collectionCreatorAddress}::${collectionName}::${tokenName}`,
          created_at: currentTime,
        });

        // TODO: update token from collection in view
      } else {
        addToast({
          variant: 'failure',
          title: 'Error',
          text: 'Problem delisting NFT',
        });
      }
    });
    return;
  };

  return (
    <div className={`w-full ${footerContentSize} flex items-center justify-between`}>
      {sellerAddress && wallet.address === sellerAddress ? (
        <>
          {/* Connected address owns this token*/}
          <div className={`w-full ${footerContentSize} flex items-center justify-center`}>
            <Button
              size="sm"
              onClick={() => onClickDelistToken(sellerAddress, addToast, tokenName)}
            >
              <span className="font-extrabold">Delist</span>
            </Button>
          </div>
        </>
      ) : (
        <>
          {/* Connected address doesn't own this token*/}
          <div>
            <span className="absolute pt-[2px] flex items-center">
              <Image className="" src={AptCoinLogo} width={15} height={15} />
            </span>
            {/* TODO: Refactor this to use ... if it overflows width */}
            <p className="text-sm max-w-[160px] font-bold text-gray-700 dark:text-white pl-[20px]">
              {price}
            </p>
          </div>
          <Button
            size="xs"
            onClick={() =>
              onClickBuyToken(sellerAddress as string, wallet, addToast, tokenName, price as number)
            }
          >
            <span className="font-extrabold">Buy</span>
          </Button>
        </>
      )}
    </div>
  );
};

const ToListFooterContent = (props: TokenCardProps) => {
  const { collectionCreatorAddress, collectionName, tokenName } = props;
  const [wallet, _] = useGlobalState('wallet');
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

    if (wallet.address) {
      const payload = spacePowderClient.getListTokenPayload(
        collectionCreatorAddress,
        collectionName,
        tokenName,
        _tokenPrice
      );
      // Connect
      window.martian.signGenericTransaction(payload).then(async (resp: any) => {
        if (resp.success) {
          console.log(`tokenId: ${collectionCreatorAddress}::${collectionName}::${tokenName}`);
          console.log(`transactions: `, resp.txnHash);
          const transaction = resp.txnHash;
          const tokenId = `${collectionCreatorAddress}::${collectionName}::${tokenName}`;

          const options = awsUpdateTokenOptions(transaction, tokenId);
          console.log('options: ', options);
          console.log('JSON.stringify(options): ', JSON.stringify(options));
          await fetch(awsUpdateTokenEndpoint, options).then((response) =>
            console.log('aws update response: ', JSON.stringify(response))
          );

          addToast({
            variant: 'success',
            title: 'Success',
            text: 'NFT listed successfully',
          });
          removeToken(tokenName);
        } else {
          addToast({
            variant: 'failure',
            title: 'Error',
            text: 'Problem listing NFT',
          });
        }
        setIsModalOpen(false);
      });
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
      return <ListedFooterContent {...tokenCardProps} />;
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
