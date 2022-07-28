import { Button, Label, TextInput } from 'flowbite-react';
import { useToasts } from '@components/Toast/ToastLayout';
import { send } from 'emailjs-com';

const CreateForm = () => {
  const { addToast } = useToasts();

  const handleSubmit = (event: any) => {
    // Prevent page refresh
    event.preventDefault();

    const { collectionName, creatorAccount, iconUrl } = event.target;
    // TODO: Move this to env variables
    send(
      'service_dolha7a',
      'template_mdawpb5',
      {
        collectionName: collectionName.value,
        creatorAccount: creatorAccount.value,
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
      <div>
        <div className="mb-2 block">
          <Label htmlFor="iconUrl" value="Custom Collection Icon URL (Optional)" />
        </div>
        <TextInput
          id="iconUrl"
          type="text"
          placeholder="https://example.com"
          required={false}
          shadow={true}
        />
      </div>
      <Button type="submit">Submit</Button>
    </form>
  );
};

export default CreateForm;
