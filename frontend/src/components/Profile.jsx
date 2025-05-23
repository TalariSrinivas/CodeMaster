import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Mail, Star, UserCircle2, Medal } from 'lucide-react'; // ✅ Import Medal icon
import { useUser } from '../context';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      axios
        .get(`http://localhost:5000/api/users/${user}`)
        .then((res) => setUserData(res.data))
        .catch((err) => console.error('Error fetching user data:', err));
    }
  }, [user, navigate]);

  if (!userData) return null;

  // 🎖️ Define all possible badges
  const allBadges = [
    {
      name: 'Rookie',
      minScore: 50,
      color:
        'bg-white dark:bg-gray-900 text-gray-800 dark:text-white border border-gray-200 dark:border-gray-700',
      image: '/B1.png',
    },
    {
      name: 'Pro',
      minScore: 100,
      color: 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white',
      image: '/B2.png',
    },
    {
      name: 'Legend',
      minScore: 150,
      color: 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white',
      image: '/B3.png',
    },
  ];

  // 🏅 Filter earned badges based on score
  const earnedBadges = allBadges.filter((badge) => userData.score >= badge.minScore);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 to-purple-200 dark:from-gray-900 dark:to-gray-800 py-12 px-4 sm:px-6 lg:px-8">
      {/* Profile Card */}
      <div className="max-w-2xl mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-xl overflow-hidden p-8">
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full border-4 border-indigo-500 shadow-lg object-cover"
              src={userData.image || '/pic.png'}
              alt="Profile"
            />
            <span className="absolute bottom-0 right-0 bg-indigo-600 p-2 rounded-full">
              <UserCircle2 className="text-white" size={20} />
            </span>
          </div>

          <h2 className="text-3xl font-bold text-gray-800 dark:text-white">{userData.username}</h2>

          <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-300">
            <Mail size={18} />
            <span>{userData.email}</span>
          </div>

          <div className="flex items-center space-x-2 text-yellow-500 text-lg font-medium">
            <Star />
            <span>{userData.score || 0} Points</span>
          </div>
        </div>
      </div>

      {/* 🏅 Badges Earned Section */}
      {earnedBadges.length > 0 && (
        <div className="mt-12 max-w-4xl mx-auto">
          {/* Title with Medal icon */}
          <div className="flex items-center justify-center gap-2 mb-6">
            <Medal className="w-6 h-6 text-indigo-600 dark:text-indigo-400" />
            <h3 className="text-2xl font-semibold text-gray-800 dark:text-white">Badges Earned</h3>
          </div>

          {/* Badge Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {earnedBadges.map((badge, idx) => (
              <div
                key={idx}
                className={`rounded-2xl shadow-xl p-6 text-center transform hover:scale-105 transition duration-300 ${badge.color}`}
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={badge.image}
                    alt={`${badge.name} badge`}
                    className="w-20 h-20 object-contain rounded-xl"
                  />
                </div>
                <h3 className="text-xl font-bold">{badge.name} Badge</h3>
                <p className="text-sm mt-1">Earned for {badge.minScore}+ points</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
