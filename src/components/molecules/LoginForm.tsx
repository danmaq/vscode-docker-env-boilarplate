import type { ChangeEventHandler, FC, FormEventHandler } from 'react';
import Anchor from '../atoms/Anchor';
import Button from '../atoms/Button';
import Check from '../atoms/Check';
import Text from '../atoms/Text';
import type { WithoutChildren } from '../types';

export interface Props extends WithoutChildren {
  onChangeUID?: ChangeEventHandler<HTMLInputElement>;
  onChangePassword?: ChangeEventHandler<HTMLInputElement>;
  onSubmit?: FormEventHandler<HTMLFormElement>;
}

const Component: FC<Props> = ({ onChangePassword, onChangeUID, onSubmit }) => (
  <form action="#" onSubmit={onSubmit}>
    <Text id="email" onChange={onChangeUID} type="email">
      ログインID
    </Text>
    <Text id="password" onChange={onChangePassword} type="password">
      パスワード
    </Text>
    <Check id="store">ログインIDを保存</Check>
    <Anchor href="#">パスワードをお忘れの方</Anchor>
    <Button submit>ログイン</Button>
  </form>
);
Component.displayName = 'LoginForm';

export default Component;