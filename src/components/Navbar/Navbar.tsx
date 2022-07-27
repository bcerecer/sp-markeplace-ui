import { useRouter } from 'next/router';
import { Navbar as FlowNavbar } from 'flowbite-react';
import ConnectWalletButton from '@components/ConnectWalletButton/ConnectWalletButton';
import Link from 'next/link';
import Image from 'next/image';
import SpacePowderLogo from 'public/icons/space_powder.svg';

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
      <FlowNavbar.Brand>
        <Link className="cursor-pointer" href={'/'} passHref>
          <span className="flex items-center cursor-pointer font-sans self-center text-xl tracking-widest font-medium dark:text-white gap-2">
            <Image src={SpacePowderLogo} width={28} height={28} />
            SPACE POWDER
          </span>
        </Link>
      </FlowNavbar.Brand>
      <div className="flex flex-column items-center gap-6">
        <div className="flex md:order-2">
          <ConnectWalletButton />
          <FlowNavbar.Toggle />
        </div>
        <FlowNavbar.Collapse>
          {navigationOptions.map((navOption) => {
            return (
              <FlowNavbar.Link
                active={navOption.activePath === router.pathname}
                key={navOption.name}
              >
                {/* TODO: Use href directly from FlowNavbar.Link when they fix refresh on redirection asn remove <Link>. Same with .Brand above */}
                <Link className="cursor-pointer" href={navOption.path} passHref>
                  {navOption.name}
                </Link>
              </FlowNavbar.Link>
            );
          })}
        </FlowNavbar.Collapse>
      </div>
    </FlowNavbar>
  );
};

export default Navbar;
