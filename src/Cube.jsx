import React, { useRef } from 'react';
import { Canvas, useFrame,  } from '@react-three/fiber';
import { OrbitControls, Text, useGLTF } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const Cube = ({ onFaceClick }) => {
  const facesRef = useRef([]);
  const cubeRef = useRef();
  // const clockRef = useRef(0);

  const navigate = useNavigate(); // Get navigate function from react-router

  // Load the hologram base model
  // const { scene: hologramModel } = useGLTF('/model/hologram base.glb');

  // Colors for each face
  const faceColors = ['red', 'blue', 'green', 'yellow', 'orange', 'purple'];

  // Names for each face
  const faceNames = ['Projects', 'Skill', 'Experience', 'Education', 'About', 'Contact'];

  // Handle face clicks
  const handleFaceClick = (event, index) => {
    event.stopPropagation();
    navigate(`/${faceNames[index].toLowerCase()}`); // Navigate to the corresponding route

    // Trigger the callback to pass the clicked face animation
    onFaceClick(faceNames[index]);
  };

  // Cube positions and rotations
  const positions = [
    [2.5, 0, 0],
    [-2.5, 0, 0],
    [0, 2.5, 0],
    [0, -2.5, 0],
    [0, 0, 2.5],
    [0, 0, -2.5],
  ];

  const rotations = [
    [0, Math.PI / 2, 0],
    [0, -Math.PI / 2, 0],
    [-Math.PI / 2, 0, 0],
    [Math.PI / 2, 0, 0],
    [0, 0, 0],
    [Math.PI, 0, 0],
  ];

  // Animation: Rotate and move the cube
  useFrame(() => {
    if (cubeRef.current) {
      // clockRef.current += 0.02;
      cubeRef.current.rotation.y += 0.01;
      cubeRef.current.rotation.x += 0.01;
      // cubeRef.current.position.y = Math.sin(clockRef.current) * 0.5;
    }
  });

  return (
    <>
    
      {/* Camera for the cube (make sure it only affects the cube) */}
      <perspectiveCamera makeDefault position={[0, 3, 7]} />
      
      {/* Cube group with faces */}
      <group ref={cubeRef}>
        {faceColors.map((color, index) => (
          <mesh
            key={index}
            ref={(el) => (facesRef.current[index] = el)}
            // position={positions[index]}
            position={positions[index]}
            rotation={rotations[index]}
            onClick={(event) => handleFaceClick(event, index)} // Handle click on face 
            scale={1.7}
          >
            <boxGeometry args={[2, 2, 0.1]} />
            <meshStandardMaterial
              color="black"
              emissive="cyan"
              emissiveIntensity={0.5}
              transparent
              opacity={0.8}
            />
            {/* Glowing Text */}
            <Text
              position={[0, 0, 0.1]} // Slightly offset from the face
              fontSize={0.3}
              color="white"
              anchorX="center"
              anchorY="middle"
              outlineColor="grey" // Glow outline
              outlineWidth={0.03} // Thickness of the glow
            >
              {faceNames[index]}
            </Text>
          </mesh>
        ))}
      </group>

      {/* OrbitControls for the rotating cube */}
      <OrbitControls minDistance={7} maxDistance={7} />

      {/* Hologram base (background, not affected by OrbitControls) */}
      

      {/* <primitive
        object={hologramModel}
        position={[0, -4, 0]} // Adjust position to be below the cube
        scale={[0.3, 0.3, 0.3]} // Adjust scale as needed
        /> */}

      {/* Background Lights */}
      <pointLight position={[0, 0, -10]} intensity={100} color="cyan" />
      <pointLight position={[0, -10, 0]} intensity={10} color="cyan" />
    </>
  );
};

export default Cube;
