import * as React from 'react';
import { StyleSheet, Text as RNText } from 'react-native';
import type { TextProps } from 'react-native';
import hash from 'stable-hash';
import { colors } from '../../styles';
import type { FontPack } from '../../styles';

interface Props extends TextProps {
  /** @default neutral200 = #EFEFEF */
  color?: string;
  fontPack: FontPack;
  /** @default center */
  textAlign?: 'left' | 'center' | 'right' | 'auto' | 'justify';
}

function _Text({
  color = colors.palette.neutral200,
  textAlign = 'left',
  style,
  fontPack,
  ...props
}: Props) {
  return <RNText style={[styles.title, { color, textAlign }, fontPack, style]} {...props} />;
}

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
  },
});

export const Text = React.memo(
  _Text,
  (prevProps, nextProps) => hash(prevProps) === hash(nextProps)
);
