import NftsGrid from '../../components/NftsGrid/NftsGrid';
import { useGlobalState } from '../../utils/state';

const ProfileView = (): JSX.Element => {
  const [wallet, _] = useGlobalState('wallet');
  return (
    <div className="w-full flex-column items-center">
      {wallet.address ? (
        <div>
          <div className="container mx-auto">Connected address: {wallet.address}</div>
          <NftsGrid></NftsGrid>
        </div>
      ) : (
        <div className="w-full flex justify-center">Connect wallet</div>
      )}
    </div>
  );
};

export default ProfileView;
