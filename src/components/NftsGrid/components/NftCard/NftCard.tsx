import { Button, Card } from 'flowbite-react';
import AptCoinLogo from '../../../../../public/icons/aptos.svg';
import Image from 'next/image';

const imageSrc =
  'https://gzgejuiyhnmaibaxoczu.supabase.co/storage/v1/object/public/cdn/apto-punks/punk-23.png';

const NftCard = (): JSX.Element => {
  return (
    <div className="max-w-sm">
      <Card
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={imageSrc}
      >
        <div>
          <h5 className="text-md font-bold tracking-tight text-gray-900 dark:text-white">
            SMB #224
          </h5>
          <p className="text-xs font-normal text-gray-700 dark:text-gray-400">
            Solana Monkey Business
          </p>
        </div>
        <div className="w-full flex justify-between">
          <div>
            <span className="absolute pt-[5px] flex items-center">
              <Image className="" src={AptCoinLogo} width={15} height={15} />
            </span>
            {/* TODO: Refactor this to use ... if it overflows width */}
            <p className="text-smd max-w-[160px] font-bold text-gray-700 dark:text-white pl-[20px]">
              50000000
            </p>
          </div>
          <Button size="xs">BUY</Button>
        </div>
      </Card>
    </div>
  );
};

export default NftCard;
