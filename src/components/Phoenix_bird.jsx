import React, { useRef, useEffect, useMemo } from 'react'
import { useFrame, useGraph } from '@react-three/fiber'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'
import * as THREE from 'three'

export function Phoenyx_bird(props) {
  const group = useRef()
  const innerGroup = useRef()
  const { scene, animations } = useGLTF('/models/phoenix_bird.glb')
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { nodes, materials } = useGraph(clone)
  const { actions } = useAnimations(animations, group)

  const angle = useRef(0)

  // Reproduce la animación "Take 001"
  useEffect(() => {
    const action = actions['Take 001']
    if (action) {
      action.reset().setLoop(THREE.LoopRepeat, Infinity).fadeIn(0.5).play()
    } else {
      console.warn('Animación "Take 001" no encontrada.')
    }

    return () => {
      action?.stop()
    }
  }, [actions])

  // Movimiento circular + rotación propia del modelo
  useFrame((_, delta) => {
    angle.current += delta * 0.5

    const radius = 45
    const x = 25+Math.cos(angle.current) * radius
    const z = 5+Math.sin(angle.current) * radius
    const y =  7+Math.sin(angle.current * 2) * 1

    // Mover en círculo
    group.current.position.set(x, y, z)

    // Que mire hacia adelante mientras gira
    const nextX = -Math.cos(angle.current + 0.01) * radius
    const nextZ = Math.sin(angle.current + 0.01) * radius
    group.current.lookAt(nextX, y, nextZ)

    // Rotar el modelo sobre sí mismo (eje Z o Y, prueba ambos)
    if (innerGroup.current) {
      innerGroup.current.rotation.y += delta * 1.5 // 🌀 ajusta velocidad aquí
    }
  })

  return (
    <group ref={group} {...props} dispose={null}>
      <group ref={innerGroup}>
        <group name="Sketchfab_Scene">
          <group
            name="Sketchfab_model"
            position={[0, 0, 0]}
            rotation={[-Math.PI / 2, 0, 0.053]}
          >
            <group
              name="5f59736c86d4457fa045aec4aea6b7e0fbx"
              rotation={[Math.PI / 2, 0, 0]}
            >
              <group name="Object_2">
                <group name="RootNode">
                  <group name="Object_4">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_7"
                      geometry={nodes.Object_7.geometry}
                      material={materials.MatI_Ride_FengHuang_01a}
                      skeleton={nodes.Object_7.skeleton}
                    />
                    <skinnedMesh
                      name="Object_8"
                      geometry={nodes.Object_8.geometry}
                      material={materials.MatI_Ride_FengHuang_01b}
                      skeleton={nodes.Object_8.skeleton}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload('/models/phoenix_bird.glb')
