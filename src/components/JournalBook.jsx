import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const JournalBook = ({ entries }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const reversedEntries = [...entries].reverse();
  const currentEntry = reversedEntries[currentPage];

  const nextPage = () => {
    if (currentPage < reversedEntries.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (entries.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <p className="text-gray-500 text-sm italic py-12">
          Your journal is waiting for its first entry...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="bg-white rounded-lg shadow-md p-6 relative">
        <div className="journal-book-binding"></div>
        
        <h3 className="text-lg font-semibold mb-4 text-gray-800 text-center border-b-2 border-cyan-200 pb-2">
          <span role="img" aria-label="book">📖</span> Journal Entries
        </h3>
        
        <div className="relative">
          <div className="journal-page rounded-lg p-6 shadow-inner border-2 border-cyan-100 min-h-[300px]">
            <p className="text-xs text-cyan-600 mb-2 font-medium">
              {currentEntry?.displayDate}
            </p>
            
            {currentEntry?.prompt && (
              <div className="mb-4 pb-3 border-b border-cyan-200">
                <p className="text-xs text-gray-500 mb-1 italic">Prompt:</p>
                <p className="text-sm text-cyan-700 italic">"{currentEntry.prompt}"</p>
              </div>
            )}
            
            <p className="journal-text text-gray-700">
              {currentEntry?.text}
            </p>
          </div>
          
          <div className="flex items-center justify-between mt-4">
            <button
              onClick={nextPage}
              disabled={currentPage >= reversedEntries.length - 1}
              className="flex items-center gap-1 px-3 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              <ChevronLeft className="w-4 h-4" />
              Older
            </button>
            
            <span className="text-sm text-gray-600">
              Page {currentPage + 1} of {reversedEntries.length}
            </span>
            
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className="flex items-center gap-1 px-3 py-2 bg-cyan-100 text-cyan-700 rounded-lg hover:bg-cyan-200 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
            >
              Newer
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JournalBook;
