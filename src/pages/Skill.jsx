import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

const Skill = () => {
  const navigate = useNavigate();

  const skills = {
    "Full-Stack Development": [
      "JavaScript (ES6+)",
      "React.js",
      "Node.js",
      "Express.js",
      "JWT Authentication",
      "MongoDB",
      "Postman",
    ],
    "Frontend Tools & Libraries": [
      "HTML5 & CSS3",
      "TailwindCSS",
    ],
    "Machine Learning": [
      "Python",
      "NumPy",
      "Pandas",
      "Scikit-learn",
      "TensorFlow",
      "Keras",
      "Matplotlib",
      "opencv"
    ],
  };

  return (
    <div className="p-8 bg-gray-900 min-h-screen text-white">
      <button
        onClick={() => navigate('/')}
        className="absolute top-4 left-4 bg-gray-800 text-white py-2 px-6 rounded-full mb-8 hover:bg-gray-700 hover:bg-opacity-80 transition duration-300 gap-2 flex align-middle"
      >
        <FiArrowLeft size={24} className="mr-2" />
        Back
      </button>

      <h1 className="text-4xl font-bold mb-8 text-center">Skills</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {Object.keys(skills).map((category) => (
          <div key={category} className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold mb-4 border-b pb-2">
              {category}
            </h2>
            <ul className="space-y-2">
              {skills[category].map((skill, index) => (
                <li
                  key={index}
                  className="bg-gray-700 py-2 px-4 rounded-lg hover:bg-gray-600 transition duration-200"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Skill;
