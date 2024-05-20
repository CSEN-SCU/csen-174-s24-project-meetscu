import { View, Text, StyleSheet, Image } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from '../screens/HomeScreen';
import ChatScreen from '../screens/ChatScreen';
import ProfileScreen from '../screens/ProfileScreen';

const Tab = createBottomTabNavigator();

export default function WelcomeScreen(){
    const [fontsLoaded, fontError] = useFonts({
        SpaceGroteskSemiBold: require("../fonts/SpaceGrotesk-SemiBold.ttf"),
        SpaceGroteskBold: require("../fonts/SpaceGrotesk-Bold.ttf"),
        SpaceGroteskMedium: require("../fonts/SpaceGrotesk-Medium.ttf"),
    });

    const onLayoutRootView = useCallback(async () => {
        if(fontsLoaded || fontError) {
            await SplashScreen.hideAsync();
        }
    }, [fontsLoaded, fontError]);

    if (!fontsLoaded){
        return null;
    }
    
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image
                    source={require("../../assets/SCUMeet_transparent.png")}
                    style={styles.image}
                    resizeMode="contain"
                />
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.welcomeText}>Welcome Screen</Text>
            </View>
            <View style={styles.tabContainer}>
                <Tab.Navigator tabBarOptions={{ style: styles.tabBar }}>
                    <Tab.Screen 
                        name="Home" 
                        component={HomeScreen} 
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Image
                                    source={focused ? require("../../assets/home_transparent.jpeg") : require("../../assets/home_transparent.jpeg")}
                                    style={styles.tabIcon}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen 
                        name="Chat" 
                        component={ChatScreen} 
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Image
                                    source={focused ? require("../../assets/chat_transparent.jpg") : require("../../assets/chat_transparent.jpg")}
                                    style={styles.tabIcon}
                                />
                            ),
                        }}
                    />
                    <Tab.Screen 
                        name="Profile" 
                        component={ProfileScreen} 
                        options={{
                            tabBarIcon: ({ focused }) => (
                                <Image
                                    source={focused ? require("../../assets/profile_transparent.jpg") : require("../../assets/profile_transparent.jpg")}
                                    style={styles.tabIcon}
                                />
                            ),
                        }}
                    />
                </Tab.Navigator>
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
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: wp(100), // Adjust as needed
        height: hp(50), // Adjust as needed
    },
    textContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20, // Adjust as needed
    },
    welcomeText: {
        fontSize: 24,
        fontFamily: 'SpaceGroteskSemiBold',
    },
    tabContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
    },
    tabBar: {
        backgroundColor: '#fff', // Adjust background color as needed
        borderTopWidth: 1, // Add border if needed
        borderTopColor: '#ccc', // Adjust border color as needed
    },
    tabIcon: {
        width: 24, // Adjust icon width as needed
        height: 24, // Adjust icon height as needed
    },
});
