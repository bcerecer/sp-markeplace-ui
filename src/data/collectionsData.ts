// TODO: remove this file and folder once data is successfully retrieved from database a.k.a database solution */
// This is a temporary solution while we work on
export const collectionsData = [
  {
    localId: 1,
    imgSrc: 'https://nyancatcollection.com/images/Original.gif',
    name: 'Aptos nyan cats',
    description: 'The most nyantic collection in the aptosverse',
    path: `/collection/aptos_nyan_cats`,
    address: '0x1234567890',
    tokens: [
      {
        variant: 'listed',
        imgSrc:
          'https://gzgejuiyhnmaibaxoczu.supabase.co/storage/v1/object/public/cdn/apto-punks/punk-23.png',
        id: '1',
        name: 'Nyan cat #1',
        price: 5000,
        collectionName: 'Test Collection Name',
      },
    ],
  },
  {
    localId: 2,
    imgSrc: 'https://nyancatcollection.com/images/Original.gif',
    name: 'Aptos nyan cats',
    description: 'The most nyantic collection in the aptosverse',
    path: `/collection/aptos_nyan_cats_2`,
    address: '0x1234567890',
    tokens: [
      {
        variant: 'listed',
        imgSrc:
          'https://gzgejuiyhnmaibaxoczu.supabase.co/storage/v1/object/public/cdn/apto-punks/punk-23.png',
        id: '1',
        name: 'Nyan cat #1',
        price: 5000,
        collectionName: 'Test Collection Name',
      },
      {
        variant: 'unlisted',
        imgSrc:
          'https://gzgejuiyhnmaibaxoczu.supabase.co/storage/v1/object/public/cdn/apto-punks/punk-23.png',
        id: '2',
        name: 'Nyan cat #2',
        price: 5000,
        collectionName: 'Test Collection Name',
      },
    ],
  },
];
