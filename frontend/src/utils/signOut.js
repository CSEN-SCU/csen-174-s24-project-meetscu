import React from 'react';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import axios from 'axios';
import UserContext from './UserContext';
import AuthContext from './AuthContext';
import { useNavigation } from '@react-navigation/native';

// sign out
const signOut = () => {
    const { user, setUser } = React.useContext(UserContext);
    const { setIsLoggedIn } = React.useContext(AuthContext);
    const navigation = useNavigation();

    const deleteAndSignOut = async () => {
        try {
            console.log("Signing out")
            setIsLoggedIn(false);
            setUser(null);
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            navigation.navigate('Login');
        } catch (error) {
            console.error(error);
        }
    };

    return deleteAndSignOut;
}

export default signOut;