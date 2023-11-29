/* eslint-disable react/prop-types */
// SignUp.js

import React, { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
} from 'react-native';
import { AsyncStorage } from '@react-native-async-storage/async-storage';

/* Import style code */
// eslint-disable-next-line import/named
import { stylesMain } from '../styles/stylesMain';
// eslint-disable-next-line import/named, no-unused-vars
import { COLORS } from '../styles/colors';

// for back button (new)
import { AntDesign } from '@expo/vector-icons';

// eslint-disable-next-line no-unused-vars
import LogInScreen from './LogIn';

function SignUpScreen({ navigation }) {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [email, setEmail] = useState('');

  const handleSignUp = async () => {
    // Store the new user credentials in AsyncStorage
    // await AsyncStorage.setItem('username', newUsername);
    // await AsyncStorage.setItem('password', newPassword);

    /* Add code here making sure that newPassword
         * and confirmNewPassword are the same,
         * else fail
         *
         *
         */

    if (!newUsername || !newPassword || !confirmNewPassword) {
      alert('Please enter a valid username and password combination.');
    }

    if (!(newPassword === confirmNewPassword)) {
      // Invalid credentials, show an error message
      alert('Your passwords do not match. Please try again.');
    }

    if ((newPassword === confirmNewPassword) && newUsername) {
      /* We're not using AsyncStorage anymore
      // Store the new user credentials in AsyncStorage
      await AsyncStorage.setItem('username', newUsername);
      await AsyncStorage.setItem('password', newPassword);*/

      // Successful sign up, navigate to the next screen
      navigation.navigate('LogIn');
    }

  };

  return (
    <View style={stylesMain.container}>

      <View style={stylesMain.header, { marginTop: 50 }}>
        <Text style={stylesMain.title}>Create New Account</Text>
      </View>

      {/* formatting copied from LogIn.js [new-username] */}
      <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 15 }}>
        <Text style={stylesMain.text}>Username: </Text>
        <TextInput
          onChangeText={(text) => setNewUsername(text)}
          value={newUsername}
          defaultValue="new-username"
          //placeholder="new-username"
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

      {/* formatting copied from LogIn.js [new-password] */}
      <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 15 }}>
        <Text style={stylesMain.text}>Password: </Text>
        <TextInput
          onChangeText={(text) => setNewPassword(text)}
          value={newPassword}
          defaultValue="NULL"
          //placeholder=""
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

      {/* formatting copied from LogIn.js [confirm-new-password] */}
      <View style={{ flexDirection: 'column', alignItems: 'center', paddingTop: 15, paddingBottom: 20 }}>
        <Text style={stylesMain.text}>Confirm Password: </Text>
        <TextInput
          onChangeText={(text) => setConfirmNewPassword(text)}
          value={setConfirmNewPassword}
          defaultValue=""
          //placeholder=""
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
