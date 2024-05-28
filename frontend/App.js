import React from "react";
import { UserProvider } from './src/utils/UserContext';
import { AuthProvider } from "./src/utils/AuthContext";
import { UserProvider } from './src/navigation/UserContext';

export default function App(){
  return(
    <UserProvider>
     (
    <UserProvider>
      <AuthProvider>
        <AppNavigation/>
      </AuthProvider>
    </UserProvider>
  )
    </UserProvider>
  );
}
