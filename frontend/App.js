// import { StatusBar } from 'expo-status-bar';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });

import React from 'react';
import { View } from 'react-native';
import LoginScreen from './src/login';
import ProfileForm from './src/profileform';

const App = () => {
    return (
        <View style={{ flex: 1 }}>
            <ProfileForm />
        </View>
    );
};

export default App;

