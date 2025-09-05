// src/App.jsx
import { Canvas } from '@react-three/fiber'
import { useRef } from 'react';
import { SceneObjects } from './components/SceneObjects';

import { FollowCamera } from './components/FollowCamera';
import { Physics } from '@react-three/cannon';

import { OrbitControls } from '@react-three/drei';
import { Ground } from './components/Ground';
import { PlayerCactus } from './components/Player';

function App() {
    const playerRef = useRef();
    

  return (
    <Canvas shadows camera={{ position: [0, 10, 0], fov:100}} style={{ height: '100vh', width: '100vw' }}>
      <ambientLight intensity={0.2} color="#ffffff" position={[0, 1, 0]} />
      <directionalLight
        castShadow
        position={[0, 10, 0]}
        intensity={0}
        color={"#C81111FF"}
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-near={1}
        shadow-camera-far={50}
        shadow-camera-left={-10}
        shadow-camera-right={10}
        shadow-camera-top={0}
        shadow-camera-bottom={-10}
      />
      <pointLight position={[22,15 , 14]} color="#FF8000" intensity={1000} castShadow shadow-mapSize={1024} />
      <pointLight position={[10, 5, 10]} color="#F700FF" intensity={5000} castShadow shadow-mapSize={1024} />
      <pointLight position={[35, 7, 17]} color="#E76C08" intensity={2000} castShadow shadow-mapSize={1024} />
      <pointLight position={[40, 10, 0]} color="#E76C08" intensity={5000} castShadow shadow-mapSize={1024} />
      <pointLight position={[57, 20, 10]} color="#E76C08" intensity={5000} castShadow shadow-mapSize={1024} />
      <pointLight position={[20, 7, -25]} color="#E76C08" intensity={1000} castShadow shadow-mapSize={1024} />
      <pointLight position={[20, 10, -25]} color="#F700FF" intensity={500} castShadow shadow-mapSize={1024} />
      <pointLight position={[-35, 5, 0]} color="#FFFCFF" intensity={500} castShadow shadow-mapSize={1024} />
      
      
      <Physics gravity={[0, -9.8, 0]}>
        <Ground/>
        <SceneObjects />
        <PlayerCactus ref={playerRef} />
      </Physics>

      <FollowCamera targetRef={playerRef} />
    </Canvas>
  )
}

export default App
