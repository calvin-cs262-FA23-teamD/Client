/* eslint-disable linebreak-style */
/* eslint-disable import/no-unresolved */
/* eslint-disable import/extensions */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
/* eslint-disable react/jsx-filename-extension */
/* App.js */
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import * as SplashScreen from 'expo-splash-screen';

import MetronomeScreen from './screens/Metronome';
import TrackbuilderScreen from './screens/Trackbuilder';
import LogInScreen from './screens/LogIn';
import SignUpScreen from './screens/SignUp';
import NButtonsScreen from './screens/NButtons';

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
        <Stack.Screen name="NButtons" component={NButtonsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
