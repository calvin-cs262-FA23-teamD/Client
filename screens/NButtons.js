/* Metronome.js */

import * as React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useState, useRef, useEffect, useCallback } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';  // dropdown list for selecting sound

/* Import component files */
import Button from './../components/Button';
import BoxyBox from './../components/BoxyBox';

/* Import sound ability */
import { Audio } from 'expo-av';

/* Import style code */
import { stylesMain } from './../styles/styleMain';
import { COLORS } from './../styles/colors';
import { AntDesign } from '@expo/vector-icons';

const generateButtons = (quantity) => {
  const [buttonStates, setButtonStates] = useState(
    Array.from({ length: quantity }, () => 0)
  );

  const toggleButtonState = useCallback((index) => {
    setButtonStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = (newStates[index] + 1) % 3; // Cycle through 0, 1, 2
      return newStates;
    });
  }, []); // Memoize the function


  const buttons = [];
  const maxButtonsPerRow = 6;
  const buttonSpacing = 15;

  const rows = Math.ceil(quantity / maxButtonsPerRow);
  const buttonsPerRow = Math.ceil(quantity / rows);

  for (let i = 0; i < rows; i++) {
    const rowButtons = [];

    for (let j = 0; j < buttonsPerRow; j++) {
      const buttonNumber = i * buttonsPerRow + j + 1;
      const buttonIndex = i * buttonsPerRow + j;

      if (buttonNumber <= quantity) {
        let buttonContent;

        switch (buttonStates[buttonIndex]) {
          case 0:
            buttonContent = (
              <Text style={[stylesMain.text, { color: COLORS.background }]}>
                {buttonNumber}
              </Text>
            );
            break;
          case 1:
            buttonContent = (
              <AntDesign name="up" size={24} color={COLORS.background} />
            );
            break;
          case 2:
            
            buttonContent = null;
            break;
          default:
            buttonContent = (
              <Text style={[stylesMain.text, { color: COLORS.background }]}>
                {buttonNumber}
              </Text>
            );
        }

        rowButtons.push(
          <TouchableOpacity
            key={buttonNumber}
            style={[styles.button, j > 0 && { marginLeft: buttonSpacing }]}
            onPress={() => toggleButtonState(buttonIndex)}
          >
            {buttonContent}
          </TouchableOpacity>
        );
      }
    }

    buttons.push(
      <View key={i} style={styles.row}>
        {rowButtons}
      </View>
    );
  }

  return buttons;
};

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
        {generateButtons(numberOfButtons)}
      </View>
      <View style={stylesMain.footer}>
        <TouchableOpacity style={[stylesMain.buttons, { width: 300, alignSelf: 'center', marginBottom: 10 }]} onPress={() => navigation.navigate('Trackbuilder')}>
          <Text style={[stylesMain.text, {}]}>Trackbuilder </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'space-between',
    marginVertical: 10,
  },
  button: {
    width: 50,
    height: 50,
    borderRadius: 20,
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
});