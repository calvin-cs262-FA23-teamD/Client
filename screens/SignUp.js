/* eslint-disable no-else-return */
/* eslint-disable no-useless-return */
/* eslint-disable no-plusplus */
/* eslint-disable react/prop-types */
// SignUp.js

import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

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
    if (newUsername && newPassword && confirmNewPassword) {
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
    <View style={stylesMain.container}>

      <View style={[stylesMain.header, { marginTop: 50 }]}>
        <Text style={stylesMain.title}>Create New Account</Text>
      </View>

      {/* formatting copied from LogIn.js [new-username] */}
      <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 15 }}>
        <Text style={stylesMain.text}>Username: </Text>
        <TextInput
          onChangeText={(text) => setNewUsername(text)}
          value={newUsername}
          defaultValue="new-username"
          // placeholder="new-username"
          // placeholderTextColor='#aaa'
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

      {/* formatting copied from LogIn.js [new-password] */}
      <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 15 }}>
        <Text style={stylesMain.text}>Password: </Text>
        <TextInput
          onChangeText={(text) => setNewPassword(text)}
          value={newPassword}
          defaultValue="NULL"
          // placeholder=""
          // placeholderTextColor='#aaa'
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

      {/* formatting copied from LogIn.js [confirm-new-password] */}
      <View style={{
        flexDirection: 'column', alignItems: 'center', paddingTop: 15, paddingBottom: 20,
      }}
      >
        <Text style={stylesMain.text}>Confirm Password: </Text>
        <TextInput
          onChangeText={(text) => setConfirmNewPassword(text)}
          value={setConfirmNewPassword}
          defaultValue=""
          // placeholder=""
          // placeholderTextColor='#aaa'
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
        style={[stylesMain.orangeButton, stylesMain.buttonText]}
        onPress={handleSignUp}
      >
        <Text style={stylesMain.buttonText}>CREATE AN ACCOUNT</Text>
      </TouchableOpacity>

      {/* Copied from AddMeasure.js */}
      <View style={{ flex: 1, alignItems: 'flex-start', marginTop: 300 }}>
        <TouchableOpacity
          style={[stylesMain.buttons, { backgroundColor: COLORS.orange, width: 50 }]}
          onPress={() => navigation.navigate('LogIn')}
        >
          <AntDesign name="arrowleft" size={24} color={COLORS.background} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignUpScreen;
