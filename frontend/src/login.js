import React from 'react';
import axios from 'axios';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/firebaseConfig'

const LoginScreen = () => {
    const handleGoogle = async (e) => {
        const provider = await new GoogleAuthProvider();
        signInWithPopup(auth, provider).then((result) => {
          // send to backend
        }).catch((error) => {
          console.log(error)
        });
    };

    return (
        <View style={styles.container}>
            <Pressable style={styles.button} onPress={handleGoogle}>
                <Text style={styles.text}>{"Sign in with Google"}</Text>
            </Pressable>
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
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    backgroundColor: 'black',
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