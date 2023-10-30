/*import * as React from 'react';
import { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const SignUpScreen = ({ navigation }) => {
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');

  const handleCreateAccount = async () => {
    // Store the new user credentials in AsyncStorage
    await AsyncStorage.setItem('username', newUsername);
    await AsyncStorage.setItem('password', newPassword);

    /* Add code here making sure that newPassword 
     * and confirmNewPassword are the same,
     * else fail
     * 
     * 
     *

    // Navigate back to the login screen
    navigation.navigate('Login');
  };

  return (
    <View style={stylesMain.container}>
      <Text>Create an Account</Text>
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
        onPress={handleCreateAccount}
        onPress={() => navigation.navigate('Login')} // Navigates back to the 'Login' screen
      >
        <Text style={stylesMain.buttonText}>CREATE AN ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  );
};*/