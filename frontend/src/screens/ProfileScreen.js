<<<<<<< HEAD
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import UserContext from "../navigation/UserContext";
import UserContext from "../utils/UserContext";
import AuthContext from '../utils/AuthContext';
import signOut from '../utils/signOut';
import { useNavigation } from '@react-navigation/native';
=======
import React, { useState } from 'react';
import axios from 'axios';
import UserContext from "../navigation/UserContext";

>>>>>>> cb48d1b90ca4607a123084ff77b1a01fca6b2eb6

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
<<<<<<< HEAD
    const userSignOut = signOut();
=======
    const { user, setUser } = React.useContext(UserContext);
>>>>>>> cb48d1b90ca4607a123084ff77b1a01fca6b2eb6

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
<<<<<<< HEAD
=======

>>>>>>> cb48d1b90ca4607a123084ff77b1a01fca6b2eb6
        const selectedInterests = Object.keys(interests).filter(interest => interests[interest]);
        const formData = selectedInterests.map(interest => ({
            activity: interest,
            interest_level: interestLevels[interest],
            desired_interest_level: desiredInterestLevels[interest]
        }));
<<<<<<< HEAD
=======

>>>>>>> cb48d1b90ca4607a123084ff77b1a01fca6b2eb6
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
<<<<<<< HEAD
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
    <div style={styles.dropdown}>
        <label>
            Interest Level:
            <select
                value={interestLevels.eating}
                onChange={(e) => handleInterestLevelChange('eating', e.target.value)}
            >
                <option value="1">Not interested</option>
                <option value="2">Somewhat interested</option>
                <option value="3">Interested</option>
                <option value="4">Very interested</option>
            </select>
        </label>
        <label>
            Desired Interest:
            <select
                value={desiredInterestLevels.eating}
                onChange={(e) => handleDesiredInterestLevelChange('eating', e.target.value)}
            >
                <option value="1">Not important</option>
                <option value="2">Somewhat important</option>
                <option value="3">Important</option>
                <option value="4">Very important</option>
            </select>
        </label>
    </div>
)}

                <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                    <Text style={styles.submitButtonText}>Submit</Text>
                </TouchableOpacity>
            </View>
        </View>
=======
        <div>
            <h1>Interest Form</h1>
            <form onSubmit={handleSubmit}>
                <div style={styles.form}>
                    <label style={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={interests.running}
                            onChange={() => handleCheckboxChange('running')}
                        />
                        Running
                    </label>
                    {interests.running && (
                        <div style={styles.dropdown}>
                            <label>
                                Interest Level:
                                <select
                                    value={interestLevels.running}
                                    onChange={(e) => handleInterestLevelChange('running', e.target.value)}
                                >
                                    <option value="1">Not interested</option>
                                    <option value="2">Somewhat interested</option>
                                    <option value="3">Interested</option>
                                    <option value="4">Very interested</option>
                                </select>
                            </label>
                            <label>
                                Desired Interest:
                                <select
                                    value={desiredInterestLevels.running}
                                    onChange={(e) => handleDesiredInterestLevelChange('running', e.target.value)}
                                >
                                    <option value="1">Not important</option>
                                    <option value="2">Somewhat important</option>
                                    <option value="3">Important</option>
                                    <option value="4">Very important</option>
                                </select>
                            </label>
                        </div>
                    )}
                    <label style={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={interests.gym}
                            onChange={() => handleCheckboxChange('gym')}
                        />
                        Gym
                    </label>
                    {interests.gym && (
                        <div style={styles.dropdown}>
                            <label>
                                Interest Level:
                                <select
                                    value={interestLevels.gym}
                                    onChange={(e) => handleInterestLevelChange('gym', e.target.value)}
                                >
                                    <option value="1">Not interested</option>
                                    <option value="2">Somewhat interested</option>
                                    <option value="3">Interested</option>
                                    <option value="4">Very interested</option>
                                </select>
                            </label>
                            <label>
                                Desired Interest:
                                <select
                                    value={desiredInterestLevels.gym}
                                    onChange={(e) => handleDesiredInterestLevelChange('gym', e.target.value)}
                                >
                                    <option value="1">Not important</option>
                                    <option value="2">Somewhat important</option>
                                    <option value="3">Important</option>
                                    <option value="4">Very important</option>
                                </select>
                            </label>
                        </div>
                    )}
                    <label style={styles.checkboxContainer}>
                        <input
                            type="checkbox"
                            checked={interests.eating}
                            onChange={() => handleCheckboxChange('eating')}
                        />
                        Eating
                    </label>
                    {interests.eating && (
                        <div style={styles.dropdown}>
                            <label>
                                Interest Level:
                                <select
                                    value={interestLevels.eating}
                                    onChange={(e) => handleInterestLevelChange('eating', e.target.value)}
                                >
                                    <option value="1">Not interested</option>
                                    <option value="2">Somewhat interested</option>
                                    <option value="3">Interested</option>
                                    <option value="4">Very interested</option>
                                </select>
                            </label>
                            <label>
                                Desired Interest:
                                <select
                                    value={desiredInterestLevels.eating}
                                    onChange={(e) => handleDesiredInterestLevelChange('eating', e.target.value)}
                                >
                                    <option value="1">Not important</option>
                                    <option value="2">Somewhat important</option>
                                    <option value="3">Important</option>
                                    <option value="4">Very important</option>
                                </select>
                            </label>
                        </div>
                    )}
                </div>
                <button style={styles.submitButton} type="submit">
                    Submit
                </button>
            </form>
        </div>
>>>>>>> cb48d1b90ca4607a123084ff77b1a01fca6b2eb6
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
<<<<<<< HEAD
        // justifyContent: 'center',
        padding: '20px',
        paddingTop: 50,
        marginTop: 10
=======
        justifyContent: 'center',
        padding: '20px'
>>>>>>> cb48d1b90ca4607a123084ff77b1a01fca6b2eb6
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
<<<<<<< HEAD
    },
};
=======
    }
};
>>>>>>> cb48d1b90ca4607a123084ff77b1a01fca6b2eb6
