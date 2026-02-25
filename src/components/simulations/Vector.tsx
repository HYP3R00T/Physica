import { useMemo } from "react";
import * as THREE from "three";

import type { ReactElement } from "react";

type VectorProps = {
  origin?: [number, number, number];
  direction: [number, number, number];
  magnitude?: number;
  color?: string;
};

const Vector = ({
  origin = [0, 0, 0],
  direction,
  magnitude = 1,
  color = "#f97316",
}: VectorProps): ReactElement => {
  const { lineGeometry, rotation, endPosition, coneRadius, coneHeight } = useMemo(() => {
    const dir = new THREE.Vector3(direction[0], direction[1], direction[2]);
    if (dir.lengthSq() === 0) {
      dir.set(1, 0, 0);
    }
    dir.normalize();

    const end = dir.clone().multiplyScalar(magnitude);
    const linePoints = [new THREE.Vector3(0, 0, 0), end];
    const lineGeometry = new THREE.BufferGeometry().setFromPoints(linePoints);

    const coneHeight = Math.max(0.2, magnitude * 0.15);
    const coneRadius = Math.max(0.08, magnitude * 0.05);
    const coneOffset = coneHeight / 2;
    const endPosition: [number, number, number] = [
      end.x - dir.x * coneOffset,
      end.y - dir.y * coneOffset,
      end.z,
    ];

    const rotation = new THREE.Euler(0, 0, Math.atan2(dir.y, dir.x));

    return { lineGeometry, rotation, endPosition, coneRadius, coneHeight };
  }, [direction, magnitude]);

  return (
    <group position={origin} rotation={rotation}>
      <lineSegments geometry={lineGeometry}>
        <lineBasicMaterial color={color} />
      </lineSegments>
      <mesh position={endPosition}>
        <coneGeometry args={[coneRadius, coneHeight, 16]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </group>
  );
};

export default Vector;
