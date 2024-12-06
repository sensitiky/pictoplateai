import Authentication from '@pages/auth';
import { createStackNavigator } from '@react-navigation/stack';
type AuthStackParameters = {
  Authentication: undefined;
};
const AuthStack = createStackNavigator<AuthStackParameters>();
export const AppNavigator = () => {};
export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name="Authentication" component={Authentication} />
    </AuthStack.Navigator>
  );
};
