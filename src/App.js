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
    <div className="relative w-full h-screen overflow-hidden bg-gray-800">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route
            path="/"
            element={
              <motion.div
                initial={pageAnimations.initial}
                animate={pageAnimations.animate}
                exit={pageAnimations.exit}
                className="absolute inset-0 flex"
              >
                <div></div>
                {/* Canvas for the 3D Model */}
                <Canvas style={{ width: "50%", height: "100vh" }}>
                  <ambientLight intensity={2} />
                  <pointLight position={[10, 10, 10]} />
                  <ModelWithAnimation/>
                  {/* <Model position={[0, -3, 0]} scale={3.5} /> */}
                  <OrbitControls
                    minDistance={7}
                    maxDistance={7}
                    minPolarAngle={Math.PI / 3}
                    maxPolarAngle={Math.PI / 3}
                  />
                </Canvas>
                <div className="flex flex-col justify-evenly items-center text-center text-white font-poppins text-lg leading-relaxed p-5 rounded-lg w-1/2 mx-auto">
                  <div>
                    Hello, I am
                    <span className="text-cyan-400 font-bold text-2xl">
                      {" "}
                      Apurba
                    </span>
                    <br />
                    This is my portfolio.
                    <br />
                    Interact with the cube to view the pages.
                  </div>
                </div>

                {/* Canvas for the Cube */}
                <div
                  className="flex flex-col mt-20 mb-40"
                  style={{ width: "50%", height: "100vh", padding: 0 }}
                >
                  <Canvas style={{ height: "50%", margin: 0, padding: 0 }}>
                    <ambientLight intensity={1} />
                    <pointLight position={[10, 10, 10]} />
                    <Cube onFaceClick={setFaceClicked} />
                  </Canvas>
                  <Canvas style={{ height: "200px", marginBottom: "100px", padding: 0 }}>
                    <primitive
                      object={hologramModel}
                      position={[1, -1, 0]} // Adjust position to be below the cube
                      scale={[0.4, 0.4, 0.4]} // Adjust scale as needed
                    />
                  </Canvas>
                </div>
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