import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, OrbitControls } from '@react-three/drei';
import { useNavigate } from 'react-router-dom';
import * as THREE from 'three';

const Cube = ({ onFaceClick }) => {
  const facesRef = useRef([]);
  const cubeRef = useRef();
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const targetScales = useRef(Array(6).fill(1.0)); // Target scales for smooth interpolation

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

  // Add glow effect using multiple spotlights
  const spotlights = [
    { position: [10, 10, 10], intensity: 2 },
    { position: [-10, -10, -10], intensity: 2 },
    { position: [10, -10, 10], intensity: 2 },
    { position: [-10, 10, -10], intensity: 2 },
    { position: [0, 15, 0], intensity: 3 },
    { position: [0, -15, 0], intensity: 3 },
  ];

  // Animation: Rotate only when not hovered
  useFrame(() => {
    if (cubeRef.current && !isHovered) {
      cubeRef.current.rotation.y += 0.01;
      cubeRef.current.rotation.x += 0.01;
    }

    // Smooth scale animation for each face
    facesRef.current.forEach((face, index) => {
      if (face) {
        const currentScale = face.scale.x;
        const targetScale = targetScales.current[index];
        // Lerp the scale (smooth transition)
        face.scale.setScalar(
          THREE.MathUtils.lerp(currentScale, targetScale, 0.15)
        );
      }
    });
  });

  const handleHover = (index, isEntering) => {
    targetScales.current[index] = isEntering ? 1.1 : 1.0;
    document.body.style.cursor = isEntering ? 'pointer' : 'default';
  };

  return (
    <>
      <perspectiveCamera makeDefault position={[0, 3, 7]} />
      
      {/* Add fog for better glow effect */}
      <fog attach="fog" args={['#000000', 5, 30]} />
      
      <group 
        ref={cubeRef}
        onPointerEnter={() => setIsHovered(true)}
        onPointerLeave={() => setIsHovered(false)}
      >
        {faceColors.map((color, index) => (
          <mesh
            key={index}
            ref={(el) => (facesRef.current[index] = el)}
            position={positions[index]}
            rotation={rotations[index]}
            onClick={(event) => handleFaceClick(event, index)}
            onPointerEnter={() => handleHover(index, true)}
            onPointerLeave={() => handleHover(index, false)}
            scale={1.7}
          >
            <boxGeometry args={[3.6, 3.6, 0.1]} />
            <meshPhysicalMaterial
              color="#1a1a1a"
              emissive="#f5b700"
              emissiveIntensity={1.2}
              transparent
              opacity={0.9}
              metalness={0.9}
              roughness={0.2}
              clearcoat={1}
              clearcoatRoughness={0.2}
              reflectivity={1}
            />
            <Text
              position={[0, 0, 0.1]}
              fontSize={0.3}
              color="#ffffff"
              anchorX="center"
              anchorY="middle"
              outlineColor="#f5b700"
              outlineWidth={0.05}
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

      {/* Dynamic spotlights for enhanced glow */}
      {spotlights.map((light, index) => (
        <spotLight
          key={index}
          position={light.position}
          angle={0.5}
          penumbra={1}
          intensity={light.intensity}
          color="#f5b700"
          distance={25}
          decay={2}
        />
      ))}

      {/* Ambient and point lights for base illumination */}
      <ambientLight intensity={0.3} color="#ffcc00" />
      <pointLight position={[0, 0, 0]} intensity={2} color="#f5b700" distance={20} />
      
      {/* Add hemisphere light for better overall illumination */}
      <hemisphereLight
        skyColor="#f5b700"
        groundColor="#000000"
        intensity={0.5}
      />
    </>
  );
};

export default Cube;
