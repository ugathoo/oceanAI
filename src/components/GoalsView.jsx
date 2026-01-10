import React, { useState } from 'react';
import { Target } from 'lucide-react';

const GoalsView = ({ goals, onAdd, onToggle, onDelete }) => {
  const [newGoal, setNewGoal] = useState('');

  const handleAdd = () => {
    if (onAdd(newGoal)) {
      setNewGoal('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleAdd();
    }
  };

  const completedCount = goals.filter(g => g.completed).length;

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Target className="w-6 h-6 text-cyan-600" />
          My Goals
        </h2>
        
        <div className="mb-6">
          <div className="flex gap-2">
            <input
              type="text"
              value={newGoal}
              onChange={(e) => setNewGoal(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="What would you like to achieve?"
              className="flex-1 px-4 py-2 border border-cyan-300 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
            />
            <button
              onClick={handleAdd}
              disabled={!newGoal.trim()}
              className="px-6 py-2 bg-gradient-to-r from-cyan-600 to-blue-600 text-white rounded-lg hover:from-cyan-700 hover:to-blue-700 disabled:opacity-50 transition-all shadow-md"
            >
              Add Goal
            </button>
          </div>
        </div>

        <div className="space-y-3">
          {goals.length === 0 ? (
            <p className="text-gray-500 text-center py-8">
              No goals set yet. Start your journey!
            </p>
          ) : (
            goals.map(goal => (
              <div
                key={goal.id}
                className={`p-4 rounded-lg border-2 transition-all ${
                  goal.completed
                    ? 'bg-cyan-50 border-cyan-300'
                    : 'bg-white border-gray-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={goal.completed}
                    onChange={() => onToggle(goal.id)}
                    className="mt-1 w-5 h-5 text-cyan-600 rounded focus:ring-cyan-500"
                  />
                  <div className="flex-1">
                    <p className={`text-gray-800 ${goal.completed ? 'line-through' : ''}`}>
                      {goal.text}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      Added {new Date(goal.createdDate).toLocaleDateString()}
                    </p>
                  </div>
                  <button
                    onClick={() => onDelete(goal.id)}
                    className="text-red-500 hover:text-red-700 text-sm"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {goals.length > 0 && (
          <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
            <p className="text-sm text-gray-700">
              <strong>Progress:</strong> {completedCount} of {goals.length} goals completed
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoalsView;