import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useUser } from '../context';
import { Calendar } from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend
} from 'recharts';
import { Trophy, CheckCircle, BarChart3, LogOut, BookOpen } from 'lucide-react';

const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [userRank, setUserRank] = useState(null);
  const [allProblems, setAllProblems] = useState([]);
  const [date, setDate] = useState(new Date());
  const [monthlyLogins, setMonthlyLogins] = useState([]);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else {
      axios.get(`${backendUrl}/api/users/${user}`)
        .then((res) => {
          const fetchedUser = res.data;
          setUserData(fetchedUser);

          axios.get(`${backendUrl}/api/problems`)
            .then((res) => {
              setAllProblems(Array.isArray(res.data) ? res.data : res.data.problems || []);
            })
            .catch((err) => {
              console.error('Error fetching problems:', err);
              setAllProblems([]);
            });

          axios.get(`${backendUrl}/api/users/leaderboard`)
            .then((res) => {
              const leaderboard = Array.isArray(res.data) ? res.data : [];
              const index = leaderboard.findIndex(
                (u) => u.username === fetchedUser.username
              );
              setUserRank(index !== -1 ? index + 1 : 'Not ranked');
            })
            .catch((err) => {
              console.error('Error fetching leaderboard:', err);
              setUserRank('Not ranked');
            });

          // Calculate monthly logins for the chart
          const loginDates = fetchedUser.loginDates || [];
          const monthLoginCount = Array(12).fill(0); // Store login count for each month (12 months)
          loginDates.forEach((date) => {
            const month = new Date(date).getMonth(); // Get month index (0-11)
            monthLoginCount[month] += 1;
          });
          setMonthlyLogins(monthLoginCount);
        })
        .catch((err) => {
          console.error('Error loading user data:', err);
          navigate('/login');
        });
    }
  }, [user, navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const today = new Date().toLocaleDateString();
  const recentSubmissions = allProblems.filter((problem) =>
    userData?.submissions?.includes(problem.questionNumber)
  );

  const solvedCount = userData?.submissions?.length || 0;
  const totalCount = allProblems.length || 0;
  const score = userData?.score || 0;

  // Generate color for each date based on login frequency
  const getTileColor = (date) => {
    const loginDates = userData?.loginDates || [];
    const dateStr = date.toLocaleDateString();
    const loginCount = loginDates.filter((d) => d === dateStr).length;

    if (loginCount === 0) return 'transparent'; // No login, no color
    if (loginCount === 1) return '#e6ffee'; // Light green for 1 login
    if (loginCount === 2) return '#e6ffee'; // Medium green for 2 logins
    if (loginCount === 3) return '#e6ffee'; // Dark green for 3 logins
    return '#e6ffee'; // Max color for 4+ logins
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 transition-colors duration-300">
      <style>
        {`
          .react-calendar__tile--hover {
            background: #6c63ff !important;
            color: white !important;
          }

          .react-calendar__tile--active {
            background: #6b21a8 !important;
            color: white !important;
          }

          .react-calendar__tile {
            border-radius: 12px;
            transition: transform 0.2s ease, background-color 0.3s ease;
          }

          .react-calendar__tile:hover {
            transform: scale(1.05);
            background-color: #e9d5ff;
            color: #4c1d95;
          }

          .react-calendar__tile--now {
            background-color:rgb(129, 239, 164) !important;
            color: white !important;
          }

          .react-calendar__month-view__days {
            display: flex;
            flex-wrap: wrap;
            gap: 4px;
          }

          .stylish-calendar .react-calendar__tile {
            transition: background-color 0.3s ease, transform 0.3s ease;
          }

          .react-calendar {
            border-radius: 10px;
            background: #333;
            color: white;
          }

          .react-calendar__month-view__days__day {
            transition: all 0.3s ease;
            color: #f0f0f0;
          }

          .react-calendar__month-view__days__day:hover {
            background-color: #6b21a8;
            color: white;
          }
          .stylish-calendar {
            width: 100% !important;
          }

        `}
      </style>

      <header className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 dark:text-white mb-1">
            Welcome, {userData?.username}
          </h2>
          <p className="text-gray-600 dark:text-gray-400">{userData?.email}</p>
        </div>
        <div className="text-gray-600 dark:text-gray-300">{today}</div>
      </header>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl p-6 flex items-center gap-4">
          <CheckCircle className="text-blue-600 dark:text-blue-300 w-8 h-8" />
          <div>
            <h3 className="text-lg font-bold text-blue-700 dark:text-blue-300">Solved Problems</h3>
            <p className="text-3xl font-semibold mt-1 text-gray-900 dark:text-white">{solvedCount}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl p-6 flex items-center gap-4">
          <BarChart3 className="text-green-600 dark:text-green-300 w-8 h-8" />
          <div>
            <h3 className="text-lg font-bold text-green-700 dark:text-green-300">Score</h3>
            <p className="text-3xl font-semibold mt-1 text-gray-900 dark:text-white">{score}</p>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-xl p-6 flex items-center gap-4">
          <Trophy className="text-yellow-600 dark:text-yellow-300 w-8 h-8" />
          <div>
            <h3 className="text-lg font-bold text-yellow-700 dark:text-yellow-300">Rank</h3>
            <p className="text-3xl font-semibold mt-1 text-gray-900 dark:text-white">
              {userRank !== null ? userRank : 'Loading...'}
            </p>
          </div>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Progress Overview</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart
              data={[{ name: 'Solved', value: solvedCount }, { name: 'Remaining', value: Math.max(totalCount - solvedCount, 0) }]}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Score Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={[{ name: 'Score', value: score }, { name: 'Remaining', value: Math.max(100 - score, 0) }]}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                <Cell fill="#00C49F" />
                <Cell fill="#FFBB28" />
              </Pie>
              <Tooltip />
              <Legend verticalAlign="bottom" height={36} />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Calendar and Monthly Login Chart */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow ">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Login Calendar</h3>
          <Calendar
            onChange={setDate}
            value={date}
            className="react-calendar stylish-calendar"
            tileClassName={({ date, view }) => {
              if (view === 'month') {
                return getTileColor(date); // Dynamically set tile color based on logins
              }
              return '';
            }}
          />
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">Monthly Logins</h3>
          <ResponsiveContainer width="100%" height={355}>
            <BarChart
              data={monthlyLogins.map((count, index) => ({
                month: new Date(0, index).toLocaleString('en-us', { month: 'short' }),
                logins: count
              }))}
              margin={{ top: 10, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="logins" fill="#8884d8" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Submissions */}
      <div className="mt-10 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-white flex items-center gap-2">
            <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
            Recent Submissions
          </h3>
          <button
            onClick={handleLogout}
            className="bg-gradient-to-r from-pink-600 to-red-500 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:scale-105 transition-transform"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
        {recentSubmissions.length === 0 ? (
          <p className="text-gray-600 dark:text-gray-400">No recent submissions yet.</p>
        ) : (
          <ul className="space-y-2 max-h-60 overflow-y-auto scrollbar-thin scrollbar-thumb-purple-400 dark:scrollbar-thumb-purple-500 scrollbar-track-purple-100 dark:scrollbar-track-gray-700">
            {recentSubmissions.map((problem) => (
              <li
                key={problem._id}
                className="p-3 bg-purple-100 dark:bg-gray-700 rounded-lg text-gray-800 dark:text-white shadow-sm hover:bg-purple-200 dark:hover:bg-gray-600 transition cursor-pointer"
                onClick={() => navigate(`/problems/${problem._id}`)}
              >
                {problem.title}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
