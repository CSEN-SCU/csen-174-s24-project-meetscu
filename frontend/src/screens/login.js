import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import AppNavigation from '../navigation/AppNavigation';

export default function LoginScreen(){
  const [error, setError] = useState();
  const [user, setUser] = useState();

  // configure google sign in
  const configureGoogleSignIn = () => {
    GoogleSignin.configure({
      webClientId: '1079887994609-0vgil14l7fatmus2ln6hcmnq5jo1qma7.apps.googleusercontent.com',
    });
  };

  useEffect(() => {
    configureGoogleSignIn();
  }, []);

  // google sign in
  const handleGoogle = async (e) => {
    try{
      console.log("Google Sign In")
      await GoogleSignin.hasPlayServices();
      const user = await GoogleSignin.signIn();
      setUser(user);
      setError(null);

      console.log(user);
    } catch(error){
      console.log(error);
    }
  };

  // sign out
  const signOut = async () => {
    try {
      setUser(undefined);
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      console.log("User signed out");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if(user && !user.user.email.endsWith("@scu.edu")){
      console.log("INVALID EMAIL")
      setError("Email entered is not an SCU email. Please sign in with your SCU email.")
      signOut();
    }
  }, [user]);

  if(user && user.user.email.endsWith("@scu.edu")){
      console.log("Rendering AppNavigation")
      return <AppNavigation/>;
  } 

  console.log("Rendering LoginScreen")
  return(
    <View style={styles.container}>
      <Text style={styles.titleText}>Welcome to MeetSCU!</Text>
     <Text>Please sign in with your SCU email</Text>
      {error && <Text style={styles.errorText}>{error}</Text>}
      <GoogleSigninButton
        size={GoogleSigninButton.Size.Standard}
        color={GoogleSigninButton.Color.Dark}
        onPress={handleGoogle}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  errorText: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  }
});
