import { Typography } from '@material-tailwind/react';
import NftsGrid from '../../components/NftsGrid/NftsGrid';
import { useGlobalState } from '../../utils/state';

const ProfileView = (): JSX.Element => {
  const [wallet, _] = useGlobalState('wallet');
  return (
    <div className="w-full flex-column items-center">
      {wallet.address ? (
        <div>
          <div className="container mx-auto">
            <Typography variant="small" className="mr-4  py-1.5 font-normal">
              Connected address: {wallet.address}
            </Typography>
          </div>
          <NftsGrid></NftsGrid>
        </div>
      ) : (
        <div className="w-full flex justify-center">
          <Typography variant="small" className="mr-4  py-1.5 font-normal">
            Connect wallet
          </Typography>
        </div>
      )}
    </div>
  );
};

export default ProfileView;
