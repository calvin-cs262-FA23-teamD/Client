// LogIn.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

/* Import style code */
import { stylesMain } from './../styles/styleMain';
import { COLORS } from './../styles/colors';

const LogInScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Add your login logic here
        // Check username and password, navigate to the next screen on success, show an error on failure
    };

    return (
        <View style={stylesMain.container}>
            <Text>Login Screen</Text>
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
            <Button title="Log In" onPress={handleLogin} />
        </View>
    );
};

export default LogInScreen;
