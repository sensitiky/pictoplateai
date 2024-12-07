import { AppNavigator, AuthNavigator } from '@components/ui/navigatorStack';
import './global.css';
import { UserProvider } from '@contexts/userContext';
import { UserContext } from '@utils/helpers';
import { View, ActivityIndicator } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

export default function App() {
  return (
    <UserProvider>
      <NavigationContainer>
        <UserContext.Consumer>
          {({ user, loading }) =>
            loading ? (
              <View className="flex-1 justify-center items-center bg-white">
                <ActivityIndicator size="large" />
              </View>
            ) : user ? (
              <AppNavigator />
            ) : (
              <AuthNavigator />
            )
          }
        </UserContext.Consumer>
      </NavigationContainer>
    </UserProvider>
  );
}
