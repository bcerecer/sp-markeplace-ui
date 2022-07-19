import { Button, Label, TextInput, Textarea } from 'flowbite-react';
import { useToasts } from '@components/Toast/ToastLayout';
import { send } from 'emailjs-com';

const CreateForm = () => {
  const { addToast } = useToasts();

  const handleSubmit = (event: any) => {
    // Prevent page refresh
    event.preventDefault();

    const { collectionName, creatorAccount, collectionDescription, iconUrl } = event.target;
    // TODO: Move this to env variables
    send(
      'service_dolha7a',
      'template_mdawpb5',
      {
        collectionName: collectionName.value,
        creatorAccount: creatorAccount.value,
        collectionDescription: collectionDescription.value,
        iconUrl: iconUrl.value,
      },
      'h9G6jn6OfjVdHDSOi'
    ) // (serviceId, , publicKey)
      .then((_) => {
        addToast({ variant: 'send', title: 'Sent', text: 'Collection submitted for review' });
      })
      .catch((_) => {
        addToast({ variant: 'failure', title: 'Error', text: 'Could not submit collection form' });
      });
  };

  return (
    <form autoComplete="off" className="min-w-[500px] flex flex-col gap-4" onSubmit={handleSubmit}>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="collectionName" value="Collection Name" />
        </div>
        <TextInput
          id="collectionName"
          type="text"
          placeholder="Super NFT collection"
          required={true}
          shadow={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="creatorAccount" value="Creator Account Address" />
        </div>
        <TextInput
          id="creatorAccount"
          type="text"
          placeholder="0x123"
          required={true}
          shadow={true}
        />
      </div>
      <div id="textarea">
        <div className="mb-2 block">
          <Label htmlFor="collectionDescription" value="Description" />
        </div>
        <Textarea
          id="collectionDescription"
          placeholder="Collection description"
          required={true}
          rows={3}
          shadow={true}
        />
      </div>
      <div>
        <div className="mb-2 block">
          <Label htmlFor="iconUrl" value="Collection Icon URL" />
        </div>
        <TextInput
          id="iconUrl"
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
