import type { ChangeEventHandler, FC } from 'react';

export interface Props {
  id: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const Component: FC<Props> = ({ id, children, onChange }) => (
  <label htmlFor={id}>
    <input id={id} name={id} onChange={onChange} type="checkbox" />
    <span>{children}</span>
  </label>
);
Component.displayName = 'Check';

export default Component;
