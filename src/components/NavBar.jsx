import React from 'react';
import { Calendar, TrendingUp, Target, BookOpen } from 'lucide-react';
import { VIEWS } from '../utils/constants';

const NavBar = ({ currentView, onViewChange }) => {
  const navButtons = [
    { view: VIEWS.JOURNAL, icon: BookOpen, label: 'Write' },
    { view: VIEWS.CALENDAR, icon: Calendar, label: 'Calendar' },
    { view: VIEWS.GOALS, icon: Target, label: 'Goals' },
    { view: VIEWS.INSIGHTS, icon: TrendingUp, label: 'Insights' }
  ];

  return (
    <div className="header-gradient shadow-lg">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="header-icon-bg p-2 rounded-lg">
              <BookOpen className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">Ocean</h1>
              <p className="text-cyan-100 text-sm">Your Journey to Calm</p>
            </div>
          </div>
          <div className="flex gap-2">
            {navButtons.map(({ view, icon: Icon, label }) => (
              <button
                key={view}
                onClick={() => onViewChange(view)}
                className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                  currentView === view
                    ? 'bg-white text-cyan-700 shadow-lg'
                    : 'bg-white bg-opacity-20 text-white hover:bg-opacity-30'
                }`}
              >
                <Icon className="w-4 h-4" />
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavBar;