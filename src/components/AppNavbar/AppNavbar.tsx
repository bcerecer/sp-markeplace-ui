import { Navbar, Typography } from '@material-tailwind/react';
import router from 'next/router';
import ConnectWalletButton from './components/ConnectWalletButton/ConnectWalletButton';

export const AppNavbar = (): JSX.Element => {
  return (
    <Navbar className="mx-auto w-full" fullWidth>
      <div className="w-full flex items-center justify-between text-blue-grey-900">
        <div>
          <Typography as="a" variant="small" className="mr-4 py-1.5 font-normal">
            Space Powder
          </Typography>
        </div>
        <div>
          <ul className="flex items-center gap-6">
            <Typography
              as="li"
              variant="small"
              className="p-1 cursor-pointer font-normal"
              onClick={() => {
                router.push('/');
              }}
            >
              <a className="flex items-center">Marketplace</a>
            </Typography>
            <Typography
              as="li"
              variant="small"
              className="p-1 cursor-pointer font-normal"
              onClick={() => {
                router.push('/create');
              }}
            >
              <a className="flex items-center">Create</a>
            </Typography>
            <Typography
              as="li"
              variant="small"
              className="p-1 cursor-pointer font-normal"
              onClick={() => {
                router.push('/profile');
              }}
            >
              <a className="flex items-center">Profile</a>
            </Typography>
            <ConnectWalletButton />
          </ul>
        </div>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
