import { Link, Stack } from "expo-router";
import { View } from "react-native";

export default function Root() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "HOME" }} />
      <Link href="/vision-camera">GO TO VISION CAMERA</Link>
    </View>
  );
}
