// WebPanel.jsx
import React from "react";
import { Html } from "@react-three/drei";

export const WebPanel = () => {
  return (
  <group position={[0, 5, -9.5]} rotation={[0, 1, 0]}>
    <Html transform distanceFactor={5.5} position={[0, 0, 0]} occlude>
      <div style={{
        width: "1024px",
        height: "576px",
        borderRadius: "10px",
        overflow: "hidden",
      }}>
        <iframe
          src="https://michaelhidalgo.netlify.app/"
          title="Embedded YouTube Video"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ width: "100%", height: "100%" }}
        />
      </div>
    </Html>
  </group>
  );
};
