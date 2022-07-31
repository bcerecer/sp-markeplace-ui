import React, { useState } from 'react';
import { Label } from '@components/Label/Label';
import { supabaseClient } from 'src/utils/supabase';
import { Spinner } from 'flowbite-react';
import Carousel from 'src/components/Carousel/Carousel';
import Grid from 'src/components/Grid/Grid';
import { CollectionCardProps } from 'src/components/Grid/components/CollectionCard/CollectionCard';

const getSupaCollections = async () => {
  const { data: collectionData } = await supabaseClient.from('collections').select('*');
  return collectionData;
};

const MarketplacePage = (): JSX.Element => {
  const [collections, setCollections] = useState<CollectionCardProps[]>();

  // Only get it the first time
  if (!collections) {
    getSupaCollections().then((supaCollections: any) => {
      // Make sure that collection exists
      if (supaCollections.length > 0) {
        setCollections(
          supaCollections.map((supaCollection: any) => {
            return {
              name: supaCollection.name,
              itemsQuantity: supaCollection.tokens_created,
              likes: supaCollection.likes,
              path: supaCollection.path,
              imgSrc: supaCollection.img_url,
            } as CollectionCardProps;
          })
        );
      } else {
        setCollections([]);
      }
    });
  }

  return (
    <>
      <div className="mx-auto flex max-w-6xl flex-col gap-4 p-8">
        <Carousel />
      </div>
      <div className="w-full flex flex-col items-center justify-center">
        {collections ? (
          <div className="w-full flex flex-col p-12">
            <Label className="text-3xl font-bold p-7">Collections</Label>
            <Grid variant="collections" items={collections} />
          </div>
        ) : (
          <Spinner aria-label="Spinner" size="xl" />
        )}
      </div>
    </>
  );
};

export default MarketplacePage;
