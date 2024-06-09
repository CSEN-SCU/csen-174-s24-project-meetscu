import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MeetScreen from '../screens/MeetScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from "../screens/login";
import { enableScreens } from 'react-native-screens';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

enableScreens();

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Main" component={MainTabs} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const MainTabs = () => {
  const [rightSwipes, setRightSwipes] = useState([]);
  const updateRightSwipes = (newSwipe) => {
    setRightSwipes((prevSwipes) => [...prevSwipes, newSwipe]);
  };

  return (
    <Tab.Navigator>
        <Tab.Screen name="Meet!">
          {() => <MeetScreen updateRightSwipes={updateRightSwipes} />}
        </Tab.Screen>
        <Tab.Screen name="Chat">
          {() => <ChatScreen rightSwipes={rightSwipes} />}
        </Tab.Screen>
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
  );
}
