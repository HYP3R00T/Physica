import { useFrame, useThree } from "@react-three/fiber";
import { useEffect } from "react";

import type { ReactElement, ReactNode, RefObject } from "react";
import type { Object3D } from "three";

export type CameraMode = "static" | "follow";

type PhysicsSceneProps = {
  children: ReactNode;
  cameraMode?: CameraMode;
  followTarget?: RefObject<Object3D | null>;
  cameraZ?: number;
};

const PhysicsScene = ({
  children,
  cameraMode = "static",
  followTarget,
  cameraZ = 10,
}: PhysicsSceneProps): ReactElement => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.z = cameraZ;
    camera.updateProjectionMatrix();
  }, [camera, cameraZ]);

  useFrame(() => {
    if (cameraMode !== "follow" || !followTarget?.current) {
      return;
    }

    const target = followTarget.current.position;
    camera.position.x = target.x;
    camera.position.y = target.y;
  });

  return <group>{children}</group>;
};

export default PhysicsScene;
