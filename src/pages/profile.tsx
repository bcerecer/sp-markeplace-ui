import Label from '@components/Label/Label';
import Grid from '@components/Grid/Grid';
import { useGlobalState } from 'src/utils/state';
import { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { TokenCardProps } from 'src/components/Grid/components/TokenCard/TokenCard';
import { Spinner } from 'flowbite-react';
import { useToasts } from 'src/components/Toast/ToastLayout';
import React from 'react';
import { martianWalletClient } from 'src/utils/aptos';

const ProfileTokensContext = React.createContext({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  removeToken: (name: string) => {
    throw new Error('Error calling removeToken.');
  },
});

const ProfilePage = (): JSX.Element => {
  const [wallet, _] = useGlobalState('wallet');
  const [tokens, setTokens] = useState<TokenCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { addToast } = useToasts();

  // TODO: Persist tokens in state management solution
  useEffect(() => {
    const fetchTokens = async () => {
      setIsLoading(true);
      try {
        const resp = await martianWalletClient.getTokens(wallet.address as string);
        const respTokens: TokenCardProps[] = resp.map((token) => {
          return {
            variant: 'toList',
            imgSrc: token.uri,
            collectionCreatorAddress: token.royalty.creator_account,
            collectionName: token.collection,
            tokenName: token.name,
          };
        });
        setTokens(respTokens);
      } catch (e) {
        setTokens([]);
        addToast({
          variant: 'failure',
          title: 'Error',
          text: 'There was an error loading your NFTs',
        });
      }
      setIsLoading(false);
    };

    if (wallet.address) {
      fetchTokens();
    } else {
      // Remove tokens from state when wallet is disconnected. In case user connects another wallet they don't show
      setTokens([]);
    }
  }, [wallet.address]);

  const removeToken = useCallback((name: string) => {
    setTokens((latestTokens) => latestTokens.filter(({ tokenName }) => tokenName !== name));
  }, []);

  const contextValue = useMemo(
    () => ({
      removeToken,
    }),
    [removeToken]
  );

  return (
    // @ts-ignore
    <ProfileTokensContext.Provider value={contextValue}>
      <div className="w-full flex flex-col items-center justify-center">
        <Label className="text-6xl font-extrabold p-4 tracking-wide">PROFILE</Label>
        <Label className="text-xl font-bold p-7">
          Browse your NFTs and list them to Marketplace
        </Label>
        {isLoading ? (
          <Spinner aria-label="Spinner" size="xl" />
        ) : (
          <div>
            {wallet.address && tokens.length > 0 ? (
              <Grid variant="tokens" items={tokens} />
            ) : (
              <Label className="text-md w-full flex justify-center">
                {!wallet.address
                  ? 'Please connect your wallet'
                  : 'No NFTs found in Wallet. Go to the Marketplace and get some!'}
              </Label>
            )}
          </div>
        )}
      </div>
    </ProfileTokensContext.Provider>
  );
};

export const useProfileTokens = () => {
  return useContext(ProfileTokensContext);
};

export default ProfilePage;
