/*import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const LogInScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async () => {
        // Retrieve user credentials from AsyncStorage
        const storedUsername = await AsyncStorage.getItem('username');
        const storedPassword = await AsyncStorage.getItem('password');

        if (username === storedUsername && password === storedPassword) {
            // Successful login, navigate to the next screen
            navigation.navigate('Home');
        } else {
            // Invalid credentials, show an error message
            alert('Invalid credentials. Please try again.');
        }
    };

    return (
        <View style={stylesMain.container}>
            {/*<Text>Login Screen</Text>*}
            <TextInput
                placeholder="Username"
                onChangeText={text => setUsername(text)}
                value={username}
                style={{
                    textAlign: 'center' // Center the text horizontally
                }}
            />

            <TextInput
                placeholder="Password"
                onChangeText={text => setPassword(text)}
                value={password}
                secureTextEntry
                style={{
                    textAlign: 'center' // Center the text horizontally
                }}
            />
            <TouchableOpacity style={[stylesMain.orangeButton, stylesMain.buttonText]} // Apply the orange color style
                onPress={handleLogin}
                onPress={() => navigation.navigate('Home')} // Navigates back to the 'Login' screen
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
};* /