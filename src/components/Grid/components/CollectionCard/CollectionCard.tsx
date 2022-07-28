import { Avatar } from 'flowbite-react';
import router from 'next/router';

export type CollectionCardProps = {
  imgSrc: string;
  name: string;
  path: string;
  itemsQuantity: string;
  likes: number;
};

const CollectionCard = (props: CollectionCardProps) => {
  const { imgSrc, name, path, itemsQuantity } = props;
  return (
    <div
      className="w-[250px] flex h-20 gap-2 text-white dark:hover:text-slate-400	 dark:bg-gray-800 m-2.5 cursor-pointer"
      onClick={() => {
        router.push(`collection/${path}`);
      }}
    >
      <Avatar img={imgSrc} rounded={true} size="lg" />
      <div className="flex flex-col justify-center gap-2">
        <div className="text-md font-bold cursor-pointer">{name}</div>
        <div className="flex ">
          <div className="text-xs font-light cursor-pointer">Items:&nbsp;</div>
          <div className="text-xs font-medium cursor-pointer">{itemsQuantity}</div>
        </div>
      </div>
    </div>
  );
};

export default CollectionCard;
