import { Stack } from "expo-router";
import { colors, typography } from "../src/styles";

export default function Layout() {
  return (
    <Stack
      initialRouteName="home"
      screenOptions={{
        headerStyle: {
          backgroundColor: colors.palette.neutral800,
        },
        headerTintColor: colors.palette.neutral100,
        headerTitleStyle: typography.h2.bold,
      }}
    >
      <Stack.Screen name="home" options={{}} />
    </Stack>
  );
}
