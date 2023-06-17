import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { Gap } from './Gap';
import type { Spacings } from '../../styles';

interface Props {
  /** @default `space-between` */
  justifyContent?: ViewStyle['justifyContent'];
  /** @default `center` */
  alignItems?: ViewStyle['alignItems'];
  paddingVertical?: ViewStyle['paddingVertical'];
  paddingHorizontal?: ViewStyle['paddingHorizontal'];
  backgroundColor?: string;
  /** gap between children */
  gap?: Spacings | 0;
  width?: number | `${number}%` | 'auto';
  height?: number | `${number}%`;
  style?: ViewStyle;
}

export function Row({
  justifyContent,
  alignItems,
  paddingHorizontal,
  paddingVertical,
  backgroundColor,
  children,
  width = '100%',
  gap,
  height,
  style = {},
}: React.PropsWithChildren<Props>) {
  const _style = React.useMemo(() => {
    return {
      justifyContent: justifyContent || 'space-between',
      alignItems: alignItems || 'center',
      paddingHorizontal: paddingHorizontal,
      paddingVertical: paddingVertical,
      backgroundColor: backgroundColor,
      flexDirection: 'row',
      width: width,
      height,
      ...style,
    } as ViewStyle;
  }, [
    justifyContent,
    alignItems,
    paddingHorizontal,
    paddingVertical,
    width,
    height,
    backgroundColor,
    style,
  ]);

  const arrayOfChildren = React.Children.toArray(children).filter((c) => c);

  return (
    <View style={_style}>
      {React.Children.toArray(
        React.Children.map(arrayOfChildren, (child, index) => (
          <>
            {child}
            {gap && child ? (
              index === arrayOfChildren.length - 1 ? null : (
                <Gap size={gap} direction="horizontal" />
              )
            ) : null}
          </>
        ))
      )}
    </View>
  );
}
