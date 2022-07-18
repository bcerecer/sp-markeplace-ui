import { Button, Card } from 'flowbite-react';
import AptCoinLogo from 'public/icons/aptos.svg';
import Image from 'next/image';
import { Wallet, useGlobalState } from 'src/utils/state';
import { useToasts } from '@components/Toast/ToastLayout';

export type TokenCardVariant = 'listed' | 'unlisted' | 'toList';

export type TokenCardProps = {
  imgSrc: string;
  name: string;
  price: number;
  collectionName: string;
};

const footerContentSize = 'h-[10px]';

const onClickBuyWallet = (wallet: Wallet, addToast: any, id: string, price: number) => {
  if (wallet.address) {
    // TODO: get amount of tokens and check if is greater or equal to price. If not, add toast failure saying not enough money
    // add martian transaction and if it fails, show toast saying that transaction failed
    // If transaction succeeds, say nft was successfully bought and update nft to reflect that
    console.log(`id: ${id}, price: ${price}`);
  } else {
    addToast({
      variant: 'info',
      title: 'Wallet not found',
      text: 'Please connect wallet',
    });
  }
  return;
};

const ListedFooterContent = (props: { tokenName: string; price: number }): JSX.Element => {
  const { tokenName, price } = props;
  const [wallet, _] = useGlobalState('wallet');
  const { addToast } = useToasts();
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
      <Button size="xs" onClick={() => onClickBuyWallet(wallet, addToast, tokenName, price)}>
        <span className="font-extrabold">Buy</span>
      </Button>
    </div>
  );
};

const ToListFooterContent = (): JSX.Element => {
  return (
    <div className={`w-full ${footerContentSize} flex items-center justify-center`}>
      <Button size="sm">
        <span className="font-extrabold">Add Listing</span>
      </Button>
    </div>
  );
};

const getFooterVariant = (
  variant: TokenCardVariant,
  tokenName: string,
  price: number
): JSX.Element => {
  switch (variant) {
    case 'listed':
      return <ListedFooterContent tokenName={tokenName} price={price} />;
    case 'unlisted':
      return <div className={footerContentSize}></div>;
    case 'toList':
      return <ToListFooterContent />;
    default:
      return <div className={footerContentSize}></div>;
  }
};

const TokenCard = (props: TokenCardProps): JSX.Element => {
  const { imgSrc, name, price, collectionName } = props;

  const nftCardFooter = getFooterVariant(null, name, price);

  return (
    <div className="max-w-sm">
      <Card imgAlt="Meaningful alt text for an image that is not purely decorative" imgSrc={imgSrc}>
        <div className="pb-2">
          <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">{name}</h5>
          <p className="text-xs font-normal text-gray-700 dark:text-gray-400">{collectionName}</p>
        </div>
        {nftCardFooter}
      </Card>
    </div>
  );
};

export default TokenCard;
