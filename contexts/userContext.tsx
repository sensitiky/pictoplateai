import { ReactNode, useEffect, useState } from 'react';
import { IUser } from '../utils/interfaces';
import { UserContext } from '../utils/helpers';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('@userData');
        if (userData) {
          setUser(JSON.parse(userData));
        }
      } catch (error) {
        console.error('Error loading user data:', error);
      } finally {
        setLoading(false);
      }
    };
    loadUser();
  }, []);

  const updateUser = async (newUser: IUser | null) => {
    setUser(newUser);
    if (newUser) {
      await AsyncStorage.setItem('@userData', JSON.stringify(newUser));
    } else {
      await AsyncStorage.removeItem('@userData');
    }
  };

  return (
    <UserContext.Provider value={{ user, loading, setUser: updateUser }}>
      {children}
    </UserContext.Provider>
  );
};
