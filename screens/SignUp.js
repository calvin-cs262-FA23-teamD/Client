/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
// SignUp.js

import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
} from 'react-native';

/* Import style code */
// eslint-disable-next-line import/named
import { stylesMain } from '../styles/stylesMain';
// eslint-disable-next-line import/named, no-unused-vars
import { COLORS } from '../styles/colors';

// eslint-disable-next-line no-unused-vars
import LogInScreen from './LogIn';

function SignUpScreen({ navigation }) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  // const [email, setEmail] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getUsers = async () => {
    try {
      const response = await fetch('https://beatleservice.azurewebsites.net/allUsers');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (newUserData) => {
    try {
      const response = await fetch('https://beatleservice.azurewebsites.net/makeUser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as needed
        },
        body: JSON.stringify(newUserData),
      });

      const json = await response.json();

      // Handle the response or update the UI as needed
      console.log('User created:', json);
    } catch (error) {
      console.error('Error creating user:', error);

      // Handle the error or update the UI as needed
    }
  };

  const handleSignUp = async () => {
    // Store the new user credentials in AsyncStorage
    // await AsyncStorage.setItem('username', newUsername);
    // await AsyncStorage.setItem('password', newPassword);

    if (newUsername !== '' && newPassword !== '' && confirmNewPassword !== '') {
      if (newPassword === confirmNewPassword) {
        for (let i = 0; i < data.length; i++) {
          if (newUsername === data[i].username) {
            // user already exists, show an error message
            alert('This username already exists. Please Enter a different username');
            return;
          }
        }
        const newUser = {
          username: newUsername,
          password: newPassword,
        };
        createUser(newUser);
        navigation.navigate('Trackbuilder');
      } else {
        // invalid password, show an error message
        alert('Your passwords do not match. Please try again.');
        return;
      }
    } else {
      // did not enter username and password, show an error message
      alert('You must enter your username and password');
      return;
    }

    // Navigate back to the login screen
    // navigation.navigate('LogIn');
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={{ backgroundColor: '#1f2e2e', marginTop: 50, flex: 1 }}>
      {/* <TextInput
        marginTop={100}
        placeholder="Email"
        placeholderTextColor="#aaa"
        onChangeText={(text) => setEmail(text)}
        value={email}
        style={{
          textAlign: 'center', // Center the text horizontally
        }}
      /> */}
      <TextInput
        placeholder="New Username"
        placeholderTextColor="#aaa"
        onChangeText={(text) => setNewUsername(text)}
        value={newUsername}
        style={{
          textAlign: 'center', // Center the text horizontally
        }}
      />
      <TextInput
        placeholder="New Password"
        placeholderTextColor="#aaa"
        onChangeText={(text) => setNewPassword(text)}
        value={newPassword}
        secureTextEntry
        style={{
          textAlign: 'center', // Center the text horizontally
        }}
      />
      <TextInput
        placeholder="Confirm New Password"
        placeholderTextColor="#aaa"
        onChangeText={(text) => setConfirmNewPassword(text)}
        value={confirmNewPassword}
        secureTextEntry
        style={{
          textAlign: 'center', // Center the text horizontally
        }}
      />
      <TouchableOpacity
        style={[stylesMain.orangeButton, stylesMain.buttonText]}
        onPress={handleSignUp}
      >
        <Text style={stylesMain.buttonText}>CREATE AN ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  );
}

export default SignUpScreen;
