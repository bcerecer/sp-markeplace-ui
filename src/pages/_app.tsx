import { AppProps } from 'next/app';
import '../styles/globals.css';
import 'tailwindcss/tailwind.css';
import AppNavbar from '../components/AppNavbar/AppNavbar';

const App = ({ Component, pageProps }: AppProps): JSX.Element => {
  return (
    <div>
      <AppNavbar />
      <Component {...pageProps} />
    </div>
  );
};

export default App;
