import type { ChangeEventHandler, FC } from 'react';

export interface Props {
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
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

const Component: FC<Props> = ({ children, id, onChange, type = 'text' }) => (
  <label htmlFor={id}>
    <span>{children}</span>
    <input id={id} name={id} onChange={onChange} type={type} />
  </label>
);
Component.displayName = 'Text';

export default Component;
