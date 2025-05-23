import React from 'react';
import Editor from '@monaco-editor/react';

const CodeEditor = ({ code, setCode, language }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 p-4">
      <div className="max-w-6xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl overflow-hidden h-[80vh] flex flex-col">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-transparent bg-clip-text text-2xl font-bold p-4">
          Code Editor ({language})
        </div>

        <div className="flex-grow border-t border-gray-300 dark:border-gray-700">
          <Editor
            height="100%"
            language={language}
            theme="vs-dark"
            value={code}
            onChange={(newValue) => setCode(newValue)}
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default CodeEditor;
