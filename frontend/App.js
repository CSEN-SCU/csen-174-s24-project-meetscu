import React from "react";
import LoginScreen from './src/screens/login';
import { UserProvider } from './src/utils/UserContext';
import { AuthProvider } from './src/utils/AuthContext';
import AppNavigation from "./src/navigation/AppNavigation";

export default function App(){
  return(
    <UserProvider>
      <AuthProvider>
        <AppNavigation/>
      </AuthProvider>
    </UserProvider>
  );
}
