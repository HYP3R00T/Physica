import { useMemo } from "react";
import * as THREE from "three";

import type { ReactElement } from "react";

type AxesProps = {
    sizeX?: number;
    sizeY?: number;
    color?: string;
};

const Axes = ({ sizeX = 10, sizeY = 6, color = "#f8fafc" }: AxesProps): ReactElement => {
    const geometry = useMemo(() => {
        const points = [
            new THREE.Vector3(-sizeX, 0, 0),
            new THREE.Vector3(sizeX, 0, 0),
            new THREE.Vector3(0, -sizeY, 0),
            new THREE.Vector3(0, sizeY, 0),
        ];
        return new THREE.BufferGeometry().setFromPoints(points);
    }, [sizeX, sizeY]);

    return (
        <lineSegments geometry={geometry}>
            <lineBasicMaterial color={color} />
        </lineSegments>
    );
};

export default Axes;
