import type { ChangeEventHandler, FC } from 'react';

export interface Props {
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
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

const Component: FC<Props> = ({
  children,
  id,
  onChange,
  placeholder,
  type = 'text',
}) => (
  <label htmlFor={id}>
    <span>{children}</span>
    <input
      id={id}
      name={id}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
    />
  </label>
);
Component.displayName = 'Text';

export default Component;
