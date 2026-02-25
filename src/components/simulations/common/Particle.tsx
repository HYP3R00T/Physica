import type { ReactElement } from "react";

type ParticleProps = {
    position: [number, number, number];
    radius?: number;
    color?: string;
};

const Particle = ({ position, radius = 0.15, color = "#38bdf8" }: ParticleProps): ReactElement => (
    <mesh position={position}>
        <circleGeometry args={[radius, 32]} />
        <meshBasicMaterial color={color} />
    </mesh>
);

export default Particle;
