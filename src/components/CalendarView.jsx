import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { getDaysInMonth, isSameDay, calculateStreak } from '../utils/dateUtils';
import { WEEK_DAYS } from '../utils/constants';

const CalendarView = ({ entries }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const changeMonth = (increment) => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + increment);
    setSelectedDate(newDate);
  };

  const hasEntryOnDate = (date) => {
    return entries.some(entry => isSameDay(entry.date, date));
  };

  const renderCalendar = () => {
    const { daysInMonth, startingDayOfWeek } = getDaysInMonth(selectedDate);
    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(<div key={`empty-${i}`} className="aspect-square"></div>);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(selectedDate.getFullYear(), selectedDate.getMonth(), day);
      const hasEntry = hasEntryOnDate(date);
      const isToday = isSameDay(new Date(), date);

      days.push(
        <div
          key={day}
          className={`aspect-square flex items-center justify-center rounded-lg text-sm font-medium transition-all ${
            hasEntry
              ? 'bg-cyan-500 text-white shadow-lg'
              : 'bg-gray-100 text-gray-400'
          } ${isToday ? 'ring-2 ring-blue-500' : ''}`}
        >
          {day}
        </div>
      );
    }

    return days;
  };

  const streak = calculateStreak(entries);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
          <Calendar className="w-6 h-6 text-cyan-600" />
          Journal Calendar
        </h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between mb-4">
            <button
              onClick={() => changeMonth(-1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              ←
            </button>
            <h3 className="text-lg font-semibold">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </h3>
            <button
              onClick={() => changeMonth(1)}
              className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              →
            </button>
          </div>
          
          <div className="grid grid-cols-7 gap-2 mb-2">
            {WEEK_DAYS.map(day => (
              <div key={day} className="text-center text-xs font-semibold text-gray-600">
                {day}
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7 gap-2">
            {renderCalendar()}
          </div>
          
          <div className="mt-4 p-4 bg-cyan-50 rounded-lg">
            <p className="text-sm text-center">
              <span role="img" aria-label="wave">🌊</span> Current Streak:{' '}
              <span className="font-bold text-cyan-600">{streak} days</span>
            </p>
          </div>
        </div>
        
        <div className="mt-6 p-4 bg-cyan-50 rounded-lg border border-cyan-200">
          <p className="text-sm text-gray-700">
            <strong>Total Entries:</strong> {entries.length}
          </p>
          <p className="text-sm text-gray-700 mt-2">
            Cyan days show when you journaled. Keep your calm flowing!
          </p>
        </div>
      </div>
    </div>
  );
};

export default CalendarView;