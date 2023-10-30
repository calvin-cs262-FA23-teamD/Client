// SignUp.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

/* Import style code */
import { stylesMain } from './../styles/styleMain';
import { COLORS } from './../styles/colors';

const SignUpScreen = ({ navigation }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSignUp = () => {
        // Add your sign-up logic here
        // Create a new user account, navigate to the next screen on success, show an error on failure
    };

    return (
        <View style={stylesMain.container}>
            <Text>Sign Up Screen</Text>
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
            <Button title="Sign Up" onPress={handleSignUp} />
        </View>
    );
};

export default SignUpScreen;
