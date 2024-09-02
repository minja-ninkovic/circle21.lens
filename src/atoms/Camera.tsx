import * as React from "react";
import { StyleSheet, View } from "react-native";
import hash from "stable-hash";
import {
  Camera as DefaultCamera,
  CameraProps,
  useCameraDevices,
  CameraDevice,
  useFrameProcessor,
  runAtTargetFps,
} from "react-native-vision-camera";
import { Button } from "./Button";
import RecordScreen, {
  RecordingResponse,
  RecordingResult,
} from "react-native-record-screen";

interface Props extends Omit<CameraProps, "device" | "isActive"> {
  isActive?: boolean;
  device?: CameraDevice;
}

function _Camera({ isActive = true, device, ...props }: Props) {
  const devices = useCameraDevices();
  const _device = device || devices[0];

  const [pipe, setPipe] = React.useState<string>("");
  const [recording, setRecording] = React.useState<boolean>(false);

  const frameProcessor = useFrameProcessor(
    (frame) => {
      "worklet";
      // console.log("I'm running synchronously at 60 FPS!");

      runAtTargetFps(1, async () => {
        "worklet";
        console.log("runAtTargetFps -> tick");
      });
    },
    [pipe]
  );

  const startRecording = React.useCallback(async () => {
    const res = await RecordScreen.startRecording().catch((error) =>
      console.error(error)
    );
    if (res === RecordingResult.PermissionError) {
      // user denies access
      console.log("user denies access");
    } else {
      setRecording(true);
    }
  }, []);

  const stopRecording = React.useCallback(async () => {
    const res = await RecordScreen.stopRecording()
      .then((value) => {
        console.log(value);
        return value;
      })
      .catch((error) => console.warn(error));
    if (!!res) {
      // const url = res.result.outputURL;
      setRecording(false);
      console.log(res);
    }
  }, []);

  // if (_device == null) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
      <DefaultCamera
        style={StyleSheet.absoluteFill}
        device={_device}
        isActive={isActive}
        // pixelFormat={Platform.OS === "ios" ? "native" : "yuv"}
        {...props}
        frameProcessor={frameProcessor}
      />
      {!recording && (
        <Button
          title="rec"
          onPress={() => {
            startRecording();
          }}
        />
      )}
      {recording && (
        <Button
          title="stop"
          onPress={() => {
            stopRecording();
          }}
        />
      )}
    </View>
  );
}

export const Camera = React.memo(
  _Camera,
  (prevProps, nextProps) => hash(prevProps) === hash(nextProps)
);
