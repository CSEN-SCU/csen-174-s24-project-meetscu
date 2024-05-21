import React, { useState } from 'react';
import axios from 'axios';

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

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = {
            interests: interests,
            interestLevels: interestLevels,
            desiredInterestLevels: desiredInterestLevels
        };

        try {
            console.log("Submitting");
            const {response} = await axios.post('http://127.0.0.1:5000/submit', formData, {
                headers: {
                'Content-Type': 'multipart/form-data'
                }
            });

            if (response.ok) {
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
    );
}

const styles = {
    container: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
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
    }
};
