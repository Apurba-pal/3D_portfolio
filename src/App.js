//app.js

import React, { useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import Cube from "./Cube";
import { OrbitControls, useGLTF, useFBX } from "@react-three/drei";
import { Route, Routes, useLocation } from "react-router-dom";
import Projects from "./pages/Projects";
import Skill from "./pages/Skill";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { AnimatePresence, motion } from "framer-motion";
import * as THREE from "three";


const ModelWithAnimation = () => {
  const group = useRef();
  const { scene } = useGLTF("/model/6770ec28b536bee7e16f371a.glb");
  const animation = useFBX("/animation/Waving.fbx");
  const mixer = useRef(null);

  useEffect(() => {
    if (group.current && animation.animations.length) {
      mixer.current = new THREE.AnimationMixer(group.current);
      mixer.current.clipAction(animation.animations[0]).play();
    }

    return () => {
      if (mixer.current) {
        mixer.current.stopAllAction();
        mixer.current = null;
      }
    };
  }, [animation]);

  useFrame((state, delta) => {
    if (mixer.current) {
      mixer.current.update(delta);
    }
  });

  return <primitive ref={group} object={scene} scale={3.5} position={[0, -3, 0]} />;
};



const App = () => {
  const location = useLocation();
  const { scene: hologramModel } = useGLTF("/model/hologram base.glb");

  // State to store the previous path
  const [prevPath, setPrevPath] = useState(location.pathname);
  const [faceClicked, setFaceClicked] = useState(null); // Track which face was clicked

  useEffect(() => {
    // Update prevPath whenever location changes
    setPrevPath(location.pathname);
  }, [location]);

  const getPageAnimations = (faceClicked) => {
    console.log(faceClicked);
    if (!faceClicked) return {};
    switch (faceClicked) {
      case "About":
        return {
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
        };
      case "Experience":
        return {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };
      case "Contact":
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
        };
      case "Projects":
        return {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
        };
      case "Education":
        return {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };
      case "Skill":
        return {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };
    }
  };

  // Get the animations based on the previous path
  const pageAnimations = getPageAnimations(faceClicked);

  return (
    <div className="relative w-full h-screen overflow-hidden" style={{
      background: `radial-gradient(circle at 50% 30%, 
        #2d2305 20%, 
        #000000 100%
      )`
    }}>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 flex flex-col items-center justify-center"
              >
                {/* Centered Cube Container */}
                <motion.div 
                  initial={{ y: -50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="w-full h-[70vh] flex items-center justify-center"
                >
                  <Canvas>
                    <ambientLight intensity={1} />
                    <pointLight position={[10, 10, 10]} />
                    <Cube onFaceClick={setFaceClicked} />
                  </Canvas>
                </motion.div>

                {/* Bottom Text */}
                <motion.div 
                  initial={{ y: 50, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute bottom-10 w-full text-center"
                >
                  <p className="text-base text-[#f5b700] cube-instruction font-light tracking-wider">
                    " Interact with the cube to explore my portfolio "
                  </p>
                </motion.div>
              </motion.div>
            }
          />
          <Route
            path="/About"
            element={
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="absolute inset-0 "
              >
                <About />
              </motion.div>
            }
          />
          <Route
            path="/Projects"
            element={
              <motion.div
                initial={{ y: "-100%" }}
                animate={{ y: 0 }}
                exit={{ y: "-100%" }}
                className="absolute inset-0 bg-red-500"
              >
                <Projects />
              </motion.div>
            }
          />
          <Route
            path="/Skill"
            element={
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="absolute inset-0"
              >
                <Skill />
              </motion.div>
            }
          />
          <Route
            path="/Experience"
            element={
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="absolute inset-0 bg-red-500"
              >
                <Experience />
              </motion.div>
            }
          />
          <Route
            path="/Education"
            element={
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="absolute inset-0 bg-red-500"
              >
                <Education />
              </motion.div>
            }
          />
          <Route
            path="/Contact"
            element={
              <motion.div
                initial={{ x: "-100%" }}
                animate={{ x: 0 }}
                exit={{ x: "-100%" }}
                className="absolute inset-0"
              >
                <Contact />
              </motion.div>
            }
          />
        </Routes>
      </AnimatePresence>
    </div>
  );
};

export default App;