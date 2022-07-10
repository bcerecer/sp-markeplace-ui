import React from 'react';

const LandingView = (): JSX.Element => {
  const [address, setAddress] = React.useState<string | null>(null);
  const getMartianProvider = () => {
    const isMartianWalletInstalled = window.martian;

    if (isMartianWalletInstalled) {
      // Disconnect
      if (address) {
        window.martian.disconnect();
        setAddress(null);
        return;
      }

      // Connect
      return window.martian.connect((resp) => {
        console.log('resp: ', resp);
        setAddress(resp.address);
        // 0xc4265dc8a5d90715f8a60bebf16688819427bca928a537ad35f798d4d1267716
      });
    }
    window.open('https://www.martianwallet.xyz/', '_blank');
  };

  return (
    <div>
      <button onClick={() => getMartianProvider()}>Connect Martian wallet</button>
      <div>{address}</div>
    </div>
  );
};

export default LandingView;
