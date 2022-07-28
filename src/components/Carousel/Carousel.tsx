import { Carousel as FlowCarousel } from 'flowbite-react';
import Label from 'src/components/Label/Label';
import Image from 'next/image';

// https://rxbadlmhqshszwaxifut.supabase.co/storage/v1/object/public/aptos-nyan-cats/nyan_cat.gif
const Carousel = () => {
  return (
    <div className="h-[500px]">
      <FlowCarousel leftControl="&nbsp;" rightControl="&nbsp;" slideInterval={9000}>
        <div className="flex h-full items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
          <div className="flex flex-col h-full w-2/6 items-center justify-center p-4 gap-4">
            <Label className="text-4xl font-bold">Aptos Nyan Cats</Label>
            <Label className="text-sm font-semibold p-12 pt-4">
              Explore the infinities of the Aptosverse with a nyan cat
            </Label>
          </div>
          <div className="h-full w-4/6 p-2 gap-2 relative">
            <Image
              src="https://rxbadlmhqshszwaxifut.supabase.co/storage/v1/object/public/aptos-nyan-cats/nyan_cat.gif"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>
      </FlowCarousel>
    </div>
  );
};

export default Carousel;
