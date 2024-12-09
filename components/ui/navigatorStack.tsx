import { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import History from '@pages/history';
import Home from '@pages/home';
import Settings from '@pages/settings';
import { AuthStack, UserContext } from '@utils/helpers';
import { AppStackParameters } from '@utils/types';
import Authentication from '@pages/auth';

export const AuthNavigator = () => {
  return (
    <AuthStack.Navigator initialRouteName="Welcome">
      <AuthStack.Screen
        name="Welcome"
        component={Authentication}
        options={{ title: 'Welcome', headerTitleAlign: 'center' }}
      />
    </AuthStack.Navigator>
  );
};

export const AppNavigator = () => {
  const { user } = useContext(UserContext);
  const Tab = createBottomTabNavigator<AppStackParameters>();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: string = '';

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'home' : 'home-outline';
              break;
            case 'History':
              iconName = focused ? 'time' : 'time-outline';
              break;
            case 'Settings':
              iconName = focused ? 'settings' : 'settings-outline';
              break;
            case 'Onboarding':
              iconName = focused
                ? 'information-circle'
                : 'information-circle-outline';
              break;
            default:
              iconName = 'ellipse';
          }

          return (
            <Ionicons name={iconName as string} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: '#000',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      {user?.isPremium && <Tab.Screen name="History" component={History} />}
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
