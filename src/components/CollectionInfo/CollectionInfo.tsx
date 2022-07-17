import { Avatar } from 'flowbite-react';
import Label from '../../components/Label/Label';
import CollectionStat from './components/CollectionStat/CollectionStat';
import TruncatedWalletAddress from '../TruncatedWalletAddress/TruncatedWalletAddress';

const collectionStats = {
  owners: {
    title: 'OWNERS',
    value: '',
  },
  floor: {
    title: 'FLOOR',
    value: '',
  },
  listed: {
    title: 'LISTED',
    value: '',
  },
  totalSupply: {
    title: 'TOTAL SUPPLY',
    value: '',
  },
};

type CollectionInfoProps = {
  creatorAddress: string;
  collectionName: string;
  collectionDescription: string;
  collectionImgSrc: string;
  stats: {
    owners: string;
    floor: string;
    listed: string;
    totalSupply: string;
  };
};

const CollectionInfo = (props: CollectionInfoProps) => {
  const { creatorAddress, collectionName, collectionDescription, collectionImgSrc, stats } = props;

  collectionStats.owners.value = stats.owners;
  collectionStats.floor.value = stats.floor;
  collectionStats.listed.value = stats.listed;
  collectionStats.totalSupply.value = stats.totalSupply;

  return (
    <div className="flex container mx-auto p-9 pr-0">
      <Avatar rounded={true} img={collectionImgSrc} size="xl" />
      <div className="flex flex-col pl-11 w-3/5	">
        <Label className="text-4xl font-extrabold">{collectionName}</Label>
        <span className="flex">
          <Label className="text-sm font-light italic">Created by &nbsp;</Label>
          <TruncatedWalletAddress address={creatorAddress} />
        </span>
        <Label className="text-md font-sm pt-4">{collectionDescription}</Label>
      </div>
      <div className="w-2/5 pl-4 grid grid-cols-2">
        {Object.values(collectionStats).map((stat) => (
          <CollectionStat key={stat.title} title={stat.title} value={stat.value} />
        ))}
      </div>
    </div>
  );
};

export default CollectionInfo;
