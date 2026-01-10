import React, { useState, useEffect } from 'react';
import NavBar from './components/NavBar';
import PromptCard from './components/PromptCard';
import JournalBook from './components/JournalBook';
import CalendarView from './components/CalendarView';
import GoalsView from './components/GoalsView';
import InsightsView from './components/InsightsView';
import { useJournalData } from './hooks/useJournalData';
import { VIEWS, MIN_ENTRIES_FOR_INSIGHTS } from './utils/constants';
import { formatDisplayDate } from './utils/dateUtils';

function App() {
  const [currentView, setCurrentView] = useState(VIEWS.JOURNAL);
  const [currentEntry, setCurrentEntry] = useState('');
  const [aiPrompt, setAiPrompt] = useState('');
  const [showPromptSuggestions, setShowPromptSuggestions] = useState(true);

  const {
    entries,
    goals,
    insights,
    isLoading,
    isAnalyzing,
    saveEntry,
    addGoal,
    toggleGoal,
    deleteGoal,
    generatePrompt,
    analyzeEntries
  } = useJournalData();

  useEffect(() => {
    if (showPromptSuggestions && entries.length > 0) {
      handleGeneratePrompt();
    }
  }, [entries.length]);

  const handleGeneratePrompt = async () => {
    const prompt = await generatePrompt();
    setAiPrompt(prompt);
  };

  const handleSaveEntry = async () => {
    const success = await saveEntry(currentEntry, aiPrompt);
    if (success) {
      setCurrentEntry('');
      setShowPromptSuggestions(true);
    }
  };

  const handleAnalyze = async () => {
    if (entries.length < MIN_ENTRIES_FOR_INSIGHTS) {
      alert(`Write at least ${MIN_ENTRIES_FOR_INSIGHTS} entries to see insights!`);
      return;
    }

    try {
      await analyzeEntries();
      setCurrentView(VIEWS.INSIGHTS);
    } catch (error) {
      alert('Could not analyze entries. Please try again.');
    }
  };

  if (isLoading) {
    return (
      <div className="page-ocean-gradient min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading Ocean...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="page-ocean-gradient min-h-screen">
      <NavBar currentView={currentView} onViewChange={setCurrentView} />

      <div className="max-w-6xl mx-auto px-4 py-8">
        {currentView === VIEWS.JOURNAL && (
          <div className="space-y-6">
            {showPromptSuggestions && (
              <PromptCard
                prompt={aiPrompt}
                onGenerateNew={handleGeneratePrompt}
                isGenerating={isAnalyzing}
              />
            )}

            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">
                {formatDisplayDate(new Date())}
              </h2>
              <textarea
                value={currentEntry}
                onChange={(e) => setCurrentEntry(e.target.value)}
                placeholder="Let your thoughts flow like water..."
                className="w-full h-64 p-4 border border-cyan-200 rounded-lg focus:ring-2 focus:ring-cyan-500 focus:border-transparent resize-none"
              />
              <div className="flex justify-between items-center mt-4">
                <p className="text-sm text-gray-500">{currentEntry.length} characters</p>
                <button
                  onClick={handleSaveEntry}
                  disabled={!currentEntry.trim()}
                  className="btn-ocean-gradient px-6 py-2 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-md"
                >
                  Save Entry
                </button>
              </div>
            </div>

            <JournalBook entries={entries} />
          </div>
        )}

        {currentView === VIEWS.CALENDAR && <CalendarView entries={entries} />}

        {currentView === VIEWS.GOALS && (
          <GoalsView
            goals={goals}
            onAdd={addGoal}
            onToggle={toggleGoal}
            onDelete={deleteGoal}
          />
        )}

        {currentView === VIEWS.INSIGHTS && (
          <InsightsView
            insights={insights}
            onRefresh={handleAnalyze}
            isAnalyzing={isAnalyzing}
            onChangeView={setCurrentView}
          />
        )}
      </div>
    </div>
  );
}

export default App;
