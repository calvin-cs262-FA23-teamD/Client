/* eslint-disable import/named */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable react/prop-types */
// LogIn.js

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
} from 'react-native';
// import { AsyncStorage } from '@react-native-async-storage/async-storage';

// for back button (new)
import { AntDesign } from '@expo/vector-icons';

/* Import style code */
import { stylesMain } from '../styles/stylesMain';
import { COLORS } from '../styles/colors';

function LogInScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line no-unused-vars
  /*const handleLogin = async () => {
    // Add login logic here
    // Check username and password, navigate to the next screen on success, show an error on failure
    // Retrieve user credentials from AsyncStorage
    // const storedUsername = await AsyncStorage.getItem('username');
    // const storedPassword = await AsyncStorage.getItem('password');

    // if (username === storedUsername && password === storedPassword) {
    //     // Successful login, navigate to the next screen
    //     navigation.navigate('Trackbuilder');
    // } else {
    //     // Invalid credentials, show an error message
    //     alert('Invalid credentials. Please try again.');
    // }
  };*/

  // why is this not working????
  const handleLogin = async () => {
    try {
      const response = await fetch('https://beatleservice.azurewebsites.net', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      // Check if username is present in the records
      const record = data.find((theUser) => theUser.username === username);

      // if username exists, does password match?
      if (record) {
        if (record.password === password) {
          navigation.navigate('Trackbuilder');
        } else {
          alert('Invalid credentials. Please try again.');
        }
      } else {
        // no username found
        alert('There is no user with that username. Please try again.');
      }
    } catch (error) {
      console.error(error);
      alert('Uh oh, something went wrong.');
    }
  };

  return (
    <View style={stylesMain.container}>

      <View style={stylesMain.header}>
        <Text style={stylesMain.title}>Log In</Text>
      </View>

      <View style={[stylesMain.body, { alignContent: 'flex-start', justifyContent: 'flex-start', gap: 12 }]}>

        <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 15 }}>
          <Text style={stylesMain.text}>Username: </Text>
          <TextInput
            onChangeText={(text) => setUsername(text)}
            value={username}
            defaultValue="username"
            //placeholder="username"
            //placeholderTextColor='#aaa'

            cursorColor={COLORS.orange}

            style={{ width: 200 }}
            backgroundColor={COLORS.background}
            borderBottomWidth={2}
            borderBottomColor={COLORS.offWhite}

            color={COLORS.orange}
            fontSize={20}
            fontWeight="bold"
            textAlign="center"
          />
        </View>

        <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 15 }}>
          <Text style={stylesMain.text}>Password: </Text>
          <TextInput
            onChangeText={(text) => setPassword(text)}
            value={password}
            defaultValue="password"
            //placeholder="password"
            //placeholderTextColor='#aaa'
            secureTextEntry

            cursorColor={COLORS.orange}

            style={{ width: 200 }}
            backgroundColor={COLORS.background}
            borderBottomWidth={2}
            borderBottomColor={COLORS.offWhite}

            color={COLORS.orange}
            fontSize={20}
            fontWeight="bold"
            textAlign="center"
          />
        </View>

        <TouchableOpacity
          style={[stylesMain.orangeButton, stylesMain.buttonText]} // Apply the orange color style
          // onPress={handleLogin}
          onPress={() => navigation.navigate('Trackbuilder')}
        >
          <Text style={stylesMain.buttonText}>LOG IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[stylesMain.orangeButton, stylesMain.buttonText]}
          onPress={() => navigation.navigate('SignUp')}
        >
          <Text style={stylesMain.buttonText}>CREATE AN ACCOUNT</Text>
        </TouchableOpacity>
      </View>

      <View style={stylesMain.footer} />

      {/* Copied from AddMeasure.js */}
      <View style={{ flex: 1, alignItems: 'flex-start' }}>
        <TouchableOpacity
          style={[stylesMain.buttons, { backgroundColor: COLORS.orange, width: 50 }]}
          onPress={() => navigation.navigate('Trackbuilder')}
        >
          <AntDesign name="arrowleft" size={24} color={COLORS.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LogInScreen;
