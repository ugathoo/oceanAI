import { useState, useEffect } from 'react';
import storageService from '../services/storageService';
import aiService from '../services/aiService';
import { formatDisplayDate } from '../utils/dateUtils';

export const useJournalData = () => {
  const [entries, setEntries] = useState([]);
  const [goals, setGoals] = useState([]);
  const [insights, setInsights] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const [loadedEntries, loadedGoals, loadedInsights] = await Promise.all([
        storageService.getEntries(),
        storageService.getGoals(),
        storageService.getInsights()
      ]);

      setEntries(loadedEntries);
      setGoals(loadedGoals);
      setInsights(loadedInsights);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveEntry = async (text, prompt = '') => {
    if (!text.trim()) return false;
  
    const newEntry = {
      id: Date.now(),
      text,
      prompt,
      date: new Date().toISOString(),
      displayDate: formatDisplayDate(new Date())
    };
  
    const updatedEntries = [...entries, newEntry];
    setEntries(updatedEntries);
    await storageService.saveEntries(updatedEntries);
    return true;
  };

  const addGoal = async (text) => {
    if (!text.trim()) return false;

    const goal = {
      id: Date.now(),
      text,
      createdDate: new Date().toISOString(),
      completed: false
    };

    const updatedGoals = [...goals, goal];
    setGoals(updatedGoals);
    await storageService.saveGoals(updatedGoals);
    return true;
  };

  const toggleGoal = async (id) => {
    const updatedGoals = goals.map(g => 
      g.id === id ? { ...g, completed: !g.completed } : g
    );
    setGoals(updatedGoals);
    await storageService.saveGoals(updatedGoals);
  };

  const deleteGoal = async (id) => {
    const updatedGoals = goals.filter(g => g.id !== id);
    setGoals(updatedGoals);
    await storageService.saveGoals(updatedGoals);
  };

  const generatePrompt = async () => {
    setIsAnalyzing(true);
    try {
      const prompt = await aiService.generatePrompt(entries, goals);
      return prompt;
    } finally {
      setIsAnalyzing(false);
    }
  };

  const analyzeEntries = async () => {
    setIsAnalyzing(true);
    try {
      const newInsights = await aiService.analyzeEntries(entries);
      setInsights(newInsights);
      await storageService.saveInsights(newInsights);
      return newInsights;
    } catch (error) {
      throw error;
    } finally {
      setIsAnalyzing(false);
    }
  };

  return {
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
  };
};