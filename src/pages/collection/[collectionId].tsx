import React, { useState } from 'react';
import Grid from '@components/Grid/Grid';
import CollectionInfo, { CollectionInfoProps } from '@components/CollectionInfo/CollectionInfo';
import { TokenCardProps } from '@components/Grid/components/TokenCard/TokenCard';
import { supabaseClient } from 'src/utils/supabase';
import { useRouter } from 'next/router';
import { Spinner } from 'flowbite-react';

const getSupaCollection = async (collectionPath: string) => {
  const { data: collectionData } = await supabaseClient
    .from('collections')
    .select('*')
    .eq('path', collectionPath);
  return collectionData;
};

const getSupaTokens = async (collectionName: string) => {
  const { data: tokensData } = await supabaseClient
    .from('tokens')
    .select('*')
    .eq('collection_name', collectionName);
  return tokensData;
};

type Collection = {
  name: string;
  tokensCreated: number;
  likes: number;
  ownerAddress: string;
  description: string;
  path: string;
};

const CollectionPage = (): JSX.Element => {
  const router = useRouter();
  const [collection, setCollection] = useState<Collection>();
  const [collectionTokens, setCollectionTokens] = useState<TokenCardProps[]>();
  const [collectionInfoData, setCollectionInfoData] = useState<CollectionInfoProps>();

  // Only get it the first time
  if (!collection) {
    getSupaCollection(router.asPath.split('/').pop() as string).then((supaCollection: any) => {
      // Make sure that collection exists
      if (supaCollection.length > 0) {
        setCollection({
          name: supaCollection[0].name,
          tokensCreated: supaCollection[0].tokens_created,
          likes: supaCollection[0].likes,
          ownerAddress: supaCollection[0].owner_address,
          description: supaCollection[0].description,
          path: supaCollection[0].path,
        });

        setCollectionInfoData({
          creatorAddress: supaCollection[0].owner_address,
          collectionName: supaCollection[0].name,
          collectionDescription: supaCollection[0].description,
          collectionImgSrc: supaCollection[0].img_url,
          stats: {
            owners: '1',
            floor: '1,000,000',
            listed: '10',
            totalSupply: '27',
          },
        });
      }
    });
  }

  // Collection is fetched
  if (collection && !collectionTokens) {
    getSupaTokens(collection.name).then((supaTokens: any) => {
      // Make sure tokens for collection exists
      if (supaTokens.length > 0) {
        setCollectionTokens(
          supaTokens.map((supaToken: any) => {
            return {
              variant: supaToken.listed ? 'listed' : 'unlisted',
              imgSrc: supaToken.img_url,
              collectionOwnerAddress: supaToken.collection_owner_address,
              collectionName: supaToken.collection_name,
              tokenName: supaToken.name,
              sellerAddress: supaToken.seller_address,
              price: supaToken.price,
            } as TokenCardProps;
          })
        );
      }
    });
  }

  return (
    <div className="w-full flex flex-col">
      {console.log('JSX rendered')}
      {collectionInfoData ? (
        <CollectionInfo {...collectionInfoData} />
      ) : (
        <Spinner aria-label="Spinner" size="xl" />
      )}
      <div className="p-9">
        {collectionTokens ? (
          <Grid items={collectionTokens} />
        ) : (
          <Spinner aria-label="Spinner" size="xl" />
        )}
      </div>
    </div>
  );
};

export default CollectionPage;
