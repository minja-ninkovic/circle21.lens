import * as React from 'react';
import { View } from 'react-native';
import type { Spacings } from '../../styles';

interface Props {
  size: Spacings | 0;
  direction?: 'vertical' | 'horizontal';
}

function _Gap({ size, direction = 'horizontal' }: Props) {
  return <View style={{ [direction === 'horizontal' ? 'width' : 'height']: size }} />;
}

export const Gap = React.memo(
  _Gap,
  (prevProps, nextProps) =>
    prevProps.size === nextProps.size && prevProps.direction === nextProps.direction
);
