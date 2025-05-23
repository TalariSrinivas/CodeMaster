import React from 'react';
import { Users, Code, Rocket, Heart } from 'lucide-react';

const teamMembers = [
  {
    name: 'T Srinivas',
    role: 'Frontend Developer',
    image: '/pic.png',
  },
  {
    name: 'Md Azeez',
    role: 'Backend Engineer',
    image: '/azeez.jpg',
  },
  {
    name: 'Sk Saboor',
    role: 'UI/UX Designer',
    image: '/saboor.jpg',
  },
];

const AboutUs = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-6">
      <div className="max-w-5xl mx-auto text-center">

        {/* Meet the Team Section */}
        <h2 className="text-3xl font-bold mb-8 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          Meet the Team
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow hover:shadow-lg text-center transition w-64"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500 dark:border-pink-500"
              />
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">{member.name}</h4>
              
            </div>
          ))}
        </div>

        {/* About Us Heading */}
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          About Us
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-12">
          We are a passionate team building a platform to help you master coding, one problem at a time.
        </p>

        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-center mb-4">
              <Users className="w-10 h-10 text-purple-600 dark:text-purple-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Our Team</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We're a group of developers, educators, and dreamers who believe everyone should have access to high-quality coding education.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-center mb-4">
              <Code className="w-10 h-10 text-green-600 dark:text-green-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Our Mission</h3>
            <p className="text-gray-600 dark:text-gray-300">
              To make coding fun, accessible, and effective through interactive problems, real-time feedback, and a vibrant community.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-center mb-4">
              <Rocket className="w-10 h-10 text-red-500 dark:text-red-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Why We Started</h3>
            <p className="text-gray-600 dark:text-gray-300">
              We saw the struggle students face when learning to code and wanted to create something better—more intuitive, more personal.
            </p>
          </div>

          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <div className="flex items-center justify-center mb-4">
              <Heart className="w-10 h-10 text-pink-500 dark:text-pink-400" />
            </div>
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Our Values</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Community, growth, curiosity, and inclusivity. We build for learners of every background and skill level.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
