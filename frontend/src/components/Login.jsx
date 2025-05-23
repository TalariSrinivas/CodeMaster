import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;
import { useUser } from '../context';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [errorMsg, setErrorMsg] = useState('');

    const { user,login } = useUser();

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMsg('');

    try {
      const res = await axios.post(`${backendUrl}/api/auth/login`, formData);
      localStorage.setItem('token', res.data.token);
      login(formData.email)
      navigate('/');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-6">
          Login
        </h2>

        {errorMsg && (
          <div className="bg-red-100 dark:bg-red-800 text-red-700 dark:text-red-200 p-2 rounded mb-4 text-sm">
            {errorMsg}
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="email" className="block font-medium text-sm text-gray-700 dark:text-gray-200 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block font-medium text-sm text-gray-700 dark:text-gray-200 mb-1">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded outline-none focus:ring-2 focus:ring-purple-400 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 text-white py-2 rounded-xl transition shadow-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
