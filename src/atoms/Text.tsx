import * as React from "react";
import { StyleSheet, Text as RNText } from "react-native";
import type { TextProps, TextStyle } from "react-native";
import hash from "stable-hash";
import { colors, typography } from "../styles";
import type { FontPack } from "../styles";

interface Props extends TextProps {
  /** @default neutral200 = #EFEFEF */
  color?: string;
  /** @default bodySmall.regular = { fontSize: 14, lineHeight: 20, fontWeight: '400' } */
  fontPack?: FontPack;
  /** @default left */
  textAlign?: "left" | "center" | "right" | "auto" | "justify";
  style?: TextStyle;
}

function _Text({
  color = colors.palette.neutral200,
  textAlign = "left",
  fontPack = typography.bodySmall.regular,
  style,
  ...props
}: Props) {
  return (
    <RNText
      style={StyleSheet.flatten([{ color, textAlign }, fontPack, style])}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
});

export const Text = React.memo(
  _Text,
  (prevProps, nextProps) => hash(prevProps) === hash(nextProps)
);
