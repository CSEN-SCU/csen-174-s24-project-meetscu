import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MeetScreen from '../screens/MeetScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  const [rightSwipes, setRightSwipes] = useState([]);

  const updateRightSwipes = (newSwipe) => {
    setRightSwipes((prevSwipes) => [...prevSwipes, newSwipe]);
  };

  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Meet!">
          {() => <MeetScreen updateRightSwipes={updateRightSwipes} />}
        </Tab.Screen>
        <Tab.Screen name="Chat">
          {() => <ChatScreen rightSwipes={rightSwipes} />}
        </Tab.Screen>
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}