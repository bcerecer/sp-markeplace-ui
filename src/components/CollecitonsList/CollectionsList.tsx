import { Avatar, Table } from 'flowbite-react';
import { useRouter } from 'next/router';

export type CollectionsListProps = {
  imgSrc: string;
  name: string;
  description: string;
  path: string;
};

const CollectionsList = (props: { collections: CollectionsListProps[] }) => {
  const { collections } = props;
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
              key={collection.path}
              className="bg-white dark:border-gray-700 dark:bg-gray-800 cursor-pointer"
              onClick={() => {
                router.push(`collection/${collection.path}`);
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
