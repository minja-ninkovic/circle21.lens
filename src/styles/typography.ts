import { TextStyle } from 'react-native';

const fontSizes = {
  s10: 10,
  s12: 12,
  s14: 14,
  s16: 16,
  s18: 18,
  s20: 20,
  s24: 24,
  s36: 36,
  s40: 40,
  s48: 48,
  s60: 60,
  s96: 96,
} as const;

const lineHeights = {
  s14: 14,
  s16: 16,
  s18: 18,
  s20: 20,
  s24: 24,
  s28: 28,
  s32: 32,
  s46: 46,
  s56: 56,
  s70: 70,
  s114: 114,
} as const;

type ValueOf<T> = T[keyof T];

export type FontPack = Pick<TextStyle, 'fontWeight' | 'fontSize' | 'lineHeight'>;
export type FontWeights = 'light' | 'regular' | 'medium' | 'bold' | 'extraBold';
export type FontSizes = ValueOf<typeof fontSizes>;
export type LineHeights = keyof typeof lineHeights;

// utility

function generateFontPack(
  fontSize: ValueOf<typeof fontSizes>,
  lineHeight: ValueOf<typeof lineHeights>
) {
  return {
    light: {
      fontWeight: 'normal',
      fontSize,
      lineHeight,
    },
    regular: {
      fontWeight: '400',
      fontSize,
      lineHeight,
    },
    medium: {
      fontWeight: '500',
      fontSize,
      lineHeight,
    },
    bold: {
      fontWeight: 'bold',
      fontSize,
      lineHeight,
    },
    extraBold: {
      fontWeight: '800',
      fontSize,
      lineHeight,
    },
  } as Record<FontWeights, FontPack>;
}

export const typography = {
  /**
   * The fontSizes are available to use, but prefer using the semantic name.
   */
  fontSizes,
  /**
   * The lineHeights are available to use, but prefer using the semantic name.
   */
  lineHeights,
  large: generateFontPack(fontSizes.s96, lineHeights.s114),
  medium: generateFontPack(fontSizes.s60, lineHeights.s70),
  small: generateFontPack(fontSizes.s48, lineHeights.s56),
  xsmall: generateFontPack(fontSizes.s36, lineHeights.s46),
  h1: generateFontPack(fontSizes.s24, lineHeights.s32),
  h2: generateFontPack(fontSizes.s20, lineHeights.s28),
  h3: generateFontPack(fontSizes.s18, lineHeights.s24),
  h4: generateFontPack(fontSizes.s16, lineHeights.s20),
  h5: generateFontPack(fontSizes.s14, lineHeights.s16),
  bodyLarge: generateFontPack(fontSizes.s18, lineHeights.s28),
  bodyMedium: generateFontPack(fontSizes.s16, lineHeights.s24),
  bodySmall: generateFontPack(fontSizes.s14, lineHeights.s20),
  bodyXSmall: generateFontPack(fontSizes.s12, lineHeights.s18),
  caption: generateFontPack(fontSizes.s10, lineHeights.s14),
  overlineSmall: generateFontPack(fontSizes.s12, lineHeights.s14),
  overlineLarge: generateFontPack(fontSizes.s14, lineHeights.s18),
  actionLarge: generateFontPack(fontSizes.s16, lineHeights.s24),
  actionMedium: generateFontPack(fontSizes.s14, lineHeights.s20),
  actionSmall: generateFontPack(fontSizes.s12, lineHeights.s18),
  displayLarge: generateFontPack(fontSizes.s96, lineHeights.s114),
};
