//app.js

import React, { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Cube from "./Cube";
import { OrbitControls } from "@react-three/drei";
import Model from "./Model";
import { Route, Routes, useLocation } from "react-router-dom";
import Projects from "./pages/Projects";
import Skill from "./pages/Skill";
import Experience from "./pages/Experience";
import Education from "./pages/Education";
import About from "./pages/About";
import Contact from "./pages/Contact";
import { AnimatePresence, motion } from "framer-motion";

const Xyz = () => {
  const location = useLocation();

  // State to store the previous path
  const [prevPath, setPrevPath] = useState(location.pathname);

  useEffect(() => {
    // Update prevPath whenever location changes
    setPrevPath(location.pathname);
  }, [location]);

  const getPageAnimations = (prevPath) => {
    switch (prevPath) {
      case "/Contact":
        return {
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
        };
      case "/Projects":
        return {
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
        };
      case "/Experience":
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
        };
      case "/Education":
        return {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };
      case "/Skill":
        return {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };
      case "/About":
        return {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };
      default:
        return {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
        };
    }
  };

  // Get the animations based on the previous path
  const pageAnimations = getPageAnimations(prevPath);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-gray-800 via-blue-900 to-black">
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
                {/* Canvas for the 3D Model */}
                <Canvas style={{ width: "50%", height: "100vh" }}>
                  <ambientLight intensity={1} />
                  <pointLight position={[10, 10, 10]} />
                  <Model position={[0, -3, 0]} scale={3.5} />
                  <OrbitControls 
                  // autoRotate
                  // autoRotateSpeed={0.5}
                  minDistance={7}
                  maxDistance={7}
                  // enablePan={false}
                  // dampingFactor={0.5}
                  minPolarAngle={Math.PI/3} 
                  maxPolarAngle={Math.PI/3}
                   />
                </Canvas>
                {/* Canvas for the Cube */}
                <Canvas style={{ width: "50%", height: "100vh" }}>
                  <ambientLight intensity={1} />
                  <pointLight position={[10, 10, 10]} />
                  <Cube />
                  <OrbitControls minDistance={7} maxDistance={7} />
                </Canvas>
              </motion.div>
            }
          />
          <Route
            path="/About"
            element={
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                exit={{ y: "100%" }}
                className="absolute inset-0 bg-red-500"
              >
                <About />
              </motion.div>
            }
          />
          <Route
            path="/Projects"
            element={
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
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
                className="absolute inset-0 bg-red-500"
              >
                <Skill />
              </motion.div>
            }
          />
          <Route
            path="/Experience"
            element={
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
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
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                className="absolute inset-0 bg-red-500"
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

export default Xyz;
