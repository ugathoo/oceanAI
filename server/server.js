import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const OLLAMA_URL = process.env.OLLAMA_URL || 'http://127.0.0.1:11434';
const MODEL = process.env.MODEL || 'llama3.2';

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Ocean Backend is running',
    model: MODEL,
    ollamaUrl: OLLAMA_URL
  });
});

// Generate AI prompt endpoint
app.post('/api/generate-prompt', async (req, res) => {
  try {
    const { recentEntries, goals } = req.body;

    const entriesText = recentEntries.map(e => e.text).join('\n\n');
    const goalsText = goals.map(g => g.text).join(', ');

    const prompt = `You are an empathetic journaling companion with a background in therapy and mental health. Based on the user's recent journal entries and goals, generate ONE thoughtful, context-aware prompt to help them reflect on the day or week. Make it feel like a caring friend checking in.

Recent entries:
${entriesText}

User's goals: ${goalsText || 'None set yet'}

Respond with ONLY the prompt question, nothing else. Keep it warm, personal, and specific to their situation. The question should be short and easy to understand. Avoid complex jargon or terminology.`;

    const response = await axios.post(
      `${OLLAMA_URL}/api/generate`,
      {
        model: MODEL,
        prompt: prompt,
        stream: false
      }
    );

    const generatedPrompt = response.data.response.trim() || "What brought you joy today, even in small moments?";
    res.json({ prompt: generatedPrompt });

  } catch (error) {
    console.error('Error generating prompt:', error.message);
    
    // Fallback prompts if Ollama is not available
    const fallbackPrompts = [
      "What brought you peace today?",
      "How did you practice self-care this week?",
      "What are you grateful for right now?",
      "What challenge helped you grow today?",
      "How are you feeling about your progress?"
    ];
    
    res.json({ 
      prompt: fallbackPrompts[Math.floor(Math.random() * fallbackPrompts.length)],
      fallback: true,
      error: 'Ollama not available - using fallback prompt'
    });
  }
});

// Analyze entries endpoint
app.post('/api/analyze-entries', async (req, res) => {
  try {
    const { entries } = req.body;

    if (!entries || entries.length < 3) {
      return res.status(400).json({ 
        error: 'Insufficient entries',
        message: 'At least 3 entries are required for analysis'
      });
    }

    const allEntries = entries.map(e => `${e.date}: ${e.text}`).join('\n\n');

    const prompt = `Analyze these journal entries and provide insights in JSON format.

Entries:
${allEntries}

Respond with ONLY a valid JSON object (no markdown, no explanation) with this EXACT structure (ignore the content inside the quotes, that is only for example purposes):
{
  "overallSentiment": "positive",
  "sentimentScore": 0.7,
  "themes": ["theme1", "theme2", "theme3"],
  "patterns": ["pattern1", "pattern2"],
  "emotionalTrend": "improving",
  "encouragement": "one sentence",
  "suggestion": "one sentence"
}

IMPORTANT: Use only double quotes, no trailing commas, ensure all strings are properly escaped.`;

    console.log('Attempting to connect to Ollama at:', OLLAMA_URL);
    console.log('Using model:', MODEL);

    const response = await axios.post(
      `${OLLAMA_URL}/api/generate`,
      {
        model: MODEL,
        prompt: prompt,
        stream: false
      },
      { timeout: 60000 }
    );

    let text = response.data.response.trim();
    console.log('Raw AI response:', text);
    
    text = text.replace(/```json/g, '').replace(/```/g, '');
    text = text.trim();
    
    const firstBrace = text.indexOf('{');
    const lastBrace = text.lastIndexOf('}');
    
    if (firstBrace !== -1 && lastBrace !== -1) {
      text = text.substring(firstBrace, lastBrace + 1);
    }

    let analysisData;
    try {
      analysisData = JSON.parse(text);
    } catch (parseError) {
      console.error('JSON parse error:', parseError.message);
      console.error('Failed to parse:', text);
      throw new Error('AI returned invalid JSON');
    }

    const insights = {
      overallSentiment: analysisData.overallSentiment || 'neutral',
      sentimentScore: analysisData.sentimentScore || 0.5,
      themes: analysisData.themes || ['Reflection', 'Personal Growth'],
      patterns: analysisData.patterns || ['Regular journaling'],
      emotionalTrend: analysisData.emotionalTrend || 'stable',
      encouragement: analysisData.encouragement || 'Great job on your journaling journey!',
      suggestion: analysisData.suggestion || 'Keep up the consistent practice.',
      lastUpdated: new Date().toISOString(),
      entryCount: entries.length
    };

    res.json(insights);

  } catch (error) {
    console.error('Error analyzing entries:', error.message);
    
    const { entries } = req.body;
    
    // Fallback analysis if Ollama fails or returns bad JSON
    res.json({
      overallSentiment: 'positive',
      sentimentScore: 0.6,
      themes: ['Personal Growth', 'Mindfulness', 'Wellness'],
      patterns: ['Regular journaling habit', 'Focus on gratitude'],
      emotionalTrend: 'improving',
      encouragement: 'You are doing great! Keep up the wonderful journaling habit.',
      suggestion: 'Try journaling at a consistent time each day for even better results.',
      lastUpdated: new Date().toISOString(),
      entryCount: entries ? entries.length : 0,
      fallback: true,
      error: 'Ollama returned invalid JSON - using fallback analysis'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🌊 Ocean Backend running on http://localhost:${PORT}`);
  console.log(`Using AI Model: ${MODEL}`);
  console.log(`Ollama URL: ${OLLAMA_URL}`);
  console.log(`Health check: http://localhost:${PORT}/health`);
});
