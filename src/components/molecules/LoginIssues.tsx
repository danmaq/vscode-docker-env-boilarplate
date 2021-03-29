import type { FC } from 'react';
import Anchor from '../atoms/Anchor';
import type { WithoutChildren } from '../types';

const Component: FC<WithoutChildren> = () => (
  <div>
    <Anchor href="#">障害・メンテナンス情報はこちら</Anchor>
    <Anchor href="#">ログインできない場合はこちらをご確認ください</Anchor>
  </div>
);
Component.displayName = 'LoginIssues';

export default Component;
