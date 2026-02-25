import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import { useEffect, useMemo, useRef, useState } from "react";

import Axes from "@/components/simulations/common/Axes";
import PhysicsScene, { type CameraMode } from "@/components/simulations/common/PhysicsScene";

import type { ReactElement, ReactNode, RefObject } from "react";
import type { Object3D, OrthographicCamera as OrthographicCameraType } from "three";

type Vec2 = { x: number; y: number };

type ZoomControlsProps = {
  zoom: number;
  minZoom: number;
  maxZoom: number;
  origin: Vec2;
  originOffsetFraction: Vec2;
  onZoomChange: (zoom: number) => void;
  onViewSizeChange: (size: { width: number; height: number }) => void;
};

const ZoomControls = ({
  zoom,
  minZoom,
  maxZoom,
  origin,
  originOffsetFraction,
  onZoomChange,
  onViewSizeChange,
}: ZoomControlsProps): null => {
  const { camera, gl } = useThree();
  const lastViewSize = useRef({ width: 0, height: 0 });

  useEffect(() => {
    const handleWheel = (event: WheelEvent): void => {
      event.preventDefault();
      const delta = event.deltaY;
      const zoomSpeed = 0.1;
      const nextZoom = zoom - delta * zoomSpeed;
      const clampedZoom = Math.max(minZoom, Math.min(maxZoom, nextZoom));
      onZoomChange(clampedZoom);
    };

    const canvas = gl.domElement;
    canvas.addEventListener("wheel", handleWheel, { passive: false });

    return () => {
      canvas.removeEventListener("wheel", handleWheel);
    };
  }, [gl, maxZoom, minZoom, onZoomChange, zoom]);

  useFrame(() => {
    if (camera instanceof Object && "zoom" in camera) {
      const orthoCamera = camera as OrthographicCameraType;
      orthoCamera.zoom = zoom;
      orthoCamera.updateProjectionMatrix();

      const viewWidth = (orthoCamera.right - orthoCamera.left) / orthoCamera.zoom;
      const viewHeight = (orthoCamera.top - orthoCamera.bottom) / orthoCamera.zoom;

      if (
        Math.abs(viewWidth - lastViewSize.current.width) > 0.001 ||
        Math.abs(viewHeight - lastViewSize.current.height) > 0.001
      ) {
        lastViewSize.current = { width: viewWidth, height: viewHeight };
        onViewSizeChange({ width: viewWidth, height: viewHeight });
      }

      orthoCamera.position.x =
        origin.x + viewWidth / 2 - viewWidth * originOffsetFraction.x;
      orthoCamera.position.y =
        origin.y + viewHeight / 2 - viewHeight * originOffsetFraction.y;
    }
  });

  return null;
};

const getMarkerInterval = (span: number): number => {
  const targetTicks = 8;
  const raw = Math.max(span / targetTicks, 0.01);
  const magnitude = Math.pow(10, Math.floor(Math.log10(raw)));
  const normalized = raw / magnitude;

  if (normalized <= 1) return magnitude;
  if (normalized <= 2) return 2 * magnitude;
  if (normalized <= 5) return 5 * magnitude;
  return 10 * magnitude;
};

const getLabelSize = (interval: number): number => {
  if (interval <= 1) return 0.25;
  if (interval <= 2) return 0.3;
  if (interval <= 5) return 0.35;
  return 0.4;
};

type GraphCanvasProps = {
  heightClass?: string;
  border?: boolean;
  origin?: Vec2;
  originOffsetFraction?: Vec2;
  zoom: number;
  onZoomChange: (zoom: number) => void;
  baseZoom?: number;
  minZoom?: number;
  maxZoom?: number;
  axisSize?: { x: number; y: number };
  showAxes?: boolean;
  showMarkers?: boolean;
  markerInterval?: number;
  labelSize?: number;
  cameraMode?: CameraMode;
  followTargetRef?: RefObject<Object3D | null>;
  children?: ReactNode;
};

const GraphCanvas = ({
  heightClass = "h-125",
  border = true,
  origin = { x: 0, y: 0 },
  originOffsetFraction = { x: 0.08, y: 0.08 },
  zoom,
  onZoomChange,
  baseZoom = 50,
  minZoom = 10,
  maxZoom = 150,
  axisSize = { x: 100, y: 100 },
  showAxes = true,
  showMarkers = true,
  markerInterval,
  labelSize,
  cameraMode = "static",
  followTargetRef,
  children,
}: GraphCanvasProps): ReactElement => {
  const [viewSize, setViewSize] = useState({ width: 10, height: 6 });

  const resolvedMarkerInterval = useMemo(() => {
    if (markerInterval) {
      return markerInterval;
    }
    return getMarkerInterval(Math.max(viewSize.width, viewSize.height));
  }, [markerInterval, viewSize]);

  const resolvedLabelSize = useMemo(() => {
    if (labelSize) {
      return labelSize;
    }
    return getLabelSize(resolvedMarkerInterval);
  }, [labelSize, resolvedMarkerInterval]);

  const labelScale = useMemo(() => baseZoom / zoom, [baseZoom, zoom]);

  const containerClass = `${heightClass} w-full${border ? " border border-border" : ""}`;

  const handleViewSizeChange = (size: { width: number; height: number }): void => {
    setViewSize(size);
  };

  return (
    <div className={containerClass}>
      <Canvas className="h-full w-full">
        <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={zoom} near={0.1} far={1000} />
        <ZoomControls
          zoom={zoom}
          minZoom={minZoom}
          maxZoom={maxZoom}
          origin={origin}
          originOffsetFraction={originOffsetFraction}
          onZoomChange={onZoomChange}
          onViewSizeChange={handleViewSizeChange}
        />
        <PhysicsScene cameraMode={cameraMode} followTarget={followTargetRef}>
          {showAxes && (
            <Axes
              sizeX={axisSize.x}
              sizeY={axisSize.y}
              showMarkers={showMarkers}
              markerInterval={resolvedMarkerInterval}
              labelSize={resolvedLabelSize}
              labelScale={labelScale}
            />
          )}
          {children}
        </PhysicsScene>
      </Canvas>
    </div>
  );
};

export default GraphCanvas;
