import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const CubeFaces = ({ isScrolled, currentPath }) => {
  const faces = [
    { name: 'About', color: '#1a1a1a' },
    { name: 'Projects', color: '#1a1a1a' },
    { name: 'Skill', color: '#1a1a1a' },
    { name: 'Experience', color: '#1a1a1a' },
    { name: 'Education', color: '#1a1a1a' },
    { name: 'Contact', color: '#1a1a1a' }
  ];

  return (
    <motion.div
      className="fixed right-10 top-1/2 transform -translate-y-1/2 z-50 flex flex-col gap-4"
      animate={{
        opacity: isScrolled ? 1 : 0,
        x: isScrolled ? 0 : 100
      }}
      initial={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.5 }}
    >
      {faces.map((face) => (
        <Link key={face.name} to={`/${face.name}`}>
          <motion.div
            className={`w-16 h-16 flex items-center justify-center rounded-lg cursor-pointer 
              ${currentPath === `/${face.name}` ? 'bg-[#f5b700]' : 'bg-[#1a1a1a]'}`}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="text-white text-sm font-medium">{face.name}</span>
          </motion.div>
        </Link>
      ))}
    </motion.div>
  );
};

export default CubeFaces;
