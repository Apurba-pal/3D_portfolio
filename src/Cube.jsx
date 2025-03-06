import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';

const Cube = ({ onFaceClick }) => {
  const facesRef = useRef([]);
  const cubeRef = useRef();
  const navigate = useNavigate();

  // Enhanced face colors with premium gradients
  const faceColors = [
    'linear-gradient(45deg, #f5b700, #ffcc00)', // Projects
    'linear-gradient(45deg, #e6a500, #ffd700)', // Skills
    'linear-gradient(45deg, #d4af37, #ffdb58)', // Experience
    'linear-gradient(45deg, #daa520, #ffd700)', // Education
    'linear-gradient(45deg, #c5a000, #ffd700)', // About
    'linear-gradient(45deg, #b8860b, #ffd700)'  // Contact
  ];

  // Names for each face
  const faceNames = ['Projects', 'Skill', 'Experience', 'Education', 'About', 'Contact'];

  // Handle face clicks
  const handleFaceClick = (event, index) => {
    event.stopPropagation();
    navigate(`/${faceNames[index].toLowerCase()}`);
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
      cubeRef.current.rotation.y += 0.01;
      cubeRef.current.rotation.x += 0.01;
    }
  });

  return (
    <>
      <perspectiveCamera makeDefault position={[0, 3, 7]} />
      
      <group ref={cubeRef}>
        {faceColors.map((color, index) => (
          <mesh
            key={index}
            ref={(el) => (facesRef.current[index] = el)}
            position={positions[index]}
            rotation={rotations[index]}
            onClick={(event) => handleFaceClick(event, index)}
            onPointerEnter={(e) => {
              document.body.style.cursor = 'pointer';
              e.object.scale.multiplyScalar(1.1);
            }}
            onPointerLeave={(e) => {
              document.body.style.cursor = 'default';
              e.object.scale.multiplyScalar(1/1.1);
            }}
            scale={1.7}
          >
            <boxGeometry args={[2, 2, 0.1]} />
            <meshPhongMaterial
              color="#1a1a1a"
              emissive="#f5b700"
              emissiveIntensity={0.6}
              transparent
              opacity={0.95}
              shininess={100}
              metalness={0.8}
              roughness={0.2}
            />
            <Text
              position={[0, 0, 0.1]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineColor="#f5b700"
              outlineWidth={0.03}
            >
              {faceNames[index]}
            </Text>
          </mesh>
        ))}
      </group>

      <OrbitControls 
        minDistance={7} 
        maxDistance={7}
        enableZoom={false}
        enablePan={false}
      />

      <pointLight position={[0, 0, -10]} intensity={50} color="#f5b700" />
      <pointLight position={[0, -10, 0]} intensity={30} color="#ffcc00" />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={2}
        color="#f5b700"
        distance={20}
      />
      <ambientLight intensity={0.2} color="#ffcc00" />
    </>
  );
};

export default Cube;
