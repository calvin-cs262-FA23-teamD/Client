// LogIn.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from 'react-native';

/* Import style code */
import { stylesMain } from './../styles/styleMain';
import { COLORS } from './../styles/colors';

const LogInScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Add login logic here
        // Check username and password, navigate to the next screen on success, show an error on failure
        // Retrieve user credentials from AsyncStorage
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPassword = await AsyncStorage.getItem('password');

        if (username === storedUsername && password === storedPassword) {
            // Successful login, navigate to the next screen
            navigation.navigate('Trackbuilder');
        } else {
            // Invalid credentials, show an error message
            alert('Invalid credentials. Please try again.');
        }

    };

    return (
        <View style={stylesMain.container, stylesMain.text}>
            <Text>{/*Login Screen*/}</Text>
            <TextInput
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                value={username}
            />
            <TextInput
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
            />
            <TouchableOpacity style={[stylesMain.orangeButton, stylesMain.buttonText]} // Apply the orange color style
                //onPress={handleLogin}
                onPress={() => navigation.navigate('Trackbuilder')}  //Navigates back to the 'Trackbuilder' screen
            >
                <Text style={stylesMain.buttonText}>LOG IN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[stylesMain.orangeButton, stylesMain.buttonText]}
                onPress={() => navigation.navigate('SignUp')}
            >
                <Text style={stylesMain.buttonText}>CREATE AN ACCOUNT</Text>
            </TouchableOpacity>
        </View >
    );   
};

export default LogInScreen;
