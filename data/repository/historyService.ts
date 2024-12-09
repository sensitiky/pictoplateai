import { HistoryItem } from '@data/models/foodHistory';
import AsyncStorage from '@react-native-async-storage/async-storage';

class HistoryService {
  private key = '@foodHistory';

  public async getHistory(): Promise<HistoryItem[]> {
    try {
      const historyData = await AsyncStorage.getItem(this.key);
      return historyData
        ? JSON.parse(historyData).map(
            (item: any) =>
              new HistoryItem(
                item.id,
                new Date(item.dateTime),
                item.nutritionalInfo,
                item.imagePath
              )
          )
        : [];
    } catch (error) {
      console.error('Error getting history:', error);
      return [];
    }
  }

  public async addHistory(item: HistoryItem): Promise<void> {
    try {
      const currentHistory = await this.getHistory();
      currentHistory.unshift(item);
      await AsyncStorage.setItem(this.key, JSON.stringify(currentHistory));
    } catch (error) {
      console.error('Error adding to history:', error);
    }
  }

  public async clearHistory(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.key);
    } catch (error) {
      console.error('Error clearing history:', error);
    }
  }
}

export const historyService = new HistoryService();