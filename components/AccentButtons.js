/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* Metronome.js */

import * as React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import { useState, useCallback, useEffect } from 'react';

/* Import component files */
import { AntDesign } from '@expo/vector-icons';

/* Import style code */
import { stylesMain } from '../styles/styleMain';
import { COLORS } from '../styles/colors';

const generateButtons = (numButtons) => {
  const [buttonStates, setButtonStates] = useState(
    Array.from({ length: numButtons }, () => 0), // Set the default state to display numbers
  );
  {/* I need to make it so that whenever you change the number of beats, you remake the buttons*/ }

  const toggleButtonState = useCallback((index) => {
    setButtonStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = (newStates[index] + 1) % 3; // Cycle through 0, 1, 2
      return newStates;
    });
  }, []); // Memoize the function

  console.log('quantity:', numButtons);
  console.log('buttonStates:', buttonStates);
  console.log('toggleButtonState:', toggleButtonState);

  const buttons = [];
  const maxButtonsPerRow = 6;
  const buttonSpacing = 15;

  const rows = Math.ceil(numButtons / maxButtonsPerRow);
  const buttonsPerRow = Math.ceil(numButtons / rows);

  // Watch for changes in numButtons and update buttonStates
  useEffect(() => {
    setButtonStates(Array(numButtons).fill(0));
  }, [numButtons]);

  for (let i = 0; i < rows; i++) {
    const rowButtons = [];

    for (let j = 0; j < buttonsPerRow; j++) {
      const buttonNumber = i * buttonsPerRow + j + 1;
      const buttonIndex = i * buttonsPerRow + j;

      if (buttonNumber <= numButtons) {
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
          </TouchableOpacity>,
        );
      }
    }

    buttons.push(
      <View key={i} style={styles.row}>
        {rowButtons}
      </View>,
    );
  }


  return buttons;
};

export default function AccentButtons({ numButtons }) {
  return (
    <View style={[{ alignItems: 'center' }]}>
      {generateButtons(numButtons)}
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
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.orange,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
