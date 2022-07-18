import React from 'react';
import { Label } from '../components/Label/Label';
import CollectionsList from '../components/CollecitonsList/CollectionsList';
import { collectionsData } from '../data/collectionsData';

// TODO: remove this once we go to database solution
export const getStaticProps = async () => {
  return {
    props: {
      collections: collectionsData,
    },
  };
};

const MarketplacePage = ({ collections }: { collections: any }): JSX.Element => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Label className="text-6xl font-extrabold p-4 tracking-wide">MARKETPLACE</Label>
      <Label className="text-xl font-bold p-7">Check out the latest NFT Collections!</Label>
      <CollectionsList collections={collections} />
    </div>
  );
};

export default MarketplacePage;
