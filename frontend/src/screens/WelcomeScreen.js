import { View, Text } from "react-native";
import React, { useCallback } from "react";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { Image } from 'react-native';


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
    }, [fontsLoaded,fontError]);

    if (!fontsLoaded){
        return null;
    }
    
    return (
        <View onLayout={onLayoutRootView}
        classname="flex-1"
        style={{
            width: wp(100),
        }}
        >

            <View 
                classname="justify-center items-center"
                style={{
                    width: wp(100),
                    height: hp(100),
                }}
                >

            <View 
                classname="justify-center items-center my-4"
                style={{
                    width: wp(100),
                }}
                >
                <Image
                    source={require("../../assets/SCUMeet_transparent.png")}
                    style={{
                        width: wp(100),
                        height: hp(100),
                    }}
                />
                </View>
            </View>
            <Text>Welcome Screen</Text>
        </View>
    );
}