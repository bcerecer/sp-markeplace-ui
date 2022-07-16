import { Avatar } from 'flowbite-react';
import React from 'react';
import Label from '../../components/Label/Label';
import NftsGrid from '../../components/NftsGrid/NftsGrid';
import Link from 'next/link';

const CollectionPage = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col">
      <div className="flex container mx-auto p-9">
        <Avatar
          rounded={true}
          img="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
          size="2xl"
        />
        <div className="flex flex-col pl-11 w-2/5	">
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
        <div className="flex w-2/5 pl-4 justify-center">
          <div className="w-48 h-10 dark:bg-blue-800 rounded-md p-2 flex items-center justify-between">
            <Label className="w-1/2 pl-2 text-xs font-bold dark:text-gray-400">FLOOR</Label>
            <Label className="w-1/2 pr-2 text-sm font-md flex justify-end overflow-hidden">
              190000000
            </Label>
          </div>
        </div>
      </div>
      <div className="p-9">
        <NftsGrid />
      </div>
    </div>
  );
};

export default CollectionPage;
