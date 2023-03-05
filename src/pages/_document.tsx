import { Html, Head, Main, NextScript } from 'next/document';
import { NavBar } from '@/components/common';

export default function Document() {
  return (
    <Html lang='en'>
      <Head />
      <body className='bg-black text-white'>
        <NavBar>
          <Main />
        </NavBar>
        <NextScript />
      </body>
    </Html>
  );
}
