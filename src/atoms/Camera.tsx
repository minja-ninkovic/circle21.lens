import * as React from "react";
import { Platform, StyleSheet, View } from "react-native";
import hash from "stable-hash";
import {
  Camera as DefaultCamera,
  CameraProps,
  useCameraDevices,
  CameraDevice,
  useFrameProcessor,
  runAsync,
} from "react-native-vision-camera";
// import {
//   FFmpegKit,
//   FFmpegKitConfig,
//   ReturnCode,
// } from "ffmpeg-kit-react-native";
// import * as FileSystem from "expo-file-system";
// import { Button } from "./Button";

interface Props extends Omit<CameraProps, "device" | "isActive"> {
  isActive?: boolean;
  device?: CameraDevice;
}

function _Camera({ isActive = true, device, ...props }: Props) {
  const devices = useCameraDevices();
  const _device = device || devices[0];

  const [pipe, setPipe] = React.useState(null);

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    console.log("I'm running synchronously at 60 FPS!");
    
    // if (pipe) {
    //   FFmpegKitConfig.writeToPipe(frame.toString(), pipe);
    // }
  }, []);

  function notNull(string, valuePrefix) {
    return string === undefined || string == null
      ? ""
      : valuePrefix.concat(string);
  }

  // React.useEffect(() => {
  //   console.log(pipe);

  //   !pipe &&
  //     FFmpegKitConfig.registerNewFFmpegPipe().then((_pipe) => {
  //       FFmpegKit.executeAsync(
  //         `-y -i ${_pipe} -filter_complex format=yuv420p -loop 1 -r 30 ${FileSystem.documentDirectory}output.mp4`,
  //         async (session) => {
  //           const state = FFmpegKitConfig.sessionStateToString(
  //             await session.getState()
  //           );
  //           const returnCode = await session.getReturnCode();
  //           const failStackTrace = await session.getFailStackTrace();

  //           console.log(
  //             `FFmpeg process exited with state ${state} and rc ${returnCode}.${notNull(
  //               failStackTrace,
  //               "\\n"
  //             )}`
  //           );

  //           // this.hideProgressDialog();

  //           // CLOSE PIPES
  //           FFmpegKitConfig.closeFFmpegPipe(_pipe);

  //           if (ReturnCode.isSuccess(returnCode)) {
  //             console.log("Create completed successfully; playing video.");
  //             // this.playVideo();
  //             // listAllStatistics(session);
  //           } else {
  //             // ffprint("Create failed. Please check log for the details.");
  //           }
  //         }
  //       );
  //       setPipe(_pipe);
  //     });

  //   return () => {
  //     FFmpegKit.cancel();
  //   };
  // }, [pipe]);

  // if (_device == null) return null;

  return (
    <View style={StyleSheet.absoluteFill}>
      <DefaultCamera
        style={StyleSheet.absoluteFill}
        device={_device}
        isActive={isActive}
        pixelFormat={Platform.OS === "ios" ? "native" : "yuv"}
        {...props}
        frameProcessor={frameProcessor}
      />
      {/* <Button
        title="rec"
        onPress={() => {
          FFmpegKit.cancel();
        }}
      /> */}
    </View>
  );
}

export const Camera = React.memo(
  _Camera,
  (prevProps, nextProps) => hash(prevProps) === hash(nextProps)
);
