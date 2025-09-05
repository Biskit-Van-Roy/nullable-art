// components/Marvin.jsx
import React, {
  useEffect,
  useRef,
  forwardRef,
  useImperativeHandle,
} from 'react'
import { useGLTF, useAnimations } from '@react-three/drei'
import { SkeletonUtils } from 'three-stdlib'

export const Marvin = forwardRef((props, ref) => {
  const group = useRef()

  const { scene, animations } = useGLTF('/models/marvin_the_martian.glb')
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene])
  const { actions } = useAnimations(animations, group)

  // Exponer referencia al exterior (para Player.js u otros)
  useImperativeHandle(ref, () => ({
    group: group.current,
    actions: actions,
  }))

  useEffect(() => {
    // Reproducir animación 'idle' por defecto si existe
    if (actions.idle) {
      actions.idle.reset().fadeIn(0.2).play()
    }
    console.log("🎮 Animaciones de Marvin disponibles:", Object.keys(actions))
  }, [actions])

  return (
    <group ref={group} {...props}>
      <primitive object={clone} />
    </group>
  )
})

useGLTF.preload('/models/marvin_the_martian.glb')
