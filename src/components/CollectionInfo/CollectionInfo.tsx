import { Avatar } from 'flowbite-react';
import Label from '../../components/Label/Label';
import Link from 'next/link';
import CollectionStat from './components/CollectionStat/CollectionStat';

const collectionStats = [
  {
    title: 'OWNERS',
    value: '10000',
  },
  {
    title: 'FLOOR',
    value: '19090000000',
  },
  {
    title: 'LISTED',
    value: '10000',
  },
  {
    title: 'TOTAL SUPPLY',
    value: '10000',
  },
];

const CollectionInfo = () => {
  return (
    <div className="flex container mx-auto p-9 pr-0">
      <Avatar
        rounded={true}
        img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
        size="2xl"
      />
      <div className="flex flex-col pl-11 w-3/5	">
        <Label className="text-4xl font-extrabold">Solana Monkey Business</Label>
        <span>
          <Label className="text-sm font-light italic">Created by </Label>
          <Link className="cursor-pointer" href={'linkhere'} passHref>
            <Label className="text-sm font-medium underline cursor-pointer">
              0x12344534215342112342
            </Label>
          </Link>
        </span>
        <Label className="text-md font-sm pt-4">
          this is the descriptio nfor the collection of Solana Monkey Business. Everything is
          written
        </Label>
      </div>
      <div className="w-2/5 pl-4 grid grid-cols-2">
        {collectionStats.map((stat) => (
          <CollectionStat title={stat.title} value={stat.value} />
        ))}
      </div>
    </div>
  );
};

export default CollectionInfo;
