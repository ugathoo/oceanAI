import { STORAGE_KEYS } from '../utils/constants';

class StorageService {
  async get(key) {
    try {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    } catch (error) {
      console.error(`Error getting ${key}:`, error);
      return null;
    }
  }

  async set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      console.error(`Error setting ${key}:`, error);
      return false;
    }
  }

  async getEntries() {
    return await this.get(STORAGE_KEYS.ENTRIES) || [];
  }

  async saveEntries(entries) {
    return await this.set(STORAGE_KEYS.ENTRIES, entries);
  }

  async getGoals() {
    return await this.get(STORAGE_KEYS.GOALS) || [];
  }

  async saveGoals(goals) {
    return await this.set(STORAGE_KEYS.GOALS, goals);
  }

  async getInsights() {
    return await this.get(STORAGE_KEYS.INSIGHTS);
  }

  async saveInsights(insights) {
    return await this.set(STORAGE_KEYS.INSIGHTS, insights);
  }
}

export default new StorageService();