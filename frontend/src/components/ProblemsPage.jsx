import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import ProblemDetails from './ProblemDetails';
import CodeEditor from './CodeEditor';
import { useUser } from '../context';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProblemsPage = () => {
  const { id } = useParams();
  const [code, setCode] = useState("// Write your code here");
  const [language, setLanguage] = useState("cpp");
  const [results, setResults] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async () => {
    try {
      const res = await axios.post(`${backendUrl}/api/submit`, {
        code,
        language,
        problemId: id,
        email: user,
      });
      setResults(res.data.results);
      setShowModal(true);
    } catch (err) {
      console.error("Submission error:", err);
      alert("Submission failed");
    }
  };

  const handleNext = () => {
    // Logic to move to the next problem or page.
    navigate('/problemList');
  };

  return (
    <>
      

      <div className="flex min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-800 dark:text-gray-100">
        {/* Problem Details */}
        <div className="w-1/2 p-6 overflow-auto border-r border-gray-300 dark:border-gray-700">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6">
            <ProblemDetails problemId={id} />
          </div>
        </div>

        {/* Code Editor + Submit */}
        <div className="w-1/2 p-6 flex flex-col space-y-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-4">
            <label className="block mb-2 text-sm font-medium text-gray-700 dark:text-gray-200">
              Select Language
            </label>
            <select
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="w-full p-2 rounded border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 dark:text-white"
            >
              <option value="cpp">C++</option>
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="javascript">JavaScript</option>
            </select>
          </div>

          <div className="flex-grow">
            <CodeEditor code={code} setCode={setCode} language={language} />
          </div>

          <button
            onClick={handleSubmit}
            className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 hover:brightness-110 text-white py-2 px-6 rounded-xl transition shadow-md self-start hover:scale-105"
          >
            Submit
          </button>
        </div>
      </div>

      {/* POPUP Modal for Results */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-8 w-full max-w-2xl transform scale-100 animate-fade-in-up">
            {results && results.every(r => r.status === "Passed") ? (
              <div className="text-center mb-6">
                <h2 className="text-3xl font-bold text-gradient bg-clip-text text-transparent bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 mb-2">
                  Congratulations!
                </h2>
                <p className="text-lg text-gray-700 dark:text-gray-300">All test cases passed!</p>
              </div>
            ) : (
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 mb-2">Some test cases failed.</h2>
                <p className="text-gray-700 dark:text-gray-300">Review the outputs below:</p>
              </div>
            )}

            <ul className="space-y-4 max-h-64 overflow-y-auto">
              {results && results.map((res, idx) => (
                <li
                  key={idx}
                  className={`p-4 rounded-xl text-sm ${res.status === "Passed"
                    ? "bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white"
                    : "bg-red-100 dark:bg-red-800"
                  }`}
                >
                  <p><strong>Input:</strong> {res.input}</p>
                  <p><strong>Expected:</strong> {res.expectedOutput}</p>
                  <p><strong>Output:</strong> {res.actualOutput}</p>
                  <p><strong>Status:</strong> {res.status}</p>
                </li>
              ))}
            </ul>

            <div className="text-right mt-6 space-x-4">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl transition"
              >
                Close
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white rounded-xl transition"
              >
                Next
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* CSS styles for animations (included here directly) */}
      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.4s ease-out;
        }

        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Confetti Animation */
        @keyframes confetti {
          0% { transform: translateY(-100px); opacity: 1; }
          100% { transform: translateY(100vh); opacity: 0; }
        }

        .confetti {
          position: absolute;
          top: 0;
          width: 10px;
          height: 10px;
          background-color: #ff0;
          animation: confetti 5s infinite;
        }
      `}</style>
    </>
  );
};

export default ProblemsPage;
