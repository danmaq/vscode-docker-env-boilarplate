import type { FC, MouseEventHandler } from 'react';

export interface Props {
  onClick?: MouseEventHandler<HTMLButtonElement>;
  submit?: boolean;
}

const Component: FC<Props> = ({ children, onClick, submit }) => (
  <button onClick={onClick} type={submit ? 'submit' : 'button'}>
    {children}
  </button>
);
Component.displayName = 'Button';

export default Component;
