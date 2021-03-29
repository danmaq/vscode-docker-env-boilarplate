import type classNames from 'classnames';

/** `ClassNames` の引数の型。 */
export type ClassValue = Parameters<typeof classNames>[number];

/** 子要素を持たないコンポーネントのための型定義。 */
export interface WithoutChildren {
  /** 使用しません。 */
  children?: never;
}
