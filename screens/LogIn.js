/* eslint-disable linebreak-style */
/* eslint-disable no-plusplus */
/* eslint-disable import/named */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable react/prop-types */
// LogIn.js

import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

/* Import style code */
import { stylesMain } from '../styles/stylesMain';
import { COLORS } from '../styles/colors';

function LogInScreen({ navigation }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  // eslint-disable-next-line no-unused-vars
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getUsers = async () => {
    try {
      const response = await fetch('https://beatleservice.azurewebsites.net/allUsers');
      const json = await response.json();
      setData(json);
    } catch (error) {
      // console.error(error);
    } finally {
      setLoading(false);
    }
  };

  let userID;

  // eslint-disable-next-line no-unused-vars
  const handleLogin = async () => {
    // Add login logic here
    // Check username and password, navigate to the next screen on success, show an error on failure

    for (let i = 0; i < data.length; i++) {
      if (username === data[i].username && password === data[i].password) {
        userID = data[i].id;
        // console.log('User: ', userID);
        navigation.navigate('Trackbuilder', { id: userID });
        return;
      }
      // // add back alert (A)
      // alert('Invalid username-password combination');
      // console.log('user not found');
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View style={stylesMain.container}>

      <View style={[stylesMain.header, { flexDirection: 'row', paddingTop: 30 }]}>
        <View style={[stylesMain.subView, { flex: 1 }]} />
        <View style={[stylesMain.header, { flex: 3, height: '100%' }]}>
          <Text style={stylesMain.title}>Log In</Text>
        </View>
        <View style={[stylesMain.subView, { flex: 1 }]} />
      </View>

      <View style={[stylesMain.body, { alignContent: 'flex-start', justifyContent: 'flex-start' }]}>
        <View style={{ flex: 1.5, justifyContent: 'center' }} />

        <View style={{ flex: 6 }}>
          <View style={[stylesMain.subView, {}]}>
            <Text style={stylesMain.text}>Username: </Text>
            <TextInput
              onChangeText={(text) => setUsername(text)}
              value={username}
              defaultValue="username"
              // placeholder="username"
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

            <Text style={stylesMain.text}>Password: </Text>
            <TextInput
              onChangeText={(text) => setPassword(text)}
              value={password}
              defaultValue="password"
              // placeholder="password"
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
            <View style={{ paddingTop: 10, rowGap: 5 }}>
              <TouchableOpacity
                style={[
                  stylesMain.flatButton,
                  {
                    width: 300,
                    alignSelf: 'center',
                    marginBottom: 10,
                    backgroundColor: COLORS.orange,
                  }]}
                onPress={handleLogin}
              // onPress={() => navigation.navigate('Trackbuilder')}
              >
                <Text style={[stylesMain.text, { color: COLORS.background }]}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[stylesMain.flatButton,
                  {
                    width: 300,
                    alignSelf: 'center',
                    marginBottom: 10,
                    backgroundColor: COLORS.orange,
                  }]}
                onPress={() => navigation.navigate('SignUp')}
              >
                <Text style={[stylesMain.text, { color: COLORS.background }]}>
                  Create an Account
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <View style={[stylesMain.footer, {}]}>
        <TouchableOpacity
          style={[stylesMain.backButton, { backgroundColor: COLORS.buttonBackground, width: 50 }]}
          onPress={() => navigation.navigate('Trackbuilder', { id: userID })}
        >
          <AntDesign name="arrowleft" size={24} color={COLORS.offWhite} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default LogInScreen;
