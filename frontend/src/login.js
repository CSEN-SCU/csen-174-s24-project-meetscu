import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';

const LoginScreen = () => {
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
  });

  // google sign in
  const handleGoogle = async (e) => {
    try{
      console.log("Google Sign In");
      await GoogleSignin.hasPlayServices();
      console.log("Play Services are available")
      const user = await GoogleSignin.signIn();
      setUser(user);
      setError();

      console.log(user);
    } catch(error){
      console.log(error);
    }
  };

  // sign out
  const signOut = async () => {
    try {
      setUser(undefined);
      GoogleSignin.revokeAccess();
      GoogleSignin.signOut();
      console.log("User signed out");
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <View style={styles.container}>
        <Text>{JSON.stringify(error)}</Text>
        {user && <Text>{JSON.stringify(user.user)}</Text>}
        {user ? (
          <Button title="Logout" onPress={signOut} />
        ) : (
          <GoogleSigninButton
            size={GoogleSigninButton.Size.Standard}
            color={GoogleSigninButton.Color.Dark}
            onPress={handleGoogle}
          />
        )}
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
});

export default LoginScreen;