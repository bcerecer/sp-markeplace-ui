import React from 'react';
import Grid from '../../components/Grid/Grid';
import CollectionInfo from '../../components/CollectionInfo/CollectionInfo';
import { testItems } from '../../components/Grid/gridTestData';

const CollectionPage = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col">
      <CollectionInfo />
      <div className="p-9">
        <Grid items={testItems} />
      </div>
    </div>
  );
};

export default CollectionPage;
