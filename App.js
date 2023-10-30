/* App.js */

import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MetronomeScreen from './screens/Metronome';
import TrackbuilderScreen from './screens/Trackbuilder';
//import LogInScreen from './screens/LogIn';
//import SignUpScreen from './screens/SignUp';

const Stack = createNativeStackNavigator();

export default function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Metronome" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Metronome" component={MetronomeScreen} />
                <Stack.Screen name="Trackbuilder" component={TrackbuilderScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}
