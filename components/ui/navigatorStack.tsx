import Authentication from '@pages/auth';
import Home from '@pages/home';
import { AuthStack, AppStack } from '@utils/helpers';

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

export const AppNavigator = () => {
  return (
    <AppStack.Navigator>
      <AppStack.Screen name="Home" component={Home} />
    </AppStack.Navigator>
  );
};
