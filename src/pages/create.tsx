import CreateForm from '../components/CreateForm/CreateForm';
import { Label } from '../components/Label/Label';

const CreatePage = (): JSX.Element => {
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Label className="text-6xl font-extrabold p-4 tracking-wide">CREATE</Label>
      <Label className="text-xl font-bold p-7">
        Submit your Aptos NFT collection in Space Powder!
      </Label>
      <CreateForm />
    </div>
  );
};

export default CreatePage;
