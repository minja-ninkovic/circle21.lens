import * as React from "react";
import { StyleSheet } from "react-native";
import hash from "stable-hash";
import {
  Camera as DefaultCamera,
  CameraProps,
  useCameraDevices,
  CameraDevice,
  useFrameProcessor,
} from "react-native-vision-camera";
import {
  FFmpegKit,
  FFmpegKitConfig,
  ReturnCode,
} from "ffmpeg-kit-react-native";
import * as FileSystem from "expo-file-system";

interface Props extends Omit<CameraProps, "device" | "isActive"> {
  isActive?: boolean;
  device?: CameraDevice;
}

function _Camera({ isActive = true, device, ...props }: Props) {
  const devices = useCameraDevices();
  const _device = device || devices.back;

  const [pipe, setPipe] = React.useState(null);
  const once = React.useRef(false);

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    if (pipe) FFmpegKitConfig.writeToPipe(frame.toString(), pipe);
  }, []);

  React.useEffect(() => {
    !pipe &&
      setPipe(
        FFmpegKitConfig.registerNewFFmpegPipe().then((_pipe) => {
          FFmpegKit.executeAsync(
            `-hide_banner -y -i ${_pipe} -filter_complex loop=loop=-1 -c:v libx264 -r 30 ${FileSystem.documentDirectory}output.mp4`,
            async (session) => {
              const state = FFmpegKitConfig.sessionStateToString(
                await session.getState()
              );
              const returnCode = await session.getReturnCode();
              const failStackTrace = await session.getFailStackTrace();

              // ffprint(`FFmpeg process exited with state ${state} and rc ${returnCode}.${notNull(failStackTrace, "\\n")}`);

              // this.hideProgressDialog();

              // CLOSE PIPES
              FFmpegKitConfig.closeFFmpegPipe(pipe);

              if (ReturnCode.isSuccess(returnCode)) {
                // ffprint("Create completed successfully; playing video.");
                // this.playVideo();
                // listAllStatistics(session);
              } else {
                // ffprint("Create failed. Please check log for the details.");
              }
            }
          );
        })
      );

      return () => {
        FFmpegKit.cancel();
      }
  }, [pipe]);

  if (_device == null) return null;

  return (
    <DefaultCamera
      style={StyleSheet.absoluteFill}
      device={_device}
      isActive={isActive}
      {...props}
      frameProcessor={frameProcessor}
    />
  );
}

export const Camera = React.memo(
  _Camera,
  (prevProps, nextProps) => hash(prevProps) === hash(nextProps)
);
