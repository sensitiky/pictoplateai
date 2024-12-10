import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HistoryList from '@pages/history';
import Home from '@pages/home';
import Settings from '@pages/settings';
import Authentication from '@pages/auth';
import { createStackNavigator } from '@react-navigation/stack';
import Welcome from '@pages/welcome';

export const AuthNavigator = () => {
  const Auth = createStackNavigator();

  return (
    <Auth.Navigator initialRouteName="Welcome">
      <Auth.Screen
        name="Welcome"
        component={Welcome}
        options={{ title: '', headerShadowVisible: false }}
      />
      <Auth.Screen
        name="Authentication"
        component={Authentication}
        options={{
          title: 'Welcome',
          headerTitleAlign: 'center',
          headerShadowVisible: false,
          headerLeft: () => null,
        }}
      />
    </Auth.Navigator>
  );
};

export const AppNavigator = () => {
  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={({ route }) => ({
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

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#3b82f6',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopWidth: 0,
          elevation: 5,
        },
      })}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen
        name="History"
        component={HistoryList}
        options={{ headerTitle: 'Food History' }}
      />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
};
