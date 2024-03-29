import { AppProps } from 'next/app';
import 'src/styles/globals.css';
import 'tailwindcss/tailwind.css';
import Navbar from '../components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Flowbite } from 'flowbite-react';
import Footer from '../components/Footer/Footer';
import ToastLayout from '../components/Toast/ToastLayout';

declare global {
  interface Window {
    aptos: any;
    martian: any;
  }
}

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  // Makes sure window is not undefined
  const [isSSR, setIsSSR] = useState(true);
  useEffect(() => {
    setIsSSR(false);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Head>
        <title>Space Powder - NFT Marketplace</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      {!isSSR && (
        <Flowbite>
          <ToastLayout>
            <Navbar />
            {/* Takes care of putting Footer component at bottom */}
            <div className="flex-grow">
              <Component {...pageProps} />
            </div>
          </ToastLayout>
        </Flowbite>
      )}
      <div className="w-full mx-auto flex justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default App;
