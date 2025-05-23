import React from 'react';
import { Laptop, Code2, Users, BookOpenCheck } from 'lucide-react';

const Services = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-6">
      <div className="max-w-6xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text">
          Our Services
        </h1>
        <p className="text-gray-700 dark:text-gray-300 text-lg mb-12">
          Empowering you with everything you need to become a coding pro.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Service 1 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <Laptop className="w-10 h-10 text-indigo-600 dark:text-indigo-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Interactive Learning</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Hands-on coding exercises and real-time feedback to enhance your learning.
            </p>
          </div>

          {/* Service 2 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <Code2 className="w-10 h-10 text-green-600 dark:text-green-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Daily Challenges</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Practice daily with curated problems to sharpen your skills consistently.
            </p>
          </div>

          {/* Service 3 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <Users className="w-10 h-10 text-purple-600 dark:text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Community Support</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Join a vibrant community of coders, mentors, and learners helping each other.
            </p>
          </div>

          {/* Service 4 */}
          <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition">
            <BookOpenCheck className="w-10 h-10 text-pink-600 dark:text-pink-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Structured Courses</h3>
            <p className="text-gray-600 dark:text-gray-300">
              Learn through structured and beginner-friendly tutorials across all levels.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Services;
