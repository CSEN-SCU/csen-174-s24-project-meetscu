// import { StyleSheet, Text, View } from 'react-native';
// import React from "react";

// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
// import WelcomeScreen from '../screens/WelcomeScreen';
// import ChatDetails from '../screens/ChatDetails';
// import ChatScreen from '../screens/ChatScreen';
// import ProfileScreen from '../screens/ProfileScreen';
// import HomeScreen from '../screens/HomeScreen';

// const Stack = createNativeStackNavigator();
// const Tab = createBottomTabNavigator();

// export default function AppNavigation() {
//     const HomeTabs = () => {
//       return (
//         <Tab.Navigator>
//             <Tab.Screen name="Home" component={HomeScreen} />
//             <Tab.Screen name="Chat" component={ChatScreen} />
//             <Tab.Screen name="Profile" component={ProfileScreen} />
//         </Tab.Navigator>
//       )
//     }
    
//       return <NavigationContainer>
//         <Stack.Navigator
//           initialRouteName="Welcome"
//           screenOptions={{ 
//             "tabBarStyle": [
//               {
//                 "display": "flex"
//               },
//               null
//             ]
//           }}
//           >
//           <Stack.Screen 
//             name="Welcome" 
//             component={WelcomeScreen}
//           />
//           <Stack.Screen
//             name="Home"
//             component={HomeTabs}
//           />
//           <Stack.Screen 
//             name="Chat" 
//             component={ChatDetails}
//             options={{
//               presentation: "modal",
//             }}
//           />
//         </Stack.Navigator>
//       </NavigationContainer>
//     }
    
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MeetScreen from '../screens/MeetScreen';
import ChatScreen from '../screens/TinderCard';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function AppNavigation() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Meet!" component={MeetScreen} />
        <Tab.Screen name="Chat" component={ChatScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}