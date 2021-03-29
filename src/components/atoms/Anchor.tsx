import Link, { LinkProps } from 'next/link';
import type { FC } from 'react';

export type Props = LinkProps;

const Component: FC<Props> = ({ children, ...props }) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <Link {...props}>{children}</Link>
);
Component.displayName = 'Anchor';

export default Component;
