// TODO: remove this file and folder once data is successfully retrieved from database a.k.a database solution */
// This is a temporary solution while we work on
export const collectionsData = [
  {
    localId: 1,
    imgSrc:
      'https://rxbadlmhqshszwaxifut.supabase.co/storage/v1/object/public/aptos-nyan-cats/nyan_cat.gif',
    name: 'Aptos Nyan Cats',
    description: 'The most nyantic collection in the aptosverse',
    path: `/collection/aptos_nyan_cats`,
    address: '0x646116de2f6f998b9aaa273463e4eb7914eefc036b7d56cace2c68d16aa03c18',
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
    imgSrc:
      'https://rxbadlmhqshszwaxifut.supabase.co/storage/v1/object/public/aptos-nyan-cats/nyan_cat.gif',
    name: 'Aptos nyan cats 2',
    description: 'The most nyantic collection in the aptosverse',
    path: `/collection/aptos_nyan_cats_2`,
    address: '0x646116de2f6f998b9aaa273463e4eb7914eefc036b7d56cace2c68d16aa03c18',
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
