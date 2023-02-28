import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { SWRConfig } from 'swr';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
      value={{
        fetcher: url =>
          fetch(`${process.env.NEXT_PUBLIC_API_URL}${url}`).then(r => r.json()),
      }}
    >
      <Component {...pageProps} />
    </SWRConfig>
  );
}
