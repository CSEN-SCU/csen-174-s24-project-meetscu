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
import { Picker } from '@react-native-picker/picker';

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


// export default function ProfileScreen(){
//     return (
//         <View>
//             <Text>ProfileScreen</Text>
//         </View>
//     )
// }