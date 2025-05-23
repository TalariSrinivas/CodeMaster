import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Trophy, UserCircle } from 'lucide-react'; // Trophy for leaderboard visual

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const Leaderboard = () => {
  const [leaders, setLeaders] = useState([]);

  useEffect(() => {
    axios.get(`${backendUrl}/api/users/leaderboard`)
      .then(res => {
        setLeaders(Array.isArray(res.data) ? res.data : []);
      })
      .catch(err => {
        console.error("Error fetching leaderboard:", err);
        setLeaders([]);
      });
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 text-transparent bg-clip-text mb-6 flex items-center justify-center gap-2">
          <Trophy className="w-8 h-8 text-yellow-500" />
          Leaderboard
        </h2>

        {leaders.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">No users found.</div>
        ) : (
          <ul className="space-y-3 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 dark:scrollbar-thumb-purple-500 scrollbar-track-purple-100 dark:scrollbar-track-gray-700">
            {leaders.map((user, index) => (
              <li
                key={user._id}
                className="p-4 bg-purple-500 dark:bg-gray-700 rounded-lg text-white shadow-sm flex justify-between items-center"
              >
                <div className="flex items-center gap-3">
                  <UserCircle className="w-6 h-6 text-white" />
                  <span className="text-lg font-medium">{index + 1} {user.username}</span>
                </div>
                <span className="font-bold">{user.score} pts</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
