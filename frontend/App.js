import React from "react";
<<<<<<< HEAD
import { UserProvider } from './src/utils/UserContext';
import { AuthProvider } from "./src/utils/AuthContext";
=======
import LoginScreen from './src/screens/login';
>>>>>>> cb48d1b90ca4607a123084ff77b1a01fca6b2eb6
import { UserProvider } from './src/navigation/UserContext';

export default function App(){
  return(
    <UserProvider>
<<<<<<< HEAD
     (
    <UserProvider>
      <AuthProvider>
        <AppNavigation/>
      </AuthProvider>
    </UserProvider>
  )
=======
      <LoginScreen/>
>>>>>>> cb48d1b90ca4607a123084ff77b1a01fca6b2eb6
    </UserProvider>
  );
}
