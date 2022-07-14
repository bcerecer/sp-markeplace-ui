import { useRouter } from 'next/router';
import { Navbar } from 'flowbite-react';
import ConnectWalletButton from '../Buttons/ConnectWalletButton/ConnectWalletButton';

export type NavOption = {
  name: string;
  path: string;
  icon: string;
  activePath: string;
};

const navigationOptions: NavOption[] = [
  {
    name: 'Marketplace',
    path: '/',
    icon: 'market',
    activePath: '/',
  },
  {
    name: 'Create',
    path: '/create',
    icon: 'create',
    activePath: '/create',
  },
  {
    name: 'Profile',
    path: '/profile',
    icon: 'profile',
    activePath: '/profile',
  },
];

const AppNavbar = () => {
  const router = useRouter();

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
          {navigationOptions.map((navOption) => {
            return (
              <Navbar.Link
                onClick={() => {
                  router.push(navOption.path);
                }}
                active={navOption.activePath === router.pathname}
              >
                {navOption.name}
              </Navbar.Link>
            );
          })}
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
};

export default AppNavbar;
