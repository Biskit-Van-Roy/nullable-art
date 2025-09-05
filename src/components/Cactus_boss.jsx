import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useGraph } from "@react-three/fiber";
import { useGLTF, useAnimations } from "@react-three/drei";
import { SkeletonUtils } from "three-stdlib";

export const Cactus = forwardRef((props, ref) => {
  const group = useRef();
  const { scene, animations } = useGLTF("/models/cactus_boss.glb");
  const clone = React.useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  const { actions } = useAnimations(animations, group);

  useImperativeHandle(ref, () => ({
    group: group.current,
    actions,
  }));

  useEffect(() => {
    // Reproducir animación idle o fallback si no existe
    if (actions["Walk Forward In Place"]) {
      actions["Walk Forward In Place"].paused = true; // Pausa caminata inicialmente
    }
    if (actions.idle) {
      actions.idle.play();
    } else {
      // Si no hay idle, pausa todas menos caminar
      Object.values(actions).forEach((action) => {
        action.paused = true;
      });
    }
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Cactus_Bossfbx" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="3_CactusBoss" position={[9.973, 0, 32.495]}>
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <group
                      name="Object_7"
                      position={[9.973, 0, 32.495]}
                      rotation={[-Math.PI / 2, 0, 0]}
                    />
                    <skinnedMesh
                      name="Object_8"
                      geometry={nodes.Object_8.geometry}
                      material={materials.Cactus_Boss}
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
  );
});

useGLTF.preload("/models/cactus_boss.glb");
