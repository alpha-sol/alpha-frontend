import '../styles/globals.css';
import '../styles/responsiveImage.scss';
import 'tailwindcss/tailwind.css';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

import dynamic from 'next/dynamic';
import type { AppProps } from 'next/app';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MintProvider } from '../mint/MintProvider';
import ReactNotification from 'react-notifications-component';
import { NotificationProvider } from '../notifications/NotificationProvider';
import { AlphaProvider } from '../alpha/AlphaProvider';

const WalletConnectionProvider = dynamic(
  () => import('../anchor/WalletConnectionProvider'),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WalletConnectionProvider>
      <MintProvider>
        <AlphaProvider>
          <NotificationProvider>
            <ReactNotification />
            <div className="bg-black flex flex-col items-center min-h-screen">
              <Header pageProps={pageProps} />
              <div className="bg-black flex flex-col flex-grow items-center w-10/12">
                <Component {...pageProps} />
              </div>
              <Footer />
            </div>
          </NotificationProvider>
        </AlphaProvider>
      </MintProvider>
    </WalletConnectionProvider>
  );
}
export default MyApp;
