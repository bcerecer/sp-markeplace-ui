import React from 'react';
import { Label } from '../../components/Label/Label';
import CollectionsList from '../../components/CollecitonsList/CollectionsList';

const MarketplaceView = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Label className="text-6xl font-extrabold p-4 tracking-wide">MARKETPLACE</Label>
      <Label className="text-xl font-bold p-7">Check out the latest NFT Collections!</Label>
      <CollectionsList />
    </div>
  );
};

export default MarketplaceView;
