import React from 'react'
import { useGLTF } from '@react-three/drei'

export function Laocoon(props) {
  const { nodes, materials } = useGLTF('/models/laocoon.glb')

  console.log('Laocoon nodes:', nodes)
  console.log('Laocoon materials:', materials)

  return (
    <group {...props} dispose={null} position={[55, 0, 15]}>
      <mesh
        geometry={nodes.Object_2.geometry}
        material={materials.None}
        position={[0, 0, 0]}
        rotation={[-Math.PI, Math.PI / 2, 0]}
        castShadow
        receiveShadow
      />
    </group>
  )
}

useGLTF.preload('/models/laocoon.glb')
