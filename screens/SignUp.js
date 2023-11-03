// SignUp.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';

/* Import style code */
import { stylesMain } from './../styles/styleMain';
import { COLORS } from './../styles/colors';

const SignUpScreen = ({ navigation }) => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');

    const handleSignUp = async () => {
        // Store the new user credentials in AsyncStorage
        await AsyncStorage.setItem('username', newUsername);
        await AsyncStorage.setItem('password', newPassword);

        /* Add code here making sure that newPassword 
         * and confirmNewPassword are the same,
         * else fail
         * 
         * 
         */

        // Navigate back to the login screen
        navigation.navigate('LogIn');
    };

    return (
        <View style={backgroundColor = COLORS.offWhite, { marginTop: 50 }}>
            <Text>{/*Create an Account*/}</Text>
            <TextInput
                placeholder="New Username"
                onChangeText={text => setNewUsername(text)}
                value={newUsername}
                style={{
                    textAlign: 'center' // Center the text horizontally
                }}
            />
            <TextInput
                placeholder="New Password"
                onChangeText={text => setNewPassword(text)}
                value={newPassword}
                secureTextEntry
                style={{
                    textAlign: 'center' // Center the text horizontally
                }}
            />
            <TextInput
                placeholder="Confirm New Password"
                onChangeText={text => setConfirmNewPassword(text)}
                value={confirmNewPassword}
                secureTextEntry
                style={{
                    textAlign: 'center' // Center the text horizontally
                }}
            />
            <TouchableOpacity style={[stylesMain.orangeButton, stylesMain.buttonText]}
                //onPress={handleSignUp}
                onPress={() => navigation.navigate('LogIn')}  //Navigates back to the 'LogIn' screen
            >
                <Text style={stylesMain.buttonText}>CREATE AN ACCOUNT</Text>
            </TouchableOpacity>
        </View >
    );
};

export default SignUpScreen;
