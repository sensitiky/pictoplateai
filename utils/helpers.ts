import { createContext } from 'react';
import { UserContextProps } from '@utils/interfaces';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStackParameters, AuthStackParameters } from './types';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: true,
  setUser: async () => Promise.resolve(),
});
export const AuthStack = createStackNavigator<AuthStackParameters>();
export const AppStack = createBottomTabNavigator<AppStackParameters>();
