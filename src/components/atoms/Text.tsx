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
  <label className="flex flex-col sm:flex-row sm:items-center" htmlFor={id}>
    <span className="font-bold text-sm tracking-widest mb-1 sm:mb-0 sm:mr-8 sm:w-1/3">
      {children}
    </span>
    <input
      className="appearance-none rounded-full nm-inset-gray-200 leading-5 px-8 py-4 flex-grow sm:w-2/3"
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
