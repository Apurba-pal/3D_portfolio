import React , {useRef, useEffect} from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { Canvas, useFrame } from "react-three-fiber";
import * as THREE from "three";
import { OrbitControls, useGLTF, useFBX } from "@react-three/drei";

const ModelWithAnimation = () => {
  const group = useRef();
  const { scene } = useGLTF("/model/6770ec28b536bee7e16f371a.glb");
  const animation = useFBX("/animation/Talking On A Cell Phone.fbx");
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

const About = () => {
  const navigate = useNavigate();

  return (
    <motion.div className="bg-gradient-to-br from-gray-800 via-blue-900 to-black text-white relative flex">
      <Canvas style={{ width: "40%", height: "100vh" }}>
        <ambientLight intensity={2} />
        <pointLight position={[10, 10, 10]} />
        <ModelWithAnimation />
        <OrbitControls
          minDistance={7}
          maxDistance={7}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 3}
        />
      </Canvas>
      <div className="w-4/5">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-4 left-4 text-white py-2 px-6 rounded-full mb-8 hover:bg-gray-800 hover:bg-opacity-50 transition duration-300 gap-2 flex align-middle"
        >
          <FiArrowLeft size={24} className="mr-2 size-5" />
          Back
        </button>

        {/* Header Section */}
        <div className="text-center pt-5">
          <h1 className="text-4xl font-bold mb-6">About Me</h1>
          <p className="text-lg max-w-3xl mx-auto">
            Hi, I'm <span className="font-semibold">Apurba Pal</span>, a passionate developer specializing in
            <span className="font-semibold"> web development</span> and
            <span className="font-semibold"> machine learning</span>. I hold a bachelor's degree in Computer Science
            and have over two years of experience building scalable web applications. During my internship
            at <span className="font-semibold">Jindal Steel and Power Limited</span>, I worked on impactful machine
            learning projects using OpenCV.
          </p>
        </div>

        {/* Main Content Section */}
        <div className="flex flex-col md:flex-row justify-center items-start p-8 space-y-8 md:space-y-0 md:space-x-8">
          {/* Left Column */}
          <div className="flex flex-col space-y-6 flex-1">
            {/* Professional Expertise */}
            <div className="bg-gray-700 p-6 rounded shadow-xl border-l-red-500">
              <h2 className="text-2xl font-semibold mb-4">Professional Expertise</h2>
              <p>
                I specialize in <span className="font-semibold">React</span> and
                <span className="font-semibold"> Node.js</span> for building scalable applications,
                and I use Python for machine learning.
              </p>
            </div>

            {/* Professional Goals */}
            <div className="bg-gray-700 p-6 rounded shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Professional Goals</h2>
              <p>
                My goals include leading impactful projects, collaborating with innovative teams, and creating inspiring designs.
              </p>
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col space-y-6 flex-1">
            {/* Beyond Work */}
            <div className="bg-gray-700 p-6 rounded shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Beyond Work</h2>
              <p>
                I enjoy playing chess, video games, and drawing. These activities keep me refreshed and motivated.
              </p>
            </div>

            {/* Call to Action */}
            <div className="bg-gray-700 p-6 rounded shadow-lg">
              <h2 className="text-2xl font-semibold mb-4">Let's Connect!</h2>
              <p>
                Feel free to reach out if you'd like to collaborate or chat about technology.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default About;
