import { useRouter } from 'next/router';
import { Navbar as FlowNavbar } from 'flowbite-react';
import ConnectWalletButton from '../Buttons/ConnectWalletButton/ConnectWalletButton';
import Link from 'next/link';

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

const Navbar = () => {
  const router = useRouter();

  return (
    <FlowNavbar fluid={true} className="w-full flex flex-col">
      <FlowNavbar.Brand href="https://spacepowder.io/">
        <img
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-6 sm:h-9"
          alt="Flowbite Logo"
        />
        <span className="font-sans self-center text-lg tracking-widest font-medium dark:text-white">
          SPACE POWDER
        </span>
      </FlowNavbar.Brand>
      <div className="flex flex-column items-center gap-6">
        <div className="flex md:order-2">
          <ConnectWalletButton />
          <FlowNavbar.Toggle />
        </div>
        <FlowNavbar.Collapse>
          {navigationOptions.map((navOption) => {
            return (
              <Link className="cursor-pointer" href={navOption.path} passHref>
                <FlowNavbar.Link
                  active={navOption.activePath === router.pathname}
                  key={navOption.name}
                >
                  {navOption.name}
                </FlowNavbar.Link>
              </Link>
            );
          })}
        </FlowNavbar.Collapse>
      </div>
    </FlowNavbar>
  );
};

export default Navbar;
