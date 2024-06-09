import React from "react";
import LoginScreen from './src/screens/login';
import { UserProvider } from './src/navigation/UserContext';

export default function App(){
  return(
    <UserProvider>
      <LoginScreen/>
    </UserProvider>
  );
}
