import Link from 'next/link';
import type { FC } from 'react';
import type { WithoutChildren } from '../types';

const Component: FC<WithoutChildren> = () => (
  <header className="container flex items-center mx-auto p-4">
    <div className="">
      <h1>
        <Link href="./">Logo</Link>
      </h1>
    </div>
  </header>
);
Component.displayName = 'GuestHeader';

export default Component;
