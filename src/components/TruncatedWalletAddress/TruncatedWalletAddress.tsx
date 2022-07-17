import Link from 'next/link';
import { FiCopy } from 'react-icons/fi';
import { copyToClipboard } from '../../utils/helpers';

type TruncatedWalletAddressProps = {
  address: string;
};

const TruncatedWalletAddress = (props: TruncatedWalletAddressProps): JSX.Element => {
  const { address } = props;

  const truncatedAddress = (): string => {
    const showableCharacters = 4;
    return `${address.substr(0, showableCharacters)}...${address.substr(
      address.length - showableCharacters,
      showableCharacters
    )}`;
  };

  return (
    <span className="flex gap-2 items-center">
      <Link
        className="cursor-pointer"
        href={`https://explorer.devnet.aptos.dev/account/${address}`}
        passHref
      >
        <span className="dark:text-white text-sm font-medium underline cursor-pointer">
          {truncatedAddress()}
        </span>
      </Link>
      <FiCopy
        className="h-4 w-4 text-white cursor-pointer rotate-90"
        onClick={() => copyToClipboard(address)}
      />
      ;
    </span>
  );
};

export default TruncatedWalletAddress;
