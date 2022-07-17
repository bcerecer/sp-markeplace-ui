import Label from '../components/Label/Label';
import Grid from '../components/Grid/Grid';
import { useGlobalState } from '../utils/state';
import { testItems } from '../components/Grid/gridTestData';

const ProfilePage = (): JSX.Element => {
  const [wallet, _] = useGlobalState('wallet');
  return (
    <div className="w-full flex flex-col items-center justify-center">
      <Label className="text-6xl font-extrabold p-4 tracking-wide">PROFILE</Label>
      <Label className="text-xl font-bold p-7">Browse your NFTs and list them to Marketplace</Label>
      {wallet.address ? (
        <Grid items={testItems} />
      ) : (
        <Label className="text-md w-full flex justify-center">Please connect your wallet</Label>
      )}
    </div>
  );
};

export default ProfilePage;
