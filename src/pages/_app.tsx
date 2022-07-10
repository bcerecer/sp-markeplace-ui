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
  const [app, setApp] = useState(<></>);
  useEffect(
    () =>
      setApp(
        <div>
          <AppNavbar />
          <Component {...pageProps} />
        </div>
      ),
    []
  );

  return app;
};

export default App;
