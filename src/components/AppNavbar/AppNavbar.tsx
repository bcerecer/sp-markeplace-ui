import { Navbar, Typography } from '@material-tailwind/react';
import router from 'next/router';
import ConnectWalletButton from './components/ConnectWalletButton/ConnectWalletButton';

export const AppNavbar = (): JSX.Element => {
  return (
    <Navbar className="mx-auto w-full">
      <div className="container flex items-center justify-between text-blue-grey-900">
        <Typography
          as="a"
          href="#"
          variant="small"
          className="mr-4 cursor-pointer py-1.5 font-normal"
          onClick={() => {
            router.push('/');
          }}
        >
          Apart
        </Typography>
        <ul className="flex items-center gap-6">
          <Typography
            as="li"
            variant="small"
            className="p-1 cursor-pointer font-normal"
            onClick={() => {
              router.push('/collections');
            }}
          >
            <a className="flex items-center">Collections</a>
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
        </ul>
        <ConnectWalletButton />
      </div>
    </Navbar>
  );
};

export default AppNavbar;
