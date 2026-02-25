import { useMemo } from "react";
import { Text } from "@react-three/drei";
import * as THREE from "three";

import type { ReactElement } from "react";

type AxesProps = {
  sizeX?: number;
  sizeY?: number;
  color?: string;
  showMarkers?: boolean;
  markerInterval?: number;
  labelSize?: number;
  labelScale?: number;
};

const Axes = ({
  sizeX = 10,
  sizeY = 6,
  color = "#f8fafc",
  showMarkers = true,
  markerInterval = 1,
  labelSize = 0.25,
  labelScale = 1,
}: AxesProps): ReactElement => {
  const tickSize = 0.15 * labelScale;
  const labelOffset = 0.45 * labelScale;
  const axisGeometry = useMemo(() => {
    const points = [
      new THREE.Vector3(-sizeX, 0, 0),
      new THREE.Vector3(sizeX, 0, 0),
      new THREE.Vector3(0, -sizeY, 0),
      new THREE.Vector3(0, sizeY, 0),
    ];
    return new THREE.BufferGeometry().setFromPoints(points);
  }, [sizeX, sizeY]);

  const tickGeometry = useMemo(() => {
    const points: THREE.Vector3[] = [];

    // X-axis ticks
    for (let i = markerInterval; i <= sizeX; i += markerInterval) {
      points.push(new THREE.Vector3(i, -tickSize, 0), new THREE.Vector3(i, tickSize, 0));
      if (i !== 0) {
        points.push(new THREE.Vector3(-i, -tickSize, 0), new THREE.Vector3(-i, tickSize, 0));
      }
    }

    // Y-axis ticks
    for (let i = markerInterval; i <= sizeY; i += markerInterval) {
      points.push(new THREE.Vector3(-tickSize, i, 0), new THREE.Vector3(tickSize, i, 0));
      if (i !== 0) {
        points.push(new THREE.Vector3(-tickSize, -i, 0), new THREE.Vector3(tickSize, -i, 0));
      }
    }

    return new THREE.BufferGeometry().setFromPoints(points);
  }, [sizeX, sizeY, markerInterval]);

  const xMarkers = useMemo(() => {
    const markers = [];
    for (let i = markerInterval; i <= sizeX; i += markerInterval) {
      markers.push(i);
      if (i !== 0) markers.push(-i);
    }
    return markers;
  }, [sizeX, markerInterval]);

  const yMarkers = useMemo(() => {
    const markers = [];
    for (let i = markerInterval; i <= sizeY; i += markerInterval) {
      markers.push(i);
      if (i !== 0) markers.push(-i);
    }
    return markers;
  }, [sizeY, markerInterval]);

  return (
    <group>
      {/* Main axes */}
      <lineSegments geometry={axisGeometry}>
        <lineBasicMaterial color={color} />
      </lineSegments>

      {showMarkers && (
        <>
          {/* Tick marks */}
          <lineSegments geometry={tickGeometry}>
            <lineBasicMaterial color={color} />
          </lineSegments>

          {/* X-axis labels */}
          {xMarkers.map((x) => (
            <Text
              key={`x-${x}`}
              position={[x, -labelOffset, 0]}
              fontSize={labelSize * labelScale}
              color={color}
              anchorX="center"
              anchorY="top"
            >
              {x}m
            </Text>
          ))}

          {/* Y-axis labels */}
          {yMarkers.map((y) => (
            <Text
              key={`y-${y}`}
              position={[-labelOffset, y, 0]}
              fontSize={labelSize * labelScale}
              color={color}
              anchorX="right"
              anchorY="middle"
            >
              {y}m
            </Text>
          ))}

          {/* Origin label */}
          <Text
            position={[-labelOffset, -labelOffset, 0]}
            fontSize={labelSize * labelScale}
            color={color}
            anchorX="right"
            anchorY="top"
          >
            0
          </Text>
        </>
      )}
    </group>
  );
};

export default Axes;
