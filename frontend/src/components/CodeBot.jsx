import React, { useState } from 'react';
import axios from 'axios';
import { Bot } from 'lucide-react';

const CodeBot = () => {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await axios.post('http://localhost:5000/api/codebot/generate-code', { prompt });
      setResponse(res.data.code);
    } catch (err) {
      setResponse('// Error generating code. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-6 py-12 transition-colors duration-300">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
        <div className="flex items-center mb-6 space-x-3">
          <div className="bg-indigo-100 dark:bg-indigo-900 p-3 rounded-full">
            <Bot className="text-indigo-600 dark:text-indigo-300" size={32} />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">CodeBot</h2>
        </div>

        <textarea
          rows="4"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Ask the bot to write some code..."
          className="w-full p-4 rounded-lg border border-gray-300 dark:border-gray-700 dark:bg-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4"
        />

        <button
          onClick={handleSubmit}
          disabled={loading || !prompt.trim()}
          className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-medium rounded-xl transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Generating...' : 'Generate Code'}
        </button>

        {response && (
          <pre className="bg-gray-100 dark:bg-gray-900 mt-6 p-4 rounded-lg overflow-auto text-sm text-gray-800 dark:text-gray-200 border border-gray-200 dark:border-gray-700">
            {response}
          </pre>
        )}
      </div>
    </div>
  );
};

export default CodeBot;
