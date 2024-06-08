import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import UserContext from '../utils/UserContext';
import AuthContext from '../utils/AuthContext';
import axios from 'axios';

export default function HomeScreen() {
    const { user, setUser } = useContext(UserContext);
    const { isLoggedIn, setIsLoggedIn } = useContext(AuthContext);
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/getUser', {
                    params: { email: user.email }
                });
                if (response.status === 200) {
                    setUserData(response.data);
                } else {
                    console.error('User data could not be retrieved');
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        if (user && user.email) {
            fetchUserData();
        }
    }, [user]);

    if (!user || !userData) {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image source={{ uri: userData.photo }} style={styles.profileImage} />
            <Text style={styles.text}>User Name: {userData.name}</Text>
            <Text style={styles.text}>Email: {userData.email}</Text>
            <Text style={styles.text}>Age: {userData.age}</Text>
            <Text style={styles.text}>Interest Data:</Text>
            {userData.activities && userData.activities.length > 0 ? (
                userData.activities.map((activity, index) => (
                    <View key={index} style={styles.activityContainer}>
                        <Text style={styles.text}>Activity: {activity.activity}</Text>
                        <Text style={styles.text}>Interest Level: {activity.interest_level}</Text>
                        <Text style={styles.text}>Desired Interest Level: {activity.desired_interest_level}</Text>
                    </View>
                ))
            ) : (
                <Text style={styles.text}>No activities found</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        marginVertical: 5,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    activityContainer: {
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#f0f0f0',
        borderRadius: 5,
    },
});
