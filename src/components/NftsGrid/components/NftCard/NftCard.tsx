import { Button, Card } from 'flowbite-react';

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
        <div className="w-full flex items-center justify-between">
          {/* TODO: Refactor this to use ... if it overflows width */}
          <p className="text-smd max-w-[160px] font-bold text-gray-700 dark:text-white">
            50000000005
          </p>
          <Button size="xs">BUY</Button>
        </div>
      </Card>
    </div>
  );
};

export default NftCard;
