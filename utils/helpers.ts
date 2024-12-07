import { createContext } from 'react';
import { UserContextProps } from '@utils/interfaces';
import { createStackNavigator } from '@react-navigation/stack';
import { AppStackParameters, AuthStackParameters } from './types';

export const UserContext = createContext<UserContextProps>({
  user: null,
  loading: true,
});
export const AuthStack = createStackNavigator<AuthStackParameters>();
export const AppStack = createStackNavigator<AppStackParameters>();
