import type { FC } from 'react';
import type { WithoutChildren } from '../types';

const Component: FC<WithoutChildren> = () => (
  <header className="container flex items-center mx-auto p-4">
    <div className="">
      <h1>Logo</h1>
    </div>
  </header>
);
Component.displayName = 'GuestHeader';

export default Component;
