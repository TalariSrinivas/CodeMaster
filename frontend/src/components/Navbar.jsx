import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Home,
  Info,
  Phone,
  Hammer,
  Code,
  User,
  LogIn,
  LogOut,
  UserPlus,
  LayoutDashboard,
  ChevronRight,
  ListChecks,
  GraduationCap,
  Award,
} from 'lucide-react';
import { Trophy } from 'lucide-react';
import { useUser } from '../context';
import { PlusCircle } from 'lucide-react';
import { Bot } from 'lucide-react';
const Navbar = () => {
  const { user, logout } = useUser();
  const navigate = useNavigate();
  const isLoggedIn = !!localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    logout();
    navigate('/');
  };

  const buttonStyle =
    'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold px-4 py-2 rounded-lg shadow-md transition duration-300 flex items-center gap-2';

  return (
    <nav className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white px-6 py-3 shadow-md">
      <div className="flex items-center justify-between">
        {/* Left: Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2">
          
        <img src="/code.png" alt="Logo" className="w-10 h-10 rounded-full" />
          <span>CodeMaster</span>
        </Link>

        {/* Center: Main Navigation */}
        <div className="flex items-center gap-6 text-sm font-medium relative">
          <Link to="/" className="flex items-center gap-1 hover:underline">
            <Home className="w-5 h-5" /> Home
          </Link>
          
          

          {/* Learn Dropdown */}
          <div className="relative group">
            <div className="flex items-center gap-1 hover:underline cursor-pointer">
              <GraduationCap className="w-5 h-5" /> Learn
            </div>
            <div className="absolute left-0 top-full mt-2 bg-white text-gray-800 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-200 z-50 min-w-[180px]">
              <Link
                to="/problemList"
                className="block px-4 py-2 hover:bg-purple-100 flex items-center gap-2"
              >
                <ListChecks className="w-4 h-4 text-blue-600" />
                <span>Problem List</span>
              </Link>
              
              <Link
                to="/leaderboard"
                className="block px-4 py-2 hover:bg-purple-100 flex items-center gap-2"
              >
                <Award className="w-4 h-4 text-yellow-600" />
                <span>Leaderboard</span>
              </Link>
              <Link
                to="/c"
                className="block px-4 py-2 hover:bg-purple-100 flex items-center gap-2"
              >
                <img src="/c.png" alt="c" className="w-5 h-5" />

                <span>Learn C</span>
              </Link>
              <Link
                to="/cpp"
                className="block px-4 py-2 hover:bg-purple-100 flex items-center gap-2"
              >
                <img src="/c++.png" alt="Java" className="w-5 h-5" />
                <span>Learn C++</span>
              </Link>
              <Link
                to="/java"
                className="block px-4 py-2 hover:bg-purple-100 flex items-center gap-2"
              >
                <img src="/java.png" alt="Java" className="w-5 h-5" />
                <span>Learn Java</span>
              </Link>
              <Link
                to="/python"
                className="block px-4 py-2 hover:bg-purple-100 flex items-center gap-2"
              >
                <img src="/python.png" alt="Java" className="w-5 h-5" />
                <span>Learn Python</span>
              </Link>
              
            </div>
          </div>
           
          <Link to="/about" className="flex items-center gap-1 hover:underline">
            <Info className="w-5 h-5" /> About Us
          </Link>
          <Link to="/services" className="flex items-center gap-1 hover:underline">
            <Hammer className="w-5 h-5" /> Services
          </Link>
          <Link to="/contact" className="flex items-center gap-1 hover:underline">
            <Phone className="w-5 h-5" /> Contact
          </Link>
          <Link to="/codebot" className="flex items-center gap-1 hover:underline">
          <Bot className="w-5 h-5" /> ChatBot
          </Link>
        </div>

        
        {/* Right: Auth Controls */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <>
              <Link to="/dashboard" className="flex items-center gap-1 hover:underline">
                <LayoutDashboard className="w-5 h-5" /> Dashboard
              </Link>
              <Link to="/profile" className="flex items-center gap-1 hover:underline">
                <User className="w-5 h-5" /> Profile
              </Link>
              <button onClick={handleLogout} className={buttonStyle}>
                <LogOut className="w-5 h-5" /> Logout
                <ChevronRight className="w-4 h-4" />
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className={buttonStyle}>
                <LogIn className="w-5 h-5" /> Login
                <ChevronRight className="w-4 h-4" />
              </Link>
              <Link to="/signup" className={buttonStyle}>
                <UserPlus className="w-5 h-5" /> Signup
                <ChevronRight className="w-4 h-4" />
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
