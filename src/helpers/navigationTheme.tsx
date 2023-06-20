import { DefaultTheme } from '@react-navigation/native';
import { colors } from '../styles';

export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
  },
};