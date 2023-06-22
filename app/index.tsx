import { Link, Stack } from "expo-router";
import React from "react";
import { View } from "react-native";
import { ResizeMode, Video } from "expo-av";
import * as FileSystem from "expo-file-system";

export default function Root() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Stack.Screen options={{ title: "HOME" }} />
      <Link href="/vision-camera">GO TO VISION CAMERA</Link>
      <Video
        useNativeControls={true}
        resizeMode={ResizeMode.CONTAIN}
        source={{ uri: `${FileSystem.documentDirectory}output.mp4` }}
      />
    </View>
  );
}
