import { useMemo } from "react";
import * as THREE from "three";

import type { ReactElement } from "react";

type GridProps = {
  sizeX?: number;
  sizeY?: number;
  divisionsX?: number;
  divisionsY?: number;
  color?: string;
};

const Grid = ({
  sizeX = 10,
  sizeY = 6,
  divisionsX = 10,
  divisionsY = 6,
  color = "#334155",
}: GridProps): ReactElement => {
  const geometry = useMemo(() => {
    const positions: number[] = [];
    const stepX = (sizeX * 2) / divisionsX;
    const stepY = (sizeY * 2) / divisionsY;

    for (let i = 0; i <= divisionsX; i += 1) {
      const x = -sizeX + i * stepX;
      positions.push(x, -sizeY, 0, x, sizeY, 0);
    }

    for (let j = 0; j <= divisionsY; j += 1) {
      const y = -sizeY + j * stepY;
      positions.push(-sizeX, y, 0, sizeX, y, 0);
    }

    const buffer = new THREE.BufferGeometry();
    buffer.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    return buffer;
  }, [divisionsX, divisionsY, sizeX, sizeY]);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial color={color} />
    </lineSegments>
  );
};

export default Grid;
