// components/FollowCamera.jsx
import { useFrame, useThree } from "@react-three/fiber";
import { useRef, useEffect, useState } from "react";
import * as THREE from "three";

export function FollowCamera({ targetRef }) {
  const { camera } = useThree();
  const vec = useRef(new THREE.Vector3());

  // Posición base de la cámara con respecto al personaje
  const baseOffset = new THREE.Vector3(0, 1, -8); // vista trasera, sin altura (se añade en la rotación)

  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMouse({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useFrame(() => {
    if (!targetRef.current?.getPosition) return;

    const [x, y, z] = targetRef.current.getPosition();

    const angleY = mouse.x * Math.PI * 1; // Horizontal
    const angleX = THREE.MathUtils.clamp(mouse.y, -1, 1) * Math.PI * 0.25; // Vertical (limitado)

    // Crear una matriz de rotación combinada: primero Y (yaw), luego X (pitch)
    const offset = baseOffset.clone();

    const euler = new THREE.Euler(angleX, angleY, 0, "YXZ");
    offset.applyEuler(euler);

    // Sumar al personaje para obtener la posición deseada de la cámara
    const desiredPosition = vec.current.set(x, y + 5, z).add(offset); // y+5: altura del centro del cuerpo
    camera.position.lerp(desiredPosition, 0.1);

    // Mirar al personaje (ligeramente hacia el torso/cabeza)
    camera.lookAt(x, y + 5, z);
  });

  return null;
}
