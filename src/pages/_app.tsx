import { AppProps } from 'next/app';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import AppNavbar from '../components/AppNavbar/AppNavbar';
import { useEffect, useState } from 'react';
import Head from 'next/head';

declare global {
  interface Window {
    aptos: any;
    martian: any;
  }
}

<meta name="viewport" content="width=device-width, initial-scale=1.0" />;
const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  // Makes sure window is not undefined
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <>
      {' '}
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Space Powder</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-small.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/icon-large.png" />
      </Head>
      <div>
        {!isSSR && (
          <div>
            <AppNavbar />
            <Component {...pageProps} />
          </div>
        )}
      </div>
    </>
  );
};

export default App;
