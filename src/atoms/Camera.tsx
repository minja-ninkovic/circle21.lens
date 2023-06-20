import * as React from "react";
import { StyleSheet } from "react-native";
import hash from "stable-hash";
import {
  Camera as DefaultCamera,
  CameraProps,
  useCameraDevices,
  CameraDevice,
} from "react-native-vision-camera";

interface Props extends Omit<CameraProps, "device" | "isActive"> {
  isActive?: boolean;
  device?: CameraDevice;
}

function _Camera({ isActive = true, device, ...props }: Props) {
  const devices = useCameraDevices();
  const _device = device || devices.back;

  if (_device == null) return null;

  return (
    <DefaultCamera style={StyleSheet.absoluteFill} device={_device} isActive={isActive} {...props} />
  );
}

export const Camera = React.memo(
  _Camera,
  (prevProps, nextProps) => hash(prevProps) === hash(nextProps)
);
