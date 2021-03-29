import type { FC } from 'react';

export interface Props {
  id: string;
}

const Component: FC<Props> = ({ id, children }) => (
  <label htmlFor={id}>
    <input id={id} name={id} type="checkbox" />
    <span>{children}</span>
  </label>
);
Component.displayName = 'Text';

export default Component;
