import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import UserContext from "../utils/UserContext";
import AuthContext from '../utils/AuthContext';
import signOut from '../utils/signOut';
import { useNavigation } from '@react-navigation/native';

export default function ProfileScreen() {
    const [interests, setInterests] = useState({
        running: false,
        gym: false,
        eating: false
    });
    const [interestLevels, setInterestLevels] = useState({
        running: '',
        gym: '',
        eating: ''
    });
    const [desiredInterestLevels, setDesiredInterestLevels] = useState({
        running: '',
        gym: '',
        eating: ''
    });
    const userSignOut = signOut();

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

    const handleSubmit = async (e) => {
        e.preventDefault();
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
                // Handle success
            } else {
                console.error('Failed to submit interests');
                // Handle error
            }
        } catch (error) {
            console.error('Error occurred:', error);
            // Handle error
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.signOutButton} onPress={userSignOut}>
                <Text style={styles.signOutText}>Sign Out</Text>
            </TouchableOpacity>

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
                        <Picker
                            selectedValue={interestLevels.running}
                            style={styles.select}
                            onValueChange={(itemValue) => handleInterestLevelChange('running', itemValue)}
                        >
                            <Picker.Item label="Not interested" value="1" />
                            <Picker.Item label="Somewhat interested" value="2" />
                            <Picker.Item label="Interested" value="3" />
                            <Picker.Item label="Very interested" value="4" />
                        </Picker>
                        <Text>Desired Interest:</Text>
                        <Picker
                            selectedValue={desiredInterestLevels.running}
                            style={styles.select}
                            onValueChange={(itemValue) => handleDesiredInterestLevelChange('running', itemValue)}
                        >
                            <Picker.Item label="Not important" value="1" />
                            <Picker.Item label="Somewhat important" value="2" />
                            <Picker.Item label="Important" value="3" />
                            <Picker.Item label="Very important" value="4" />
                        </Picker>
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
                        <Picker
                            selectedValue={interestLevels.gym}
                            style={styles.select}
                            onValueChange={(itemValue) => handleInterestLevelChange('gym', itemValue)}
                        >
                            <Picker.Item label="Not interested" value="1" />
                            <Picker.Item label="Somewhat interested" value="2" />
                            <Picker.Item label="Interested" value="3" />
                            <Picker.Item label="Very interested" value="4" />
                        </Picker>
                        <Text>Desired Interest:</Text>
                        <Picker
                            selectedValue={desiredInterestLevels.gym}
                            style={styles.select}
                            onValueChange={(itemValue) => handleDesiredInterestLevelChange('gym', itemValue)}
                        >
                            <Picker.Item label="Not important" value="1" />
                            <Picker.Item label="Somewhat important" value="2" />
                            <Picker.Item label="Important" value="3" />
                            <Picker.Item label="Very important" value="4" />
                        </Picker>
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
                        <Picker
                            selectedValue={interestLevels.eating}
                            style={styles.select}
                            onValueChange={(itemValue) => handleInterestLevelChange('eating', itemValue)}
                        >
                            <Picker.Item label="Not interested" value="1" />
                            <Picker.Item label="Somewhat interested" value="2" />
                            <Picker.Item label="Interested" value="3" />
                            <Picker.Item label="Very interested" value="4" />
                        </Picker>
                        <Text>Desired Interest:</Text>
                        <Picker
                            selectedValue={desiredInterestLevels.eating}
                            style={styles.select}
                            onValueChange={(itemValue) => handleDesiredInterestLevelChange('eating', itemValue)}
                        >
                            <Picker.Item label="Not important" value="1" />
                            <Picker.Item label="Somewhat important" value="2" />
                            <Picker.Item label="Important" value="3" />
                            <Picker.Item label="Very important" value="4" />
                        </Picker>
                    </View>
                )}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        // justifyContent: 'center',
        padding: '20px',
        paddingTop: 50,
        marginTop: 10
    },
    title: {
        fontSize: '24px',
        fontWeight: 'bold',
        marginBottom: '20px'
    },
    form: {
        width: '80%'
    },
    checkboxContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '10px'
    },
    dropdown: {
        marginLeft: '20px',
        marginBottom: '10px'
    },
    submitButton: {
        backgroundColor: 'blue',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
        cursor: 'pointer'
    },
    signOutButton: {
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: 'red',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        textAlign: 'center',
        cursor: 'pointer'
    },
};