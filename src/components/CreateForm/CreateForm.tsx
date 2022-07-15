import { Button, Label, TextInput, Textarea } from 'flowbite-react';

const CreateForm = () => {
  return (
    <form autoComplete="off" className="min-w-[500px] flex flex-col gap-4">
      <div>
        <div className="mb-2 block">
          <Label htmlFor="collection-name" value="Collection Name" />
        </div>
        <TextInput
          id="collection-name"
          type="text"
          placeholder="Super NFT collection"
          required={true}
          shadow={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="creator-account" value="Creator Account Address" />
        </div>
        <TextInput
          id="creator-account"
          type="text"
          placeholder="0x123"
          required={true}
          shadow={true}
        />
      </div>
      <div id="textarea">
        <div className="mb-2 block">
          <Label htmlFor="comment" value="Description" />
        </div>
        <Textarea
          id="comment"
          placeholder="Collection description"
          required={true}
          rows={3}
          shadow={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="icon-url" value="Collection Icon URL" />
        </div>
        <TextInput
          id="icon-url"
          type="text"
          placeholder="https://example.com"
          required={true}
          shadow={true}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreateForm;
