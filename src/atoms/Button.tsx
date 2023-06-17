import { ActivityIndicator, Dimensions, PressableProps, ViewStyle } from 'react-native';

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PlatformPressable } from '@react-navigation/elements';
import { colors, grid, typography } from '../../styles';
import { Gap } from './Gap';
import { getTextColor } from '../../helpers/getTextColor';
import hash from 'stable-hash';

export interface ButtonProps extends PressableProps {
  title: string;
  size?: 'large' | 'small' | 'huge';
  shape?: 'circle' | 'rounded-square';
  buttonColor?: string;
  textColor?: string;
  borderColor?: string;
  borderStyle?: 'dashed' | 'dotted' | 'solid';
  disabledButtonColor?: string;
  disabledTextColor?: string;
  disabledBorderColor?: string;
  // specific to PlatformPressable
  pressOpacity?: number;
  iconLeft?: JSX.Element | ((props: { size: number; color: string }) => JSX.Element);
  iconRight?: JSX.Element | ((props: { size: number; color: string }) => JSX.Element);
  disabled?: boolean;
  isLoading?: boolean;
  width?: number | string;
  justifyContent?: ViewStyle['justifyContent'];
  fullWidth?: boolean;
  containerStyle?: ViewStyle;
}

const SIZES_STYLE = {
  small: {
    paddingHorizontal: grid.spacings.space12,
    height: 34,
  },
  medium: {
    paddingHorizontal: grid.spacings.space16,
    height: 40,
  },
  large: {
    paddingHorizontal: grid.spacings.space20,
    height: 52,
  },
  huge: {
    paddingHorizontal: grid.spacings.space24,
    height: 72,
  },
};

const TEXT_SIZES_STYLE = {
  small: typography.actionSmall.medium,
  medium: typography.actionMedium.medium,
  large: typography.actionLarge.medium,
  huge: typography.bodyLarge.bold,
};

const ICON_SIZES = {
  small: 12,
  medium: 16,
  large: 22,
  huge: 32,
};

const BORDER_RADIUS_STYLE = {
  circle: { borderRadius: 50 },
  'rounded-square': { borderRadius: 10 },
};

const GAPS_BETWEEN_ELEMENTS = {
  small: grid.spacings.space4,
  medium: grid.spacings.space6,
  large: grid.spacings.space8,
  huge: grid.spacings.space16,
};

function _Button({
  title,
  size = 'large',
  shape = 'circle',
  buttonColor = colors.palette.neutral800,
  textColor = colors.palette.neutral100,
  borderColor = colors.palette.neutral800,
  borderStyle = 'solid',
  iconLeft,
  iconRight,
  disabled,
  isLoading,
  width,
  disabledButtonColor = colors.palette.neutral400,
  disabledTextColor = colors.palette.neutral100,
  disabledBorderColor = colors.palette.neutral400,
  justifyContent = 'center',
  fullWidth = true,
  containerStyle = null,
  ...props
}: ButtonProps) {
  const finalButtonColor = disabled ? disabledButtonColor : buttonColor;
  const finalTextColor = disabled ? disabledTextColor : textColor;
  const finalBorderColor = disabled ? disabledBorderColor : borderColor;
  const sizeStyle = SIZES_STYLE[size];
  const textSizeStyle = TEXT_SIZES_STYLE[size];
  const borderRadiusStyle = BORDER_RADIUS_STYLE[shape];
  const pressColor = getTextColor(finalButtonColor);
  const iconSize = ICON_SIZES[size];
  const GAP_SIZE = GAPS_BETWEEN_ELEMENTS[size];
  return (
    <View
      style={StyleSheet.flatten([
        styles.wrapper,
        borderRadiusStyle,
        typeof width !== 'undefined' ? { width: width } : {},
        containerStyle && containerStyle,
      ])}>
      <PlatformPressable
        disabled={disabled}
        pressOpacity={0.8}
        pressColor={pressColor}
        //@ts-ignore
        style={StyleSheet.flatten([
          styles.button,
          sizeStyle,
          borderRadiusStyle,
          {
            backgroundColor: finalButtonColor,
            borderColor: finalBorderColor,
            borderStyle: borderStyle,
          },
          { justifyContent: justifyContent },
          fullWidth && styles.fullWidthStyle,
        ])}
        {...props}>
        {iconLeft
          ? typeof iconLeft === 'function'
            ? iconLeft({ size: iconSize, color: finalTextColor || pressColor })
            : iconLeft
          : null}
        {iconLeft ? <Gap direction="horizontal" size={title || iconRight ? GAP_SIZE : 0} /> : null}
        <Text style={[textSizeStyle, { color: finalTextColor || pressColor }]}>{title}</Text>
        {iconRight ? <Gap direction="horizontal" size={title || iconLeft ? GAP_SIZE : 0} /> : null}
        {iconRight
          ? typeof iconRight === 'function'
            ? iconRight({ size: iconSize, color: finalTextColor || pressColor })
            : iconRight
          : null}
        {/* {disabled ? <View style={[styles.disableCover, sizeStyle]} /> : null} */}
        {isLoading ? (
          <ActivityIndicator
            color={getTextColor(finalButtonColor)}
            size="small"
            style={[
              StyleSheet.absoluteFillObject,
              styles.activityIndicator,
              { backgroundColor: finalButtonColor },
            ]}
          />
        ) : null}
      </PlatformPressable>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    overflow: 'hidden',
    alignItems: 'center',
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.palette.neutral400,
    overflow: 'hidden',
    flexDirection: 'row',
  },
  disableCover: {
    backgroundColor: colors.palette.neutral400,
    position: 'absolute',
    width: '100%',
    opacity: 0.7,
  },
  activityIndicator: {
    alignSelf: 'center',
    backgroundColor: 'red',
  },
  fullWidthStyle: {
    width: '100%',
  },
});

export const Button = React.memo(
  _Button,
  (prevProps, nextProps) => hash(prevProps) === hash(nextProps)
);
