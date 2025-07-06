import React from 'react';

interface NotebookViewerProps {
  notebookPath: string;
}

// Placeholder: In a real implementation, you would use a package like 'react-notebook' or similar
// to render the notebook. For now, just show a message and a download link.
const NotebookViewer: React.FC<NotebookViewerProps> = ({ notebookPath }) => {
  return (
    <div className="bg-gray-900 rounded-lg p-6 border border-gray-700">
      <p className="mb-4 text-gray-300">
        (Notebook rendering coming soon!)
      </p>
      <a
        href={notebookPath}
        download
        className="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-500 transition"
      >
        Download Notebook
      </a>
    </div>
  );
};

export default NotebookViewer; 