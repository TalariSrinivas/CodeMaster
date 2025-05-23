// src/pages/Preview.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const Preview = () => {
  const { contestId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/contest-question/get-questions/${contestId}`);
        const data = await response.json();

        if (!response.ok) throw new Error(data.message || 'Failed to fetch questions');
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [contestId]);

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-6 py-10">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
            Questions for Contest: {contestId}
          </h1>
          <button
            onClick={() => navigate('/')}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
          >
            Close
          </button>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Loading questions...</p>
        ) : questions.length === 0 ? (
          <p className="text-center text-red-500">No questions found.</p>
        ) : (
          <ul className="space-y-6">
            {questions.map((q, idx) => (
              <li key={q._id} className="border rounded-lg p-4 dark:border-gray-600">
                <h2 className="font-semibold text-xl text-gray-800 dark:text-gray-100">Question {idx + 1}</h2>
                <p className="mt-2 text-gray-700 dark:text-gray-300"><strong>Question:</strong> {q.question}</p>
                <p className="mt-1 text-gray-700 dark:text-gray-300"><strong>Input:</strong> {q.input}</p>
                <p className="mt-1 text-gray-700 dark:text-gray-300"><strong>Output:</strong> {q.output}</p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Preview;
