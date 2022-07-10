import { Button, Card, CardBody, CardFooter, Typography } from '@material-tailwind/react';
import Image from 'next/image';

const imageSrc =
  'https://gzgejuiyhnmaibaxoczu.supabase.co/storage/v1/object/public/cdn/apto-punks/punk-23.png';

const NftCard = (): JSX.Element => {
  return (
    <Card className="mt-6 w-96">
      <Image
        layout="intrinsic"
        width={500}
        height={500}
        loader={() => imageSrc}
        src={imageSrc}
        className="rounded-lg"
      />
      <CardBody className="text-center">
        <Typography variant="h5" className="mb-2">
          NFT Name
        </Typography>
        <Typography>NFT Collection Name</Typography>
      </CardBody>
      <CardFooter divider className="flex items-center justify-between py-3">
        <div className="w-full h-full flex justify-between">
          <Typography>$Price</Typography>
          <Button size="sm">Details</Button>
        </div>
      </CardFooter>
    </Card>
  );
};

export default NftCard;
