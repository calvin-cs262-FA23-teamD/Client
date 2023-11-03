// SignUp.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

/* Import style code */
import { stylesMain } from './../styles/styleMain';
import { COLORS } from './../styles/colors';

import LogInScreen from '../screens/LogIn';

const SignUpScreen = ({ navigation }) => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSignUp = async () => {
        // Store the new user credentials in AsyncStorage
        //await AsyncStorage.setItem('username', newUsername);
        //await AsyncStorage.setItem('password', newPassword);

        /* Add code here making sure that newPassword 
         * and confirmNewPassword are the same,
         * else fail
         * 
         * 
         */

        if (newPassword === confirmNewPassword) {
            // Store the new user credentials in AsyncStorage
            await AsyncStorage.setItem('username', newUsername);
            await AsyncStorage.setItem('password', newPassword);
            // Successful sign up, navigate to the next screen
            navigation.navigate('LogIn');
        } else {
            // Invalid credentials, show an error message
            alert('Your passwords do not match. Please try again.');
        }

        // Navigate back to the login screen
        //navigation.navigate('LogIn');
    };

    return (
        <View style={{ backgroundColor: '#1f2e2e', marginTop: 50, flex: 1 }}>
            <TextInput
                marginTop={100}
                placeholder="Email"
                placeholderTextColor='#aaa'
                onChangeText={text => setEmail(text)}
                value={email}
                style={{
                    textAlign: 'center' // Center the text horizontally
                }}
            />
            <TextInput
                placeholder="New Username"
                placeholderTextColor='#aaa'
                onChangeText={text => setNewUsername(text)}
                value={newUsername}
                style={{
                    textAlign: 'center' // Center the text horizontally
                }}
            />
            <TextInput
                placeholder="New Password"
                placeholderTextColor='#aaa'
                onChangeText={text => setNewPassword(text)}
                value={newPassword}
                secureTextEntry
                style={{
                    textAlign: 'center' // Center the text horizontally
                }}
            />
            <TextInput
                placeholder="Confirm New Password"
                placeholderTextColor='#aaa'
                onChangeText={text => setConfirmNewPassword(text)}
                value={confirmNewPassword}
                secureTextEntry
                style={{
                    textAlign: 'center' // Center the text horizontally
                }}
            />
            <TouchableOpacity style={[stylesMain.orangeButton, stylesMain.buttonText]}
                onPress={handleSignUp}
            //onPress={() => navigation.navigate('LogIn')}  //Navigates back to the 'LogIn' screen
            >
                <Text style={stylesMain.buttonText}>CREATE AN ACCOUNT</Text>
            </TouchableOpacity>
        </View >
    );
};

export default SignUpScreen;
