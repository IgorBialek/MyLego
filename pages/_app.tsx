import '../styles/globals.css';

import { Session } from 'next-auth';
import { SessionProvider } from 'next-auth/react';
import { RecoilRoot } from 'recoil';

import SnapshotProvider from '../components/snapshotProvider/SnapshotProvider';

import type { AppProps } from "next/app";
function App({ Component, pageProps }: AppProps<{ session: Session }>) {
  return (
    <RecoilRoot>
      <SessionProvider session={pageProps.session}>
        <SnapshotProvider>
          <Component {...pageProps} />
        </SnapshotProvider>
      </SessionProvider>
    </RecoilRoot>
  );
}

export default App;
