import type { FC } from 'react';

export interface Props {
  id: string;
  type?: TextType;
}

export type TextType =
  | 'email'
  | 'number'
  | 'password'
  | 'search'
  | 'tel'
  | 'text'
  | 'url';

const Component: FC<Props> = ({ children, id, type = 'text' }) => (
  <label htmlFor={id}>
    <span>{children}</span>
    <input id={id} name={id} type={type} />
  </label>
);
Component.displayName = 'Text';

export default Component;
