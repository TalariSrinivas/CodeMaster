import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { CheckCircle } from 'lucide-react'; // ✅ Imported icon

const backendUrl = import.meta.env.VITE_BACKEND_URL;

import { useUser } from '../context';

const ProblemList = () => {
  const [problems, setProblems] = useState([]);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const { user } = useUser();

  useEffect(() => {
    axios.get(`${backendUrl}/api/problems`)
      .then(res => {
        setProblems(Array.isArray(res.data) ? res.data : res.data.problems || []);
      })
      .catch(err => {
        console.error("Error fetching problems:", err);
        setProblems([]);
      });

    if (user) {
      axios.get(`${backendUrl}/api/users/${user}`)
        .then(res => {
          setUserData(res.data);
        })
        .catch(err => {
          console.error("Error fetching user data:", err);
        });
    }
  }, [user]);

  const isSolved = (questionNumber) => {
    return userData?.submissions?.includes(questionNumber);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-4">
      

      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-6">
          Problem List
        </h2>

        {problems.length === 0 ? (
          <div className="text-center text-gray-500 dark:text-gray-400">No problems available.</div>
        ) : (
          <ul className="space-y-4 max-h-[500px] overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 dark:scrollbar-thumb-purple-500 scrollbar-track-purple-100 dark:scrollbar-track-gray-700">
            {problems.map((problem) => (
              <li
                key={problem._id}
                onClick={() => navigate(`/problems/${problem._id}`)}
                className="p-4 bg-purple-500 dark:bg-gray-700 rounded-lg hover:bg-purple-600 dark:hover:bg-gray-600 transition duration-200 cursor-pointer shadow-sm hover:shadow-md flex justify-between items-center"
              >
                <h3 className="text-lg font-semibold text-white">
                  {problem.questionNumber}. {problem.title}
                </h3>
                {isSolved(problem.questionNumber) && (
                  <CheckCircle className="text-green-400 w-6 h-6" />
                )}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default ProblemList;
