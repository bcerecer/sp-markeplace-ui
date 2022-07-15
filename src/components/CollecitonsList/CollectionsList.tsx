import { Avatar, Table } from 'flowbite-react';
import { useRouter } from 'next/router';

/* This example requires Tailwind CSS v2.0+ */
const collections = [
  {
    img: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    name: 'name',
    description: 'description',
    path: '/create',
  },
  {
    img: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    name: 'name',
    description: 'description',
    path: '/create',
  },
  {
    img: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    name: 'name',
    description: 'description',
    path: '/create',
  },
  {
    img: 'https://flowbite.com/docs/images/people/profile-picture-5.jpg',
    name: 'name',
    description: 'This is my collection descriotion yeeyey ye ',
    path: '/create',
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
              className="bg-white dark:border-gray-700 dark:bg-gray-800"
              onClick={() => {
                router.push(collection.path);
              }}
            >
              <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white flex items-center gap-3">
                <Avatar img={collection.img} rounded={true} size="lg" />
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