import { useMemo } from "react";
import * as THREE from "three";

import type { ReactElement } from "react";

type WavePoint = [number, number, number?];

type WaveProps = {
  points: WavePoint[];
  color?: string;
};

const Wave = ({ points, color = "#22d3ee" }: WaveProps): ReactElement => {
  const geometry = useMemo(() => {
    const vectors = points.map(([x, y, z = 0]) => new THREE.Vector3(x, y, z));
    return new THREE.BufferGeometry().setFromPoints(vectors);
  }, [points]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} />
    </lineSegments>
  );
};

export default Wave;
