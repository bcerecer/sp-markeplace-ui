import { Typography } from '@material-tailwind/react';
import NftsGrid from '../../components/NftsGrid/NftsGrid';

const ProfileView = (): JSX.Element => {
  const address = 'temp address';
  return (
    <div className="w-full flex-column items-center">
      <div className="container mx-auto">
        <Typography as="a" href="#" variant="small" className="mr-4  py-1.5 font-normal">
          Connected address: {address}
        </Typography>
      </div>
      <NftsGrid></NftsGrid>
    </div>
  );
};

export default ProfileView;
