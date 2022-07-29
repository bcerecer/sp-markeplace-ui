import CreateForm from '@components/CreateForm/CreateForm';
import { Label } from '@components/Label/Label';

const CreatePage = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Label className="text-4xl font-extrabold p-4 tracking-wide">
        Get Listed on Space Powder
      </Label>
      <Label className="text-xl font-bold p-7">Submit an Aptos NFT collection to sell NFTs!</Label>
      <CreateForm />
    </div>
  );
};

export default CreatePage;
