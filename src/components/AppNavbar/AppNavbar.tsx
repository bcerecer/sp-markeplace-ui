import { Navbar } from 'flowbite-react';
import router from 'next/router';
import ConnectWalletButton from '../Buttons/ConnectWalletButton/ConnectWalletButton';

const AppNavbar = () => {
  return (
    <Navbar fluid={true} className="w-full flex flex-col">
      <Navbar.Brand>
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          Space Powder
        </span>
      </Navbar.Brand>
      <div className="flex flex-column items-center gap-6">
        <div className="flex md:order-2">
          <ConnectWalletButton />
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse>
          <Navbar.Link
            onClick={() => {
              router.push('/');
            }}
            active={true}
          >
            Marketplace
          </Navbar.Link>
          <Navbar.Link
            onClick={() => {
              router.push('/create');
            }}
          >
            Create
          </Navbar.Link>
          <Navbar.Link
            onClick={() => {
              router.push('/profile');
            }}
          >
            Profile
          </Navbar.Link>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
