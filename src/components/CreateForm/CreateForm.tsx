import { Button, Label, TextInput, Textarea, Toast } from 'flowbite-react';
import { useEffect, useState } from 'react';
import { MdOutbox } from 'react-icons/md';

const sentToast = (
  <Toast>
    <div className="flex !items-start">
      <div className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-blue-100 text-blue-500 dark:bg-blue-900 dark:text-blue-300">
        <MdOutbox className="h-5 w-5" />
      </div>
      <div className="ml-3 text-sm font-normal">
        <span className="mb-1 text-sm font-semibold text-gray-900 dark:text-white">Sent</span>
        <div className="mb-2 text-sm font-normal">Collection submitted for review</div>
      </div>
      <Toast.Toggle />
    </div>
  </Toast>
);

const CreateForm = () => {
  const [showAlert, setShowAlert] = useState<boolean>(false);
  useEffect(() => {
    return () => {
      setTimeout(() => {
        setShowAlert(false);
      }, 5000);
    };
  }, [showAlert]);

  const handleSubmit = (event: { preventDefault: () => void }) => {
    // Prevent page refresh
    event.preventDefault();
    setShowAlert(true);
    console.log('showAlert: ', showAlert);
  };

  return (
    <form autoComplete="off" className="min-w-[500px] flex flex-col gap-4" onSubmit={handleSubmit}>
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
      {showAlert && sentToast}
    </form>
  );
};

export default CreateForm;
