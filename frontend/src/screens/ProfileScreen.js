// import { View, Text } from "react-native";
// import React from "react";


// export default function ProfileScreen(){
//     return (
//         <View>
//             <Text>ProfileScreen</Text>
//         </View>
//     )
// }

import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default function ProfileScreen() {
    const [interests, setInterests] = useState({
        running: false,
        gym: false,
        eating: false
    });

    const handleCheckboxChange = (interest) => {
        setInterests({
            ...interests,
            [interest]: !interests[interest]
        });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Interest Form</Text>
            <View style={styles.form}>
                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => handleCheckboxChange('running')}
                >
                    <Text style={styles.checkboxLabel}>Running</Text>
                </TouchableOpacity>
                {interests.running && (
                    <View style={styles.dropdown}>
                        <Text>Interest Level:</Text>
                        <select name="running_interest" style={styles.select}>
                            <option value="1">Not interested</option>
                            <option value="2">Somewhat interested</option>
                            <option value="3">Interested</option>
                            <option value="4">Very interested</option>
                        </select>
                        <Text>Desired Interest:</Text>
                        <select name="running_desired_interest" style={styles.select}>
                            <option value="1">Not important</option>
                            <option value="2">Somewhat important</option>
                            <option value="3">Important</option>
                            <option value="4">Very important</option>
                        </select>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => handleCheckboxChange('gym')}
                >
                    <Text style={styles.checkboxLabel}>Gym</Text>
                </TouchableOpacity>
                {interests.gym && (
                    <View style={styles.dropdown}>
                        <Text>Interest Level:</Text>
                        <select name="gym_interest" style={styles.select}>
                            <option value="1">Not interested</option>
                            <option value="2">Somewhat interested</option>
                            <option value="3">Interested</option>
                            <option value="4">Very interested</option>
                        </select>
                        <Text>Desired Interest:</Text>
                        <select name="gym_desired_interest" style={styles.select}>
                            <option value="1">Not important</option>
                            <option value="2">Somewhat important</option>
                            <option value="3">Important</option>
                            <option value="4">Very important</option>
                        </select>
                    </View>
                )}

                <TouchableOpacity
                    style={styles.checkboxContainer}
                    onPress={() => handleCheckboxChange('eating')}
                >
                    <Text style={styles.checkboxLabel}>Eating</Text>
                </TouchableOpacity>
                {interests.eating && (
                    <View style={styles.dropdown}>
                        <Text>Interest Level:</Text>
                        <select name="eating_interest" style={styles.select}>
                            <option value="1">Not interested</option>
                            <option value="2">Somewhat interested</option>
                            <option value="3">Interested</option>
                            <option value="4">Very interested</option>
                        </select>
                        <Text>Desired Interest:</Text>
                        <select name="eating_desired_interest" style={styles.select}>
                            <option value="1">Not important</option>
                            <option value="2">Somewhat important</option>
                            <option value="3">Important</option>
                            <option value="4">Very important</option>
                        </select>
                    </View>
                )}

                <TouchableOpacity style={styles.submitButton}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        width: '80%',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    checkboxLabel: {
        marginRight: 10,
    },
    dropdown: {
        marginLeft: 20,
        marginBottom: 10,
    },
    select: {
        width: '100%',
        marginBottom: 5,
        padding: 8,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
    },
    submitButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    submitButtonText: {
        color: 'white',
        fontSize: 16,
    },
});
