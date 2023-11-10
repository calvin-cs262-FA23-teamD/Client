// LogIn.js

import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

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
        <View style={stylesMain.container}>


            <View style={stylesMain.header}>
                <Text style={stylesMain.title}>Login</Text>
            </View>

            <View style={[stylesMain.body, { alignContent: 'flex-start', justifyContent: 'flex-start', }]}>
                {/* <TextInput
                marginTop={100}
                placeholder="Username"
                placeholderTextColor='#aaa'
                onChangeText={text => setUsername(text)}
                value={username}
                textAlign='center'
            /> */}

                <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 15}}>
                    <Text style={stylesMain.text}>Username: </Text>
                    <TextInput
                        onChangeText={text => setUsername(text)}
                        value={username}
                        defaultValue='username'

                        cursorColor={COLORS.orange}

                        style={{ width: 200 }}
                        backgroundColor={COLORS.background}
                        borderBottomWidth={2}
                        borderBottomColor={COLORS.offWhite}

                        color={COLORS.orange}
                        fontSize={20}
                        fontWeight='bold'
                        textAlign='center'
                    ></TextInput>
                </View>
                {/* 
            <TextInput
                placeholder="Password"
                placeholderTextColor='#aaa'
                onChangeText={text => setPassword(text)}
                value={password}
                textAlign='center'
                secureTextEntry
            /> */}

                <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 15 }}>
                    <Text style={stylesMain.text}>Password: </Text>
                    <TextInput
                        onChangeText={text => setPassword(text)}
                        value={password}
                        defaultValue='password'

                        cursorColor={COLORS.orange}

                        style={{ width: 200 }}
                        backgroundColor={COLORS.background}
                        borderBottomWidth={2}
                        borderBottomColor={COLORS.offWhite}

                        color={COLORS.orange}
                        fontSize={20}
                        fontWeight='bold'
                        textAlign='center'
                    ></TextInput>
                </View>

                <TouchableOpacity style={[stylesMain.orangeButton, stylesMain.buttonText]} // Apply the orange color style
                    onPress={handleLogin}
                //onPress={() => navigation.navigate('Trackbuilder')}  //Navigates back to the 'Trackbuilder' screen
                >
                    <Text style={stylesMain.buttonText}>LOG IN</Text>
                </TouchableOpacity>

                <TouchableOpacity style={[stylesMain.orangeButton, stylesMain.buttonText]}
                    onPress={() => navigation.navigate('SignUp')}
                >
                    <Text style={stylesMain.buttonText}>CREATE AN ACCOUNT</Text>
                </TouchableOpacity>
            </View>

            <View style={stylesMain.footer}>

            </View>
        </View>
    );
};

export default LogInScreen;
