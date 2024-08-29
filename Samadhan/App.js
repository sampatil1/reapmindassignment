import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Import Screens
import HomeScreen from './screens/HomeScreen';
import DashboardScreen from './screens/DashboardScreen';
import ContactFormScreen from './screens/ContactFormScreen';
import ProfileScreen from './screens/ProfileScreen';
import UserSignupListScreen from './screens/UserSignupListScreen';

const Tab = createBottomTabNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = 'home';
            } else if (route.name === 'Dashboard') {
              iconName = 'analytics';
            } else if (route.name === 'ContactForm') {
              iconName = 'chatbox';
            } else if (route.name === 'Profile') {
              iconName = 'person';
            } else if (route.name === 'UserSignupList') {
              iconName = 'list';
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} />
        <Tab.Screen name="ContactForm" component={ContactFormScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="UserSignupList" component={UserSignupListScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
