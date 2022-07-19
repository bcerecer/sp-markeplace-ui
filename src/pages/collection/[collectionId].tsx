import React from 'react';
import Grid from '@components/Grid/Grid';
import CollectionInfo from '@components/CollectionInfo/CollectionInfo';
import { useRouter } from 'next/router';
import { TokenCardProps } from '@components/Grid/components/TokenCard/TokenCard';
import { collectionsData } from 'src/data/collectionsData';

// TODO: remove this once we go to database solution
export const getServerSideProps = async () => {
  return {
    props: {
      collections: collectionsData,
    },
  };
};

const fetchedStats = {
  owners: '1',
  floor: '1,000,000',
  listed: '10',
  totalSupply: '27',
};

const CollectionPage = ({ collections }: { collections: any }): JSX.Element => {
  const router = useRouter();

  const collection = collections?.find((collection: any) => collection.path === router.asPath);
  const collectionInfoData = {
    creatorAddress: collection.address,
    collectionName: collection.name,
    collectionDescription: collection.description,
    collectionImgSrc: collection.imgSrc,
    stats: fetchedStats,
  };

  const gridTokensData: TokenCardProps[] = collection.tokens;

  return (
    <div className="w-full flex flex-col">
      <CollectionInfo {...collectionInfoData} />
      <div className="p-9">
        <Grid items={gridTokensData} />
      </div>
    </div>
  );
};

export default CollectionPage;
