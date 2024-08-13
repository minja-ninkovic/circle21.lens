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
  runAtTargetFps,
} from "react-native-vision-camera";
import {
  FFmpegKit,
  FFmpegKitConfig,
  ReturnCode,
} from "ffmpeg-kit-react-native";
import * as FileSystem from "expo-file-system";
import { Button } from "./Button";
import { fromByteArray } from "react-native-quick-base64";

interface Props extends Omit<CameraProps, "device" | "isActive"> {
  isActive?: boolean;
  device?: CameraDevice;
}

function _Camera({ isActive = true, device, ...props }: Props) {
  const devices = useCameraDevices();
  const _device = device || devices[0];

  const [pipe, setPipe] = React.useState<string>('');
  const [recording, setRecording] = React.useState<boolean>(false);

  const frameProcessor = useFrameProcessor((frame) => {
    "worklet";
    // console.log("I'm running synchronously at 60 FPS!");

    runAtTargetFps(5, async () => {
      "worklet";
      // console.log(pipe);
      if (pipe !== '') {
        console.log("there is pipe");

        const buffer = frame.toArrayBuffer();
        const data = new Uint8Array(buffer);
        const base64 = fromByteArray(data);
        const filename =
          FileSystem.documentDirectory + "some_unique_file_name.jpg";
        await FileSystem.writeAsStringAsync(filename, base64, {
          encoding: FileSystem.EncodingType.Base64,
        });
        await FFmpegKitConfig.writeToPipe(filename, pipe);
      }
    });
  }, [pipe]);

  React.useEffect(() => {
    pipe === '' &&
      recording &&
      FFmpegKitConfig.registerNewFFmpegPipe().then((_pipe) => {
        console.log(_pipe);
        
        setPipe(_pipe);

        FFmpegKit.executeAsync(
          // `-y -i ${_pipe} -filter_complex -loop 1 -t 5.5 ${FileSystem.documentDirectory}output.mp4`,
          `-y -i ${_pipe} _filter_complex loop=loop=-1:size=1:start=0,setpts=PTS-STARTPTS,scale=w=\'if(gte(iw/ih,640/427),min(iw,640),-1)\':h=\'if(gte(iw/ih,640/427),-1,min(ih,427))\',scale=trunc(iw/2)*2:trunc(ih/2)*2,setsar=sar=1/1 format=yuv420p[video] -map [video] -fps_mode cfr -c:v mpeg4 -r 10 ${FileSystem.documentDirectory}output.mp4`,
          async (session) => {
            const returnCode = await session.getReturnCode();

            // CLOSE PIPES
            // FFmpegKitConfig.closeFFmpegPipe(_pipe);

            if (ReturnCode.isSuccess(returnCode)) {
              console.log("Create completed successfully; playing video.");
              // this.playVideo();
              // listAllStatistics(session);
            } else {
              console.error("Create failed. Please check log for the details.");
            }
          }
        );
      });

    return () => {
      FFmpegKit.cancel();
    };
  }, [pipe, recording]);

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
            setRecording(true);
          }}
        />
      )}
      {recording && (
        <Button
          title="stop"
          onPress={() => {
            FFmpegKit.cancel();
            setRecording(false);
            if (pipe) {
              FFmpegKitConfig.closeFFmpegPipe(pipe);
              setPipe('');
            }
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
