import { Button, Card } from 'flowbite-react';
import AptCoinLogo from '../../../../../public/icons/aptos.svg';
import Image from 'next/image';

export type TokenCardVariant = 'listed' | 'unlisted' | 'toList';

type TokenCardProps = {
  variant: TokenCardVariant;
  imgSrc: string;
  name: string;
  price: number;
  collectionName: string;
};

const footerContentSize = 'h-[10px]';
const ListedFooterContent = (props: { price: number }): JSX.Element => {
  return (
    <div className={`w-full ${footerContentSize} flex items-center justify-between`}>
      <div>
        <span className="absolute pt-[2px] flex items-center">
          <Image className="" src={AptCoinLogo} width={15} height={15} />
        </span>
        {/* TODO: Refactor this to use ... if it overflows width */}
        <p className="text-sm max-w-[160px] font-bold text-gray-700 dark:text-white pl-[20px]">
          {props.price}
        </p>
      </div>
      <Button size="xs">
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

const getFooterVariant = (variant: TokenCardVariant, price: number): JSX.Element => {
  switch (variant) {
    case 'listed':
      return <ListedFooterContent price={price} />;
    case 'unlisted':
      return <div className={footerContentSize}></div>;
    case 'toList':
      return <ToListFooterContent />;
    default:
      return <div className={footerContentSize}></div>;
  }
};

const TokenCard = (props: TokenCardProps): JSX.Element => {
  const { variant, imgSrc, name, price, collectionName } = props;

  const nftCardFooter = getFooterVariant(variant, price);

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
