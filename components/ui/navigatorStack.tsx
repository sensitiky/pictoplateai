import Authentication from '@pages/auth';
import Home from '@pages/home';
import { createStackNavigator } from '@react-navigation/stack';

export type AuthStackParameters = {
  Welcome: undefined;
};

const AuthStack = createStackNavigator<AuthStackParameters>();
export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="Welcome"
        component={Authentication}
        options={{ title: 'Welcome', headerTitleAlign: 'center' }}
      />
    </AuthStack.Navigator>
  );
};
export type AppStackParameters = {
  Home: undefined;
};
export const AppStack = createStackNavigator<AppStackParameters>();
export const AppNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  );
};
