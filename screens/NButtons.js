/* eslint-disable react/prop-types */
/* Metronome.js */

import * as React from 'react';
import {
  Text, View, TouchableOpacity, FlatList, ActivityIndicator,
} from 'react-native';
import { useState, useEffect } from 'react';

/* Import sound ability */

/* Import style code */
import { stylesMain } from '../styles/stylesMain';

/* Main function */
export default function ButtonsScreen({ navigation }) {
  // recieve information about players from database
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

  const newUser = {
    username: 'fre',
    password: 'password',
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

  const userID = 20;
  const deleteUser = async (userId) => {
    try {
      const response = await fetch(`https://beatleservice.azurewebsites.net/delUser/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as needed
        },
      });
      if (response.ok) {
        console.log('User deleted successfully');
      } else {
        console.error('Failed to delete user:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
      // Handle the error or update the UI as needed
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  /* Main app layout */
  return (
    <View style={stylesMain.container}>

      <View style={stylesMain.header}>
        <Text style={stylesMain.title}>Temporary playground of choas</Text>
      </View>

      <View style={[stylesMain.body, { alignItems: 'center' }]}>
        {/* {generateButtons(numberOfButtons)} */}

        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }) => id.toString()}
            renderItem={(item) => (
              <View style={stylesMain.container}>
                <TouchableOpacity onPress={() => navigation.navigate('Details', item.item)}>
                  <Text style={stylesMain.title}>{item.item.id}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
        <View styles={{ padding: 50 }}>
          <TouchableOpacity onPress={() => createUser(newUser)} style={[stylesMain.buttons, { width: 300, alignSelf: 'center', marginBottom: 10 }]}>
            <Text style={stylesMain.title}>hello</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => deleteUser(userID)} style={[stylesMain.buttons, { width: 300, alignSelf: 'center', marginBottom: 10 }]}>
            <Text style={stylesMain.title}>goodbye</Text>
          </TouchableOpacity>
        </View>

      </View>
      <View style={stylesMain.footer}>
        <TouchableOpacity style={[stylesMain.buttons, { width: 300, alignSelf: 'center', marginBottom: 10 }]} onPress={() => { navigation.navigate('Trackbuilder'); }}>
          <Text style={[stylesMain.text, {}]}>Trackbuilder </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
