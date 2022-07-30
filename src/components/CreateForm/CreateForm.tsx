import { Button, Label, Spinner, TextInput } from 'flowbite-react';
import { useToasts } from '@components/Toast/ToastLayout';
import AwsLambdasClient from 'src/utils/awsLambdasClient';
import { useState } from 'react';

const CreateForm = () => {
  const { addToast } = useToasts();
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: any) => {
    setIsLoading(true);
    // Prevent page refresh
    event.preventDefault();

    const { collectionName, creatorAccount } = event.target;
    const lambdaResp = await AwsLambdasClient.submitCollectionForm(
      collectionName.value,
      creatorAccount.value
    );
    console.log('lambdaResp createForm aws resp: ', lambdaResp);
    if (lambdaResp.success) {
      addToast({ variant: 'success', title: 'Success', text: 'Collection added successfully' });
    } else {
      addToast({ variant: 'failure', title: 'Error', text: 'Collection cannot be added' });
    }
    setIsLoading(false);
  };

  return (
    <>
      <form
        autoComplete="off"
        className="min-w-[500px] flex flex-col gap-4"
        onSubmit={() => handleSubmit(event)}
      >
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
        <Button type="submit">Submit</Button>
      </form>
      {isLoading && (
        <div className="flex items-center justify-center">
          <Spinner aria-label="Default status example" size="xl" />
        </div>
      )}
    </>
  );
};

export default CreateForm;
