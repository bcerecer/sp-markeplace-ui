import CollectionCard, {
  CollectionCardProps,
} from 'src/components/Grid/components/CollectionCard/CollectionCard';
import TokenCard, { TokenCardProps } from './components/TokenCard/TokenCard';

type GridProps =
  | {
      variant: 'tokens';
      items: TokenCardProps[];
    }
  | {
      variant: 'collections';
      items: CollectionCardProps[];
    };

const Grid = (props: GridProps): JSX.Element => {
  const { items, variant } = props;
  // TODO: Grid adds extra spaces for big screens and they might be unused. For example, 10xl screen seeing a 5 nfts collection
  return (
    <div className="w-full flex items-center">
      <div className="container mx-auto">
        {variant === 'tokens' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 5xl:grid-cols-10 6xl:grid-cols-12 7xl:grid-cols-14 8xl:grid-cols-16 9xl:grid-cols-18 10xl:grid-cols-20 gap-6">
            {items
              .sort((a) => {
                return a.variant === 'listed' ? -1 : 1;
              })
              .map((token) => (
                <div key={token.tokenName} className="flex justify-center ">
                  <TokenCard {...token}></TokenCard>
                </div>
              ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl:grid-cols-7 4xl:grid-cols-8 5xl:grid-cols-10 6xl:grid-cols-12 7xl:grid-cols-14 8xl:grid-cols-16 9xl:grid-cols-18 10xl:grid-cols-12 gap-6">
            {items.map((collection) => (
              <div key={collection.path}>
                <CollectionCard {...collection}></CollectionCard>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Grid;
