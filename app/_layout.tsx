import { Stack } from "expo-router";
import { colors, typography } from "../src/styles";
import { ThemeProvider } from "@react-navigation/native";
import { NavigationTheme } from "../src/helpers/navigationTheme";

export default function RootLayout() {
  return (
    <ThemeProvider value={NavigationTheme}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.palette.neutral800,
          },
          headerTintColor: colors.palette.neutral100,
          headerTitleStyle: typography.h2.bold,
        }}
      />
    </ThemeProvider>
  );
}
