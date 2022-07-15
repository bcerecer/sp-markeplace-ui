import { AppProps } from 'next/app';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import Navbar from '../components/Navbar/Navbar';
import { useEffect, useState } from 'react';
import Head from 'next/head';
import { Flowbite } from 'flowbite-react';
import Footer from '../components/Footer/Footer';

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
        <title>Space Powder</title>
        <link rel="icon" type="image/png" sizes="32x32" href="/icon-small.png" />
        <link rel="icon" type="image/png" sizes="128x128" href="/icon-large.png" />
      </Head>
      {!isSSR && (
        <div className="flex-grow">
          <Flowbite>
            <Navbar />
            <Component {...pageProps} />
          </Flowbite>
        </div>
      )}
      <div className="w-screen mx-auto flex justify-center">
        <Footer />
      </div>
    </div>
  );
};

export default App;
