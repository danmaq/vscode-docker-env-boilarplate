import type { FC } from 'react';
import type { WithoutChildren } from '../types';

const Component: FC<WithoutChildren> = () => (
  <footer className="flex p-12 items-center">
    <small className="text-center">©︎</small>
  </footer>
);
Component.displayName = 'Footer';

export default Component;
