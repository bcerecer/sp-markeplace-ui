import { AppProps } from 'next/app';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import AppNavbar from '../components/AppNavbar/AppNavbar';
import { useEffect, useState } from 'react';

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
    <div>
      {!isSSR && (
        <div>
          <AppNavbar />
          <Component {...pageProps} />
        </div>
      )}
    </div>
  );
};

export default App;
