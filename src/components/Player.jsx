// components/PlayerCactus.jsx
import React, { useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { Robot } from "./Robot";

const SPEED = 6;
const ROTATION_SPEED = 3;

export const PlayerCactus = forwardRef((props, ref) => {
  const cactusRef = useRef();
  const keysPressed = useRef({});
  const activeAction = useRef("idle");

  useImperativeHandle(ref, () => ({
    getPosition: () =>
      cactusRef.current?.group?.position?.toArray() || [10, 0, 10],
  }));

  useEffect(() => {
    const handleKeyDown = (e) => (keysPressed.current[e.code] = true);
    const handleKeyUp = (e) => (keysPressed.current[e.code] = false);

    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, []);

  useFrame((_, delta) => {
    const ref = cactusRef.current;
    if (!ref || !ref.group || !ref.actions) return;

    const group = ref.group;
    const actions = ref.actions;

    const forward = new THREE.Vector3(0, 0, -1).applyEuler(group.rotation);
    let isMoving = false;

    // Movimiento
    if (keysPressed.current["KeyS"]) {
      group.position.addScaledVector(forward, SPEED * delta);
      isMoving = true;
    }
    if (keysPressed.current["KeyW"]) {
      group.position.addScaledVector(forward, -SPEED * delta);
      isMoving = true;
    }

    // Rotación
    if (keysPressed.current["KeyA"]) {
      group.rotation.y += ROTATION_SPEED * delta;
    }
    if (keysPressed.current["KeyD"]) {
      group.rotation.y -= ROTATION_SPEED * delta;
    }

    // Animaciones
    if (isMoving) {
      if (activeAction.current !== "walking") {
        Object.values(actions).forEach((a) => a.stop?.());
        actions["Armature|Armature|walking_man|baselayer"]?.reset().fadeIn(0.2).play();
        activeAction.current = "walking";
      }
    } else {
      if (activeAction.current !== "idle") {
        actions["Armature|Armature|walking_man|baselayer"]?.fadeOut(0.2);
        activeAction.current = "idle";
      }
    }
  });

  return <Robot ref={cactusRef} scale={1.5} {...props} />;
});
