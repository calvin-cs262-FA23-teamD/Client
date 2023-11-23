/* eslint-disable react/prop-types */
/* Metronome.js */

import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useState } from 'react';

/* Import component files */
import AccentButtons from '../components/AccentButtons';

/* Import sound ability */

/* Import style code */
import { stylesMain } from '../styles/styleMain';

/* Main function */
export default function ButtonsScreen({ navigation }) {
  const numberOfButtons = 2;

  const [buttonStates, setButtonStates] = useState(
    Array.from({ length: numberOfButtons }, () => 0), // Set the default state to display numbers
  );

  /* Main app layout */
  return (
    <View style={stylesMain.container}>

      <View style={stylesMain.header}>
        <Text style={stylesMain.title}>Beatle</Text>
      </View>

      <View style={[stylesMain.body, { alignItems: 'center' }]}>
        {/* {generateButtons(numberOfButtons)} */}
        <AccentButtons
          numButtons={numberOfButtons}
          buttonStates={buttonStates}
          setButtonStates={setButtonStates}
        />
      </View>
      <View style={stylesMain.footer}>
        <TouchableOpacity style={[stylesMain.buttons, { width: 300, alignSelf: 'center', marginBottom: 10 }]} onPress={() => navigation.navigate('Trackbuilder')}>
          <Text style={[stylesMain.text, {}]}>Trackbuilder </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
