import { Button, Card } from 'flowbite-react';
import AptCoinLogo from '../../../../../public/icons/aptos.svg';
import Image from 'next/image';
import { Wallet, useGlobalState } from '../../../../utils/state';
import { useToasts } from '../../../Toast/ToastLayout';

export type TokenCardVariant = 'listed' | 'unlisted' | 'toList';

type TokenCardProps = {
  variant: TokenCardVariant;
  imgSrc: string;
  id: string;
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

const ListedFooterContent = (props: { id: string; price: number }): JSX.Element => {
  const { id, price } = props;
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
      <Button size="xs" onClick={() => onClickBuyWallet(wallet, addToast, id, price)}>
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

const getFooterVariant = (variant: TokenCardVariant, id: string, price: number): JSX.Element => {
  switch (variant) {
    case 'listed':
      return <ListedFooterContent id={id} price={price} />;
    case 'unlisted':
      return <div className={footerContentSize}></div>;
    case 'toList':
      return <ToListFooterContent />;
    default:
      return <div className={footerContentSize}></div>;
  }
};

const TokenCard = (props: TokenCardProps): JSX.Element => {
  const { variant, imgSrc, id, name, price, collectionName } = props;

  const nftCardFooter = getFooterVariant(variant, id, price);

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