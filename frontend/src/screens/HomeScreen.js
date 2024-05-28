import { View, Text, StyleSheet, Image } from "react-native";
import React, { useState, useEffect } from "react";
import UserContext from "../navigation/UserContext";
import axios from "axios";

export default function HomeScreen(){
    const { user, setUser } = React.useContext(UserContext);

    console.log("USER: ", user)
    
    useEffect(() => {
        axios.get("http://127.0.0.1:5000/getUser", {
            params: {
                email: user.email
            }
        })
        .then((response) => {
            console.log("GETTING USER RESPONSE: ", response.data);
            setUser(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, [user.email]);

    // if user has not filled in profile
    if(!user || !user.interests){
        return (
            <View style={styles.container}>
                <Text>Please fill out your profile first</Text>
            </View>
        )
    }

    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/profile_transparent.jpg")}
                style={styles.profileImage}
            />
            <Text style={styles.name}>John Doe</Text>
            <Text style={styles.bio}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla commodo mi vel magna dictum, eu condimentum lorem pellentesque.</Text>
            <Text style={styles.location}>Location: New York City</Text>
            <Text style={styles.interests}>Interests: Running, Gym, Cooking</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    profileImage: {
        width: 150,
        height: 150,
        borderRadius: 75,
        marginBottom: 20,
    },
    name: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    bio: {
        fontSize: 16,
        textAlign: 'center',
        marginBottom: 10,
    },
    location: {
        fontSize: 16,
        marginBottom: 5,
    },
    interests: {
        fontSize: 16,
    },
});