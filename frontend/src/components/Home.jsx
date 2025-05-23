import React from 'react';
import { Code, BookOpen, Trophy } from 'lucide-react';

const Home = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-6 py-12 transition-colors duration-300">
      {/* Hero Section */}
      <div className="text-center max-w-2xl mx-auto mb-16">
      <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
        Welcome to CodeMaster 
      </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg">
          Level up your coding skills with interactive challenges, tutorials, and contests.
        </p>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {/* Practice */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
          <div className="bg-blue-100 dark:bg-blue-900 w-fit p-3 rounded-full mb-4">
            <Code className="text-blue-600 dark:text-blue-300" size={32} />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Practice Problems</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Solve thousands of problems in data structures, algorithms, and more.
          </p>
        </div>

        {/* Tutorials */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
          <div className="bg-green-100 dark:bg-green-900 w-fit p-3 rounded-full mb-4">
            <BookOpen className="text-green-600 dark:text-green-300" size={32} />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Interactive Tutorials</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Learn coding step-by-step with beginner-friendly tutorials.
          </p>
        </div>

        {/* Contests */}
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow hover:shadow-xl transition">
          <div className="bg-yellow-100 dark:bg-yellow-900 w-fit p-3 rounded-full mb-4">
            <Trophy className="text-yellow-600 dark:text-yellow-300" size={32} />
          </div>
          <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">Compete & Win</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Join coding competitions, improve your rank, and earn cool rewards!
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
