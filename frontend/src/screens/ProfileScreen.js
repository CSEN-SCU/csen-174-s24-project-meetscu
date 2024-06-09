import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import axios from 'axios';
import signOut from '../utils/signOut';
import { useNavigation } from '@react-navigation/native';
import RNPickerSelect from 'react-native-picker-select';

export default function ProfileScreen() {
    const [interests, setInterests] = useState({
        Running: false,
        Gym: false,
        Swimming: false,
        Hiking: false,
        Biking: false,
        Studying: false
    });
    const [interestLevels, setInterestLevels] = useState({
        running: '',
        gym: '',
        swimming: '',
        hiking: '',
        biking: '',
        studying: ''
    });
    const [desiredInterestLevels, setDesiredInterestLevels] = useState({
        running: '',
        gym: '',
        swimming: '',
        hiking: '',
        biking: '',
        studying: ''
    });
    const navigation = useNavigation();
    //const userSignOut = signOut();

    const handleCheckboxChange = (interest) => {
        setInterests({
            ...interests,
            [interest]: !interests[interest]
        });
    };

    const handleInterestLevelChange = (interest, level) => {
        setInterestLevels({
            ...interestLevels,
            [interest]: level
        });
    };

    const handleDesiredInterestLevelChange = (interest, level) => {
        setDesiredInterestLevels({
            ...desiredInterestLevels,
            [interest]: level
        });
    };

    const handleSubmit = async () => {
        const selectedInterests = Object.keys(interests).filter(interest => interests[interest]);
        const formData = selectedInterests.map(interest => ({
            activity: interest,
            interest_level: interestLevels[interest],
            desired_interest_level: desiredInterestLevels[interest]
        }));
        
        try {
            const response = await axios.post('http://127.0.0.1:5000/submit', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            if (response.status === 200) {
                console.log('Interests submitted successfully');
                // Navigate to HomeScreen after successful submission
                navigation.navigate('HomeScreen');
            } else {
                console.error('Failed to submit interests');
            }
        } catch (error) {
            console.error('Error occurred:', error);
        }
    };

    return (
        <View style={styles.container}>

            <Text style={styles.title}>Interest Form</Text>

            <View style={styles.form}>
                {Object.entries(interests).map(([interest, selected]) => (
                    <View key={interest} style={styles.interestContainer}>
                        <TouchableOpacity
                            style={styles.checkboxContainer}
                            onPress={() => handleCheckboxChange(interest)}
                        >
                            <Text style={styles.checkboxLabel}>{interest}</Text>
                        </TouchableOpacity>
                        {selected && (
                            <View style={styles.dropdownContainer}>
                                <Text>Interest Level:</Text>
                                <View style={styles.dropdown}>
                                    <RNPickerSelect
                                        value={interestLevels[interest]}
                                        onValueChange={(value) => handleInterestLevelChange(interest, value)}
                                        items={[
                                            { label: 'Not interested', value: '1' },
                                            { label: 'Somewhat interested', value: '2' },
                                            { label: 'Interested', value: '3' },
                                            { label: 'Very interested', value: '4' },
                                        ]}
                                    />
                                </View>
                                <Text>Desired Interest:</Text>
                                <View style={styles.dropdown}>
                                    <RNPickerSelect
                                        value={desiredInterestLevels[interest]}
                                        onValueChange={(value) => handleDesiredInterestLevelChange(interest, value)}
                                        items={[
                                            { label: 'Not important', value: '1' },
                                            { label: 'Somewhat important', value: '2' },
                                            { label: 'Important', value: '3' },
                                            { label: 'Very important', value: '4' },
                                        ]}
                                    />
                                </View>
                            </View>
                        )}
                    </View>
                ))}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
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
        padding: 20,
    },
    signOutButton: {
        position: 'absolute',
        top: 20,
        right: 20,
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 5,
    },
    signOutText: {
        color: 'white',
        fontSize: 16,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    form: {
        width: '80%',
    },
    interestContainer: {
        marginBottom: 20,
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxLabel: {
        fontSize: 18,
    },
    dropdownContainer: {
        marginTop: 10,
    },
    dropdown: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        marginBottom: 10,
    },
    select: {
        width: '100%',
        height: 50,
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