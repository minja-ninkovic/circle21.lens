import * as React from 'react';
import { View, ViewStyle } from 'react-native';
import { Gap } from './Gap';
import type { Spacings } from '../../styles';

export interface ContainerProps {
  /** @default `flex-start` */
  justifyContent?: ViewStyle['justifyContent'];
  /** @default `center` */
  alignItems?: ViewStyle['alignItems'];
  paddingVertical?: ViewStyle['paddingVertical'];
  paddingHorizontal?: ViewStyle['paddingHorizontal'];
  marginHorizontal?: ViewStyle['marginHorizontal'];
  marginVertical?: ViewStyle['marginVertical'];
  backgroundColor?: string;
  /** gap between children */
  gap?: Spacings | 0;
  width?: number | `${number}%` | 'auto';
  height?: number | `${number}%`;
  style?: ViewStyle;
}

export function Column({
  justifyContent,
  alignItems,
  paddingHorizontal,
  paddingVertical,
  marginHorizontal,
  marginVertical,
  backgroundColor,
  children,
  width,
  gap,
  height,
  style = {},
}: React.PropsWithChildren<ContainerProps>) {
  const _style = React.useMemo(() => {
    return {
      justifyContent: justifyContent || 'flex-start',
      alignItems: alignItems || 'stretch',
      paddingHorizontal: paddingHorizontal,
      paddingVertical: paddingVertical,
      backgroundColor: backgroundColor,
      marginHorizontal: marginHorizontal,
      marginVertical: marginVertical,
      flexDirection: 'column',
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
    marginHorizontal,
    marginVertical,
    style,
  ]);
  const arrayOfChildren = React.Children.toArray(children);

  return (
    <View style={_style}>
      {React.Children.toArray(
        React.Children.map(arrayOfChildren, (child, index) => (
          <>
            {child}
            {index === arrayOfChildren.length - 1 ? null : gap && child !== null ? (
              <Gap size={gap} direction="vertical" />
            ) : null}
          </>
        ))
      )}
    </View>
  );
}
