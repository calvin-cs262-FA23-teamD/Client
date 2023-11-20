/* App.js */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MetronomeScreen from './screens/Metronome';
import TrackbuilderScreen from './screens/Trackbuilder';
// import new screens
import LogInScreen from './screens/LogIn';
import SignUpScreen from './screens/SignUp';
import TrackSoundScreen from './screens/TrackSound';
import NButtonsScreen from './screens/NButtons';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();
setTimeout(SplashScreen.hideAsync, 5000);

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="NButtons" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Metronome" component={MetronomeScreen} />
                <Stack.Screen name="Trackbuilder" component={TrackbuilderScreen} />
                {/* Add new screens to the stack */}
                <Stack.Screen name="LogIn" component={LogInScreen} />
                <Stack.Screen name="SignUp" component={SignUpScreen} />
                <Stack.Screen name="TrackSound" component={TrackSoundScreen} />
                <Stack.Screen name="NButtons" component={NButtonsScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
