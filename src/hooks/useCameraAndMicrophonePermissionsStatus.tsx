import React from "react";
import { Camera, CameraPermissionStatus } from "react-native-vision-camera";

interface ReturnProps {
  camera: {
    prevStatus: CameraPermissionStatus;
    currentStatus: CameraPermissionStatus;
  };
  microphone: {
    prevStatus: CameraPermissionStatus;
    currentStatus: CameraPermissionStatus;
  };
}

interface PermissionProps {
  prevStatus: CameraPermissionStatus;
  currentStatus: CameraPermissionStatus;
}

export function useCameraAndMicrophonePermissionsStatus(): ReturnProps {
  const undetermined: PermissionProps = {
    prevStatus: "not-determined",
    currentStatus: "not-determined",
  };
  const [cameraStatus, setCameraStatus] =
    React.useState<PermissionProps>(undetermined);
  const [microphoneStatus, setMicrophoneStatus] =
    React.useState<PermissionProps>(undetermined);

  const newCameraStatus = React.useCallback(
    (status: CameraPermissionStatus) => {
      setCameraStatus({
        prevStatus: cameraStatus.currentStatus,
        currentStatus: status,
      });
    },
    []
  );

  const newMicrophoneStatus = React.useCallback(
    (status: CameraPermissionStatus) => {
      setMicrophoneStatus({
        prevStatus: cameraStatus.currentStatus,
        currentStatus: status,
      });
    },
    []
  );

  React.useEffect(() => {
    (async () => {
      const cameraPermission = await Camera.getCameraPermissionStatus();
      if (cameraPermission === "not-determined") {
        const newCameraPermission = await Camera.requestCameraPermission();
        newCameraStatus(newCameraPermission);
      } else {
        newCameraStatus(cameraPermission);
      }
      const microphonePermission = await Camera.getMicrophonePermissionStatus();
      if (microphonePermission === "not-determined") {
        const newMicrophonePermission = await Camera.requestMicrophonePermission();
        newMicrophoneStatus(newMicrophonePermission);
      } else {
        newMicrophoneStatus(microphonePermission);
      }
    })();

    return () => {};
  }, []);

  return { camera: cameraStatus, microphone: microphoneStatus };
}
