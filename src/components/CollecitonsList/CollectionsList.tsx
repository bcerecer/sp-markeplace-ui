import { Avatar, Table } from 'flowbite-react';
import { useRouter } from 'next/router';

const collections = [
  {
    imgSrc: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    name: 'name1',
    description: 'description',
    path: '/collection/1',
  },
  {
    imgSrc: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    name: 'name2',
    description: 'description',
    path: '/collection/2',
  },
  {
    imgSrc: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    name: 'name3',
    description: 'description',
    path: '/collection/3',
  },
  {
    imgSrc: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    name: 'name4',
    description: 'This is my collection descriotion yeeyey ye ',
    path: '/collection/4',
  },
];

const CollectionsList = () => {
  const router = useRouter();
  return (
    <Table hoverable={true}>
      <Table.Head>
        <Table.HeadCell>Collection</Table.HeadCell>
        <Table.HeadCell>Description</Table.HeadCell>
      </Table.Head>
      <Table.Body className="divide-y">
        {collections.map((collection) => {
          return (
            <Table.Row
              key={collection.name}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
              onClick={() => {
                router.push(collection.path);
              }}
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center gap-3">
                <Avatar img={collection.imgSrc} rounded={true} size="lg" />
                {collection.name}
              </Table.Cell>
              <Table.Cell>{collection.description}</Table.Cell>
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );
};

export default CollectionsList;
