import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';
import { ToastContainer } from 'react-toastify';

import '@/styles/globals.css';
import 'react-toastify/dist/ReactToastify.min.css';
import { useRouter } from 'next/router';
import { NavBar } from '@/components/common';

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();
  const FULL_SCREEN_PAGES = ['/sign-in'];

  return (
    <SWRConfig
      value={{
        fetcher: url =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then(r => r.json()),
      }}
    >
      {FULL_SCREEN_PAGES.includes(router.pathname) ? (
        <main className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
          <Component {...pageProps} />
        </main>
      ) : (
        <>
          <NavBar />
          <main className='mx-auto max-w-7xl py-8 px-4 sm:px-6 lg:px-8'>
            <Component {...pageProps} />
          </main>
        </>
      )}
      <ToastContainer position='bottom-right' autoClose={3000} theme='dark' />
    </SWRConfig>
  );
}
