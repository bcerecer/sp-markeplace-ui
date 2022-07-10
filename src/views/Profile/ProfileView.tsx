import { Typography } from '@material-tailwind/react';

const ProfileView = (): JSX.Element => {
  const address = 'temp address';
  return (
    <div>
      <Typography as="a" href="#" variant="small" className="mr-4  py-1.5 font-normal">
        Connected address: {address}
        <div>Placeholder of nfts for sale</div>
      </Typography>
    </div>
  );
};

export default ProfileView;
