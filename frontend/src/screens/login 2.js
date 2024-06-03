import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import UserContext from '../navigation/UserContext';
import AppNavigation from '../navigation/AppNavigation';
import axios from 'axios';

export default function LoginScreen(){
  const [error, setError] = useState();
  const [authenticated, setAuthenticated] = useState(false);
  const { user, setUser } = React.useContext(UserContext);

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
      setUser(user.user);
      setError(null);
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

  const sendUser = async (user) => {
    try{
      const sendUserDataResponse = await axios.post(
        "http://127.0.0.1:5000/loggedIn",
        {
          email: user.email,
          name: user.name,
          photo: user.photo
        }
      );
      if(sendUserDataResponse.status === 200){
        console.log("User data sent to backend");
        setAuthenticated(true);
      } else {
        console.error("Failed to send user data to backend");
      }
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    if(user && !user.email.endsWith("@scu.edu")){
      console.log("INVALID EMAIL")
      setError("Email entered is not an SCU email. Please sign in with your SCU email.")
      signOut();
    }
  }, [user]);

  useEffect(() => {
    if(user && user.email.endsWith("@scu.edu")){
      sendUser(user);
    }
  }, [user]);

  if(authenticated){
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
