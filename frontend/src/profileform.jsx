import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const ProfileForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [location, setLocation] = useState('');
  const [bio, setBio] = useState('');

  const handleSubmit = () => {
    // Handle form submission logic here
    console.log('Form submitted');
  };

  return (
    <View>
      <Text>Name:</Text>
      <TextInput
        value={name}
        onChangeText={setName}
        placeholder="Enter your name"
      />
      <Text>Age:</Text>
      <TextInput
        value={age}
        onChangeText={setAge}
        placeholder="Enter your age"
        keyboardType="numeric"
      />
      <Text>Gender:</Text>
      <TextInput
        value={gender}
        onChangeText={setGender}
        placeholder="Enter your gender"
      />
      <Text>Location:</Text>
      <TextInput
        value={location}
        onChangeText={setLocation}
        placeholder="Enter your location"
      />
      <Text>Bio:</Text>
      <TextInput
        value={bio}
        onChangeText={setBio}
        placeholder="Enter your bio"
        multiline
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default ProfileForm;
