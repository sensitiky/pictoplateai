import AsyncStorage from '@react-native-async-storage/async-storage';

class UserPreferences {
  private keyIsPremium = 'isPremium';
  public async setPremium(value: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(this.keyIsPremium, JSON.stringify(value));
    } catch (error) {
      console.error('Issue with saving premium state', error);
    }
  }
  public async getPremium(): Promise<boolean | null> {
    try {
      const value = await AsyncStorage.getItem(this.keyIsPremium);
      return value !== null ? JSON.parse(value) : null;
    } catch (error) {
      console.error('Issue with getting premium state', error);
      return false;
    }
  }
}
