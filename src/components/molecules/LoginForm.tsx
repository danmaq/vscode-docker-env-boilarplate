import type { FC } from 'react';
import Anchor from '../atoms/Anchor';
import Button from '../atoms/Button';
import Check from '../atoms/Check';
import Text from '../atoms/Text';
import type { WithoutChildren } from '../types';

const Component: FC<WithoutChildren> = () => (
  <div>
    <Text id="email" type="email">
      ログインID
    </Text>
    <Text id="password" type="password">
      パスワード
    </Text>
    <Check id="store">ログインIDを保存</Check>
    <Anchor href="#">パスワードをお忘れの方</Anchor>
    <Button submit>ログイン</Button>
  </div>
);
Component.displayName = 'LoginForm';

export default Component;
