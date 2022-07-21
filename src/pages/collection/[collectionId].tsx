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
  imgSrc: string;
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
          imgSrc: supaCollection[0].img_url,
        });
      }
    });
  }

  // Collection is fetched
  if (collection && !collectionTokens) {
    // Stats
    let listedTokens = 0;
    let floor = 0;
    const ownersSet = new Set();
    getSupaTokens(collection.name).then((supaTokens: any) => {
      // Make sure tokens for collection exists
      if (supaTokens.length > 0) {
        setCollectionTokens(
          supaTokens.map((supaToken: any) => {
            if (supaToken.listed) {
              listedTokens++;
            }
            if (supaToken.price) {
              floor = Math.min(supaToken.price, floor);
            }
            ownersSet.add(supaToken.holder_address);

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
      setCollectionInfoData({
        creatorAddress: collection.ownerAddress,
        collectionName: collection.name,
        collectionDescription: collection.description,
        collectionImgSrc: collection.imgSrc,
        stats: {
          owners: ownersSet.size,
          floor: listedTokens === 0 ? 'N/A' : floor.toString(),
          listed: listedTokens,
          totalSupply: collection.tokensCreated,
        },
      });
    });
  }

  return (
    <div className="w-full flex flex-col">
      {collectionTokens && collectionInfoData ? (
        <>
          <CollectionInfo {...collectionInfoData} />
          <div className="p-9">
            <Grid items={collectionTokens} />
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center">
          <Spinner aria-label="Spinner" size="xl" />
        </div>
      )}
    </div>
  );
};

export default CollectionPage;
