// src/scenes/MainScene.jsx
import { Physics } from "@react-three/rapier";
import { Player } from "./Player";
import { SceneObjects } from "./SceneObjects";
import { Ground } from "./Ground";
export const Scene = () => {
  return (
    <>      
      <Physics gravity={[0, -9.8, 0]}>
        <Ground />
        <Player />        
        <SceneObjects />
      </Physics>
    </>
  );
};
