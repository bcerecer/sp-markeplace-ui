import TokenCard from './components/TokenCard/TokenCard';
import { TokenCardVariant } from './components/TokenCard/TokenCard';

const items = [
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '10',
  '11',
  '12',
  '13',
  '14',
  '15',
  '16',
  '17',
  '18',
];

const tokenCardProps = {
  variant: 'listed' as TokenCardVariant,
  imgSrc:
    'https://gzgejuiyhnmaibaxoczu.supabase.co/storage/v1/object/public/cdn/apto-punks/punk-23.png',
  id: '1',
  name: 'Solana token name #1',
  price: 5000,
  collectionName: 'Test Collection Name',
};

const NftsGrid = (): JSX.Element => {
  // TODO: Grid adds extra spaces for big screens and they might be unused. For example, 10xl screen seeing a 5 nfts collection
  return (
    <div className="w-full flex items-center">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 5xl:grid-cols-10 6xl:grid-cols-12 7xl:grid-cols-14 8xl:grid-cols-16 9xl:grid-cols-18 10xl:grid-cols-20 gap-6">
          {items.map((item) => (
            <div key={item} className="flex justify-center ">
              <TokenCard {...tokenCardProps}></TokenCard>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NftsGrid;
