import type { FC } from 'react';

export interface Props {
  submit?: boolean;
}

const Component: FC<Props> = ({ children, submit }) => (
  <button type={submit ? 'submit' : 'button'}>{children}</button>
);
Component.displayName = 'Button';

export default Component;
