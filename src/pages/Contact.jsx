import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Canvas, useFrame } from "react-three-fiber";
import { OrbitControls, useGLTF, useFBX } from "@react-three/drei";
import * as THREE from "three";
import { FiArrowRight } from "react-icons/fi";

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

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Handle form submission logic (e.g., send email, save data, etc.)
  };

  return (
    <motion.div className="flex bg-gray-900">
      <Canvas style={{ width: "30%", height: "100vh" }}>
        <ambientLight intensity={1.5} />
        <pointLight position={[10, 10, 10]}  />
        <ModelWithAnimation />
        <OrbitControls
          minDistance={7}
          maxDistance={7}
          minPolarAngle={Math.PI / 3}
          maxPolarAngle={Math.PI / 3}
        />
      </Canvas>
      <motion.div
        className="text-white min-h-screen flex flex-col items-center justify-center p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <button
        onClick={() => navigate('/')}
        className="absolute top-4 right-4 text-white py-2 px-6 rounded-full mb-8 hover:bg-gray-800 hover:bg-opacity-50 transition duration-300 gap-2 flex align-middle"
      >
        Back
        <FiArrowRight size={24} className="mr-2 size-5" />
      </button>
        <h1 className="text-4xl font-bold mb-4">Contact Me</h1>
        <p className="text-lg leading-relaxed mb-6">
          Feel free to reach out to me for any inquiries, collaborations, or just to say hello. I’m always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
        </p>
        <div className="flex gap-10">
          <div className="max-w-3xl text-center">
            <div className="flex flex-col space-y-4 mb-6">
              <a href="mailto:yourname@example.com" className="text-blue-400 hover:underline text-lg">
                palapurba2004@gmail.com
              </a>
              <a
                href="tel:+1234567890"
                className="text-blue-400 hover:underline text-lg"
              >
                9864803424
              </a>
              <a
                href="https://www.linkedin.com/in/yourname"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-lg"
              >
                LinkedIn Profile
              </a>
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-lg"
              >
                GitHub Profile
              </a>
              <a
                href="https://yourportfolio.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-400 hover:underline text-lg"
              >
                Portfolio Website
              </a>
            </div>
            {/* Contact Form */}
          </div>
          <div className="bg-gray-800 p-5 rounded-md shadow-lg">
            <h2 className="text-2xl font-bold mb-4">Send me a message</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-md"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-md"
                required
              />
              <textarea
                name="message"
                placeholder="Your Message"
                value={formData.message}
                onChange={handleChange}
                className="w-full p-3 bg-gray-700 text-white rounded-md"
                rows="4"
                required
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white p-3 rounded-md hover:bg-blue-600"
              >
                {isSubmitted ? "Message Sent!" : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
