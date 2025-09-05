import React, { useEffect, useRef, forwardRef, useImperativeHandle } from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export const Robot = forwardRef((props, ref) => {
  const group = useRef()
  const { scene, animations } = useGLTF('/models/robot.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions } = useAnimations(animations, group)

  useImperativeHandle(ref, () => ({
    group: group.current,
    actions: actions,
  }))

  useEffect(() => {
    // Iniciar la animación idle si está disponible
    actions.idle?.play()
    console.log("Animaciones disponibles:", Object.keys(actions))
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={clone} />
    </group>
  )
})

useGLTF.preload('/models/robot.glb')
