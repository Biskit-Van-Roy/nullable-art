import { usePlane } from '@react-three/cannon';
import { MeshReflectorMaterial } from '@react-three/drei';

export const Ground = () => {
  const [ref] = usePlane(() => ({
    type: 'Static',
    rotation: [-Math.PI / 2, 0, 0],
    position: [0, 0, 0],
  }));

  return (
    <mesh
      ref={ref}
      rotation={[-Math.PI / 2, 0, 0]}
      position={[0, 0, 0]}
 
    >
      <planeGeometry args={[1200, 1200]} />
      <MeshReflectorMaterial
        blur={[900, 1000]}
        resolution={1024}
        mixBlur={1}
        mixStrength={1.5}
        roughness={1.5}
        metalness={0.5}
        mirror={2}
        opacity={0}
        depthScale={1}
        minDepthThreshold={0}
        maxDepthThreshold={1000}
        color="#CE0BFFFF"
      />
    </mesh>
  );
};
