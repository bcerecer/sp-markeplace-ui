import React, { useState } from 'react';
import { Label } from '@components/Label/Label';
import CollectionsList from '@components/CollecitonsList/CollectionsList';
import { supabaseClient } from 'src/utils/supabase';
import { Collection } from 'src/pages/collection/[collectionId]';
import { Spinner } from 'flowbite-react';
import Carousel from 'src/components/Carousel/Carousel';

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
    <>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 p-8">
        <Carousel />
      </div>
      <div className="w-full flex flex-col justify-center">
        {collections ? (
          <div className="flex flex-col items-center">
            <Label className="text-xl font-bold p-7">Collections</Label>
            <CollectionsList collections={collections} />
          </div>
        ) : (
          <Spinner aria-label="Spinner" size="xl" />
        )}
      </div>
    </>
  );
};

export default MarketplacePage;
