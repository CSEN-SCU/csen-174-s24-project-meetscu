import React from "react";
import AppNavigation from './src/navigation/AppNavigation';
import { UserProvider } from './src/utils/UserContext';
import { AuthProvider } from "./src/utils/AuthContext";

export default function App(){
  return(
    <UserProvider>
      <AuthProvider>
        <AppNavigation/>
      </AuthProvider>
    </UserProvider>
  );
}
