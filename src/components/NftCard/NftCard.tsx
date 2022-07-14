import { Card } from 'flowbite-react';

const imageSrc =
  'https://gzgejuiyhnmaibaxoczu.supabase.co/storage/v1/object/public/cdn/apto-punks/punk-23.png';

const NftCard = (): JSX.Element => {
  return (
    <div className="max-w-sm">
      <Card
        imgAlt="Meaningful alt text for an image that is not purely decorative"
        imgSrc={imageSrc}
      >
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Noteworthy technology acquisitions 2021
        </h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse
          chronological order.
        </p>
      </Card>
    </div>
  );
};

export default NftCard;
