import React from 'react';
import Grid from '../../components/Grid/Grid';
import CollectionInfo from '../../components/CollectionInfo/CollectionInfo';
import { testCollectionInfoData } from '../../components/CollectionInfo/testCollectionInfoData';
import { testItems } from '../../components/Grid/testGridData';

const CollectionPage = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col">
      <CollectionInfo {...testCollectionInfoData} />
      <div className="p-9">
        <Grid items={testItems} />
      </div>
    </div>
  );
};

export default CollectionPage;
