import * as React from "react";
import { Text } from "../src/atoms/Text";
import { typography } from "../src/styles";
import { useCameraAndMicrophonePermissionsStatus } from "../src/hooks/useCameraAndMicrophonePermissionsStatus";
import { Linking, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { Button } from "../src/atoms/Button";
import { Column } from "../src/atoms/Column";
import { Camera } from "../src/atoms/Camera";

export default function VisionCamera() {
  const { camera: camera_status, microphone: microphone_status } =
    useCameraAndMicrophonePermissionsStatus();

  const CameraStatus = React.useCallback(() => {
    if (
      camera_status.currentStatus === "not-determined" ||
      microphone_status.currentStatus === "not-determined"
    ) {
      return (
        <Text fontPack={typography.bodyLarge.regular}>
          Checking camera '{camera_status.currentStatus}' and microphone '
          {microphone_status.currentStatus}' permissions
        </Text>
      );
    }

    if (
      camera_status.currentStatus === "denied" ||
      microphone_status.currentStatus === "denied"
    ) {
      return (
        <Column gap={12}>
          <Text fontPack={typography.bodyLarge.regular}>
            You must enable CAMERA AND MICROPHONE for this to work
          </Text>
          <Button
            title="Open Settings"
            onPress={() => {
              Linking.openSettings();
            }}
          />
        </Column>
      );
    }

    return <Camera />;
  }, [camera_status, microphone_status]);

  return (
    <View style={styles.container}>
      <Stack.Screen options={{ title: "Vision Camera" }} />
      <CameraStatus />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
