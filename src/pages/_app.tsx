import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: url =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then(r => r.json()),
      }}
    >
      <Component {...pageProps} />
      <ToastContainer position='bottom-right' autoClose={3000} theme='dark' />
    </SWRConfig>
  );
}
