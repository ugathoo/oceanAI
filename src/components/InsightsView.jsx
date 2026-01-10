import React from 'react';
import { BarChart3, Brain, Heart, Sparkles, TrendingUp, Smile, Frown, Meh } from 'lucide-react';
import { VIEWS } from '../utils/constants';

const InsightsView = ({ insights, onRefresh, isAnalyzing, onChangeView }) => {
  const getSentimentIcon = () => {
    if (!insights) return null;
    if (insights.overallSentiment === 'positive') {
      return <Smile className="w-8 h-8 text-cyan-500" />;
    }
    if (insights.overallSentiment === 'negative') {
      return <Frown className="w-8 h-8 text-red-500" />;
    }
    return <Meh className="w-8 h-8 text-yellow-500" />;
  };

  const getSentimentBarClass = () => {
    if (!insights) return 'sentiment-bar-neutral';
    if (insights.sentimentScore > 0) return 'sentiment-bar-positive';
    if (insights.sentimentScore < 0) return 'sentiment-bar-negative';
    return 'sentiment-bar-neutral';
  };

  const getSentimentWidth = () => {
    if (!insights) return 50;
    return ((insights.sentimentScore + 1) / 2) * 100;
  };

  if (!insights) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-12 text-center">
          <Brain className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">No Insights Yet</h2>
          <p className="text-gray-600 mb-6">
            Write at least 3 journal entries to unlock AI-powered insights about your emotional patterns and themes!
          </p>
          <button
            onClick={() => onChangeView(VIEWS.JOURNAL)}
            className="btn-ocean-gradient px-6 py-3 text-white rounded-lg transition-all shadow-md"
          >
            Keep Writing
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="space-y-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-bold mb-6 text-gray-800 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-cyan-600" />
            Your Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="card-cyan-blue-gradient p-6 rounded-lg border border-cyan-200">
              <div className="flex items-center gap-3 mb-3">
                {getSentimentIcon()}
                <div>
                  <p className="text-sm text-gray-600">Overall Sentiment</p>
                  <p className="text-xl font-bold text-gray-800 capitalize">
                    {insights.overallSentiment}
                  </p>
                </div>
              </div>
              <div className="sentiment-bar-container">
                <div
                  className={`sentiment-bar ${getSentimentBarClass()}`}
                  style={{ width: `${getSentimentWidth()}%` }}
                ></div>
              </div>
            </div>

            <div className="card-teal-cyan-gradient p-6 rounded-lg border border-teal-200">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="w-8 h-8 text-teal-600" />
                <div>
                  <p className="text-sm text-gray-600">Emotional Trend</p>
                  <p className="text-xl font-bold text-gray-800 capitalize">
                    {insights.emotionalTrend}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                Based on {insights.entryCount} entries
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="p-4 bg-cyan-50 rounded-lg border-l-4 border-cyan-500">
              <h3 className="font-semibold text-gray-800 mb-2">Recurring Themes</h3>
              <div className="flex flex-wrap gap-2">
                {insights.themes.map((theme, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-cyan-100 text-cyan-800 rounded-full text-sm"
                  >
                    {theme}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-gray-800 mb-2">Patterns Noticed</h3>
              <ul className="space-y-1">
                {insights.patterns.map((pattern, idx) => (
                  <li key={idx} className="text-gray-700 text-sm">
                    • {pattern}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-4 bg-teal-50 rounded-lg border-l-4 border-teal-500">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Heart className="w-4 h-4" />
                Encouragement
              </h3>
              <p className="text-gray-700">{insights.encouragement}</p>
            </div>

            <div className="p-4 bg-sky-50 rounded-lg border-l-4 border-sky-500">
              <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <Sparkles className="w-4 h-4" />
                Suggestion
              </h3>
              <p className="text-gray-700">{insights.suggestion}</p>
            </div>
          </div>

          <button
            onClick={onRefresh}
            disabled={isAnalyzing}
            className="btn-ocean-gradient mt-6 w-full px-4 py-3 text-white rounded-lg disabled:opacity-50 transition-all shadow-md"
          >
            {isAnalyzing ? 'Updating Insights...' : 'Refresh Insights'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default InsightsView;
