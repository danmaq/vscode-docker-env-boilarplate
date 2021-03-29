import type { FC } from 'react';
import type { WithoutChildren } from '../types';

export interface Props extends WithoutChildren {
  alt?: string;
  height?: number;
  src?: string;
  width?: number;
}

const placeHolder =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkqAcAAIUAgUW0RjgAAAAASUVORK5CYII=';

const Component: FC<Props> = ({
  alt = '',
  height,
  src = placeHolder,
  width,
}) => <img alt={alt} height={height} src={src} width={width} />;
Component.displayName = 'Image';

export default Component;
