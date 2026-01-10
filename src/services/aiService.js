const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

class AIService {
  async generatePrompt(recentEntries, goals) {
    try {
      const response = await fetch(`${API_URL}/api/generate-prompt`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recentEntries: recentEntries.slice(-3),
          goals
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate prompt');
      }

      const data = await response.json();
      return data.prompt || "What brought you joy today, even in small moments?";
    } catch (error) {
      console.error('Error generating prompt:', error);
      return "What's one thing you'd like to process from today?";
    }
  }

  async analyzeEntries(entries) {
    try {
      const response = await fetch(`${API_URL}/api/analyze-entries`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ entries })
      });

      if (!response.ok) {
        throw new Error('Failed to analyze entries');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error analyzing entries:', error);
      throw error;
    }
  }
}

export default new AIService();
