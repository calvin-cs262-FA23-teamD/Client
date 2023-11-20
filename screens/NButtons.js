/* eslint-disable react/prop-types */
/* Metronome.js */

import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';

/* Import component files */
// import { AntDesign } from '@expo/vector-icons';
import AccentButtons from '../components/AccentButtons';

/* Import sound ability */

/* Import style code */
import { stylesMain } from '../styles/styleMain';
// eslint-disable-next-line no-unused-vars
import { COLORS } from '../styles/colors';

/* Main function */
export default function ButtonsScreen({ navigation }) {
  const numberOfButtons = 9;

  /* Main app layout */
  return (
    <View style={stylesMain.container}>

      <View style={stylesMain.header}>
        <Text style={stylesMain.title}>Beatle</Text>
      </View>

      <View style={[stylesMain.body, { alignItems: 'center' }]}>
        {/* {generateButtons(numberOfButtons)} */}
        <AccentButtons numButtons={numberOfButtons} />
      </View>
      <View style={stylesMain.footer}>
        <TouchableOpacity style={[stylesMain.buttons, { width: 300, alignSelf: 'center', marginBottom: 10 }]} onPress={() => navigation.navigate('Trackbuilder')}>
          <Text style={[stylesMain.text, {}]}>Trackbuilder </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
