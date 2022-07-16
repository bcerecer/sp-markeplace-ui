import React from 'react';
import NftsGrid from '../../components/NftsGrid/NftsGrid';
import CollectionInfo from '../../components/CollectionInfo/CollectionInfo';

const CollectionPage = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col">
      <CollectionInfo />
      <div className="p-9">
        <NftsGrid />
      </div>
    </div>
  );
};

export default CollectionPage;
