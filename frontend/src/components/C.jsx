import React from 'react';

const PdfViewer = () => {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen px-6 pt-4 pb-8 transition-colors duration-300">
      
      
      <div className="max-w-7xl mx-auto rounded-2xl overflow-hidden shadow-lg border border-gray-300 dark:border-gray-700">
      <iframe
        src="/c.pdf"
        className="w-full h-[85vh] bg-white dark:bg-gray-800 rounded-2xl"
        title="PDF Viewer"
      />

      </div>
    </div>
  );
};

export default PdfViewer;
