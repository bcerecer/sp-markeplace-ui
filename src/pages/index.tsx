import React, { useState } from 'react';
import { Label } from '@components/Label/Label';
import CollectionsList from '@components/CollecitonsList/CollectionsList';
import { supabaseClient } from 'src/utils/supabase';
import { Collection } from 'src/pages/collection/[collectionId]';
import { Spinner } from 'flowbite-react';

const getSupaCollections = async () => {
  const { data: collectionData } = await supabaseClient.from('collections').select('*');
  return collectionData;
};

const MarketplacePage = (): JSX.Element => {
  const [collections, setCollections] = useState<Collection[]>();

  // Only get it the first time
  if (!collections) {
    getSupaCollections().then((supaCollections: any) => {
      // Make sure that collection exists
      if (supaCollections.length > 0) {
        setCollections(
          supaCollections.map((supaCollection: any) => {
            return {
              name: supaCollection.name,
              tokensCreated: supaCollection.tokens_created,
              likes: supaCollection.likes,
              creatorAddress: supaCollection.creator_address,
              description: supaCollection.description,
              path: supaCollection.path,
              imgSrc: supaCollection.img_url,
            } as Collection;
          })
        );
      }
    });
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">
      {collections ? (
        <>
          <Label className="text-6xl font-extrabold p-4 tracking-wide">MARKETPLACE</Label>
          <Label className="text-xl font-bold p-7">Check out the latest NFT Collections!</Label>
          <CollectionsList collections={collections} />
        </>
      ) : (
        <Spinner aria-label="Spinner" size="xl" />
      )}
    </div>
  );
};

export default MarketplacePage;
