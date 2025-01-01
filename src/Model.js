import React, { useEffect } from 'react';
import { useFBX, useAnimations, useGLTF } from '@react-three/drei';

const Model = ({ position = [0, 0, 0], scale = 1 }) => {
  // Load the model
  const { scene } = useGLTF('/model/6770ec28b536bee7e16f371a.glb');

  // Load animations for waving and idle
  const waving = useFBX('/animation/Waving.fbx');
  const idle = useFBX('/animation/Standing W_Briefcase Idle.fbx');

  // Load actions for each animation
  const { actions: wavingActions, mixer: wavingMixer } = useAnimations(waving.animations, scene);
  const { actions: idleActions, mixer: idleMixer } = useAnimations(idle.animations, scene);

  useEffect(() => {
    // Play waving animation once
    const wavingAnimationName = waving.animations[0].name;
    if (wavingAnimationName) {
      if (wavingActions[wavingAnimationName]) {
        wavingActions[wavingAnimationName].play();
        wavingActions[wavingAnimationName].clampWhenFinished = true; // Prevent looping
      }
    }
    

    // Play idle animation after waving animation ends
    wavingActions.onFinished = () => {
      const idleAnimationName = idle.animations[0].name;
      if (idleAnimationName && idleActions[idleAnimationName]) {
        const idleAction = idleActions[idleAnimationName];
        idleAction.play(); // Start idle animation
      }
    };

    return () => {
      // Cleanup: stop all actions on unmount
      wavingMixer.stopAllAction();
      idleMixer.stopAllAction();
    };
  }, [wavingActions, idleActions, wavingMixer, idleMixer, scene]);

  return (
    <primitive
      object={scene}
      position={position}
      scale={scale}
    />
  );
};

export default Model;


// still needs chnages 