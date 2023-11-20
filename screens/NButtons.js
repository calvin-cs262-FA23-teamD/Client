/* Metronome.js */

import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useRef, useEffect, useCallback } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';  // dropdown list for selecting sound

/* Import component files */
import Button from './../components/Button';
import BoxyBox from './../components/BoxyBox';
import AccentButtons from './../components/AccentButtons';

/* Import sound ability */
import { Audio } from 'expo-av';

/* Import style code */
import { stylesMain } from './../styles/styleMain';
import { COLORS } from './../styles/colors';
import { AntDesign } from '@expo/vector-icons';

/* Main function */
export default function ButtonsScreen({ navigation }) {
  const numberOfButtons = 9

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
