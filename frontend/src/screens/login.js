import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-google-signin/google-signin';
import UserContext from '../utils/UserContext';
import AuthContext from '../utils/AuthContext';
import axios from 'axios';
import signOut from '../utils/signOut';
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen(){
  const [error, setError] = useState(null);
  const { isLoggedIn, setIsLoggedIn } = React.useContext(AuthContext);
  const { user, setUser } = React.useContext(UserContext);
  const navigation = useNavigation();
  const userSignOut = signOut();

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

  const sendUser = async (user) => {
    try{
      // try logging in first, if user does not exist, send new user data to backend
      const logInResponse = await axios.get(
        "http://127.0.0.1:5000/getUser", {
          params: {
            email: user.email,
            name: user.name,
            photo: user.photo
          }
        }
      );
      if(logInResponse.status === 200){
        // successfully logged in
        console.log("User logged in");
        setIsLoggedIn(true);
        setUser(logInResponse.data);
      } else if(logInResponse.status === 204){
        // cannnot find user in database so send new user data
        console.log("Create new user");
        const sendUserDataResponse = await axios.post(
          "http://127.0.0.1:5000/loggedIn",
          {
            email: user.email,
            name: user.name,
            photo: user.photo
          }
        );
        if(sendUserDataResponse.status === 200){
          // successfully sent new data
          setIsLoggedIn(true);
          setUser(sendUserDataResponse.data);
        } else {
          // error in creating profile
          console.error("Failed to send user data to backend");
        }
      } else {
        // error in logging in
        console.error("Failed to log in user")
      }
    } catch(error){
      console.log(error);
    }
  }

  useEffect(() => {
    if(!isLoggedIn && user && user.email && user.email.endsWith("@scu.edu")){
      // if SCU email set user and insert into database
      sendUser(user);
      navigation.navigate('Main');
    }
    if(!isLoggedIn && user && user.email && !user.email.endsWith("@scu.edu")){
      // not an SCU email
      console.log("Invalid Email");
      setError("Email entered is not an SCU email. Please sign in with your SCU email.");
      userSignOut();
    }
  }, [user, isLoggedIn]);

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
