import React, { useEffect, useState } from 'react';
import axios from 'axios';

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const ProblemDetails = ({ problemId }) => {
  const [problem, setProblem] = useState(null);

  useEffect(() => {
    if (!problemId) return;

    axios.get(`${backendUrl}/api/problems/${problemId}`)
      .then(res => setProblem(res.data))
      .catch(err => {
        console.error("Error fetching problem details:", err);
        setProblem(null);
      });
  }, [problemId]);

  if (!problem) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 text-gray-600 dark:text-gray-300">
        Loading problem details...
      </div>
    );
  }

  return (
    <div className="min-h-screen py-10 px-4 bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl text-gray-800 dark:text-gray-200">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text mb-6">
          {problem.title}
        </h1>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Description:</h2>
          <p className="whitespace-pre-line leading-relaxed text-gray-700 dark:text-gray-300">
            {problem.description}
          </p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Input Format:</h2>
          <p className="text-gray-700 dark:text-gray-300">{problem.inputFormat}</p>
        </section>

        <section className="mb-6">
          <h2 className="text-xl font-semibold mb-1">Output Format:</h2>
          <p className="text-gray-700 dark:text-gray-300">{problem.outputFormat}</p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-2">Sample Test Cases:</h2>
          {problem.sampleCases && problem.sampleCases.length > 0 ? (
            <ul className="space-y-4">
              {problem.sampleCases.map((testCase, index) => (
                <li key={index} className="bg-indigo-100 dark:bg-gray-700 p-4 rounded-xl shadow-sm">
                  <p><strong className="text-indigo-700 dark:text-purple-300">Input:</strong> {testCase.input}</p>
                  <p><strong className="text-indigo-700 dark:text-purple-300">Output:</strong> {testCase.output}</p>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No sample test cases available.</p>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProblemDetails;
