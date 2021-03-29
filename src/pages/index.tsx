import Head from 'next/head';
import type { FC } from 'react';
import Footer from '../components/atoms/Footer';
import GuestHeader from '../components/atoms/GuestHeader';
import Image from '../components/atoms/Image';
import LoginForm from '../components/molecules/LoginForm';
import LoginIssues from '../components/molecules/LoginIssues';
import type { WithoutChildren } from '../components/types';

const Component: FC<WithoutChildren> = () => (
  <>
    <Head>
      <title>Hello, world!</title>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />
    </Head>

    <GuestHeader />
    <main className="mx-auto">
      <LoginForm />
      <LoginIssues />
      <Image width={527} height={138} />
    </main>
    <Footer />
  </>
);
Component.displayName = 'Index';

export default Component;
