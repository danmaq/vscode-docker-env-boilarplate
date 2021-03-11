import Head from 'next/head';
import type { FC } from 'react';

const Component: FC = () => (
  <div>
    <Head>
      <title>Hello, world!</title>
    </Head>

    <main>
      <h1>Hello, world!</h1>
    </main>
  </div>
);
Component.displayName = 'Index';

export default Component;
