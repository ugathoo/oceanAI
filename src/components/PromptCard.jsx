import React from 'react';
import { Sparkles } from 'lucide-react';

const PromptCard = ({ prompt="What's on your mind today?", onGenerateNew, isGenerating }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 border-l-4 border-cyan-500">
      <div className="flex items-start gap-3">
        <Sparkles className="w-5 h-5 text-cyan-600 mt-1 flex-shrink-0" />
        <div className="flex-1">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Today's Reflection Prompt
          </p>
          <p className="text-gray-800 italic">
            {prompt}
          </p>
          <button
            onClick={onGenerateNew}
            disabled={isGenerating}
            className="mt-3 text-sm text-cyan-600 hover:text-cyan-700 font-medium disabled:opacity-50"
          >
            {isGenerating ? 'Generating...' : '✨ Generate new prompt'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromptCard;