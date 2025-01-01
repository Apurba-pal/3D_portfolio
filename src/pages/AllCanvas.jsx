import React from 'react';
import { Canvas } from '@react-three/fiber';
import Cube from '../Cube';
import { OrbitControls } from '@react-three/drei';
import Model from '../Model';

const AllCanvas = () => {
  return (
    <div>
      <div className="flex">
      {/* Canvas for the 3D Model */}
      <Canvas
        style={{
          width: '50%',
          height: '100vh',
          backgroundColor: 'blue',
        }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Model position={[0, -3, 0]} scale={3} />
        <OrbitControls minDistance={7} maxDistance={7} />
      </Canvas>

      {/* Canvas for the Cube */}
      <Canvas
        style={{
          width: '50%',
          height: '100vh',
          backgroundColor: 'blue',
        }}
      >
        <ambientLight intensity={1} />
        <pointLight position={[10, 10, 10]} />
        <Cube />
        <OrbitControls minDistance={7} maxDistance={7} />
        
      </Canvas>
    </div>
    </div>
  )
}

export default AllCanvas
