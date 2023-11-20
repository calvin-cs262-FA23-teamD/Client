/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* Metronome.js */

import * as React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';

/* Import component files */
import { AntDesign } from '@expo/vector-icons';

/* Import style code */
import { stylesMain } from '../styles/styleMain';
import { COLORS } from '../styles/colors';

const generateButtons = (quantity, buttonStates, toggleButtonState) => {
  // const [buttonStates, setButtonStates] = useState(
  //     Array.from({ length: quantity }, () => 0)
  // );

  // const toggleButtonState = useCallback((index) => {
  //     setButtonStates((prevStates) => {
  //         const newStates = [...prevStates];
  //         newStates[index] = (newStates[index] + 1) % 3; // Cycle through 0, 1, 2
  //         return newStates;
  //     });
  // }, []); // Memoize the function

  const buttons = [];
  const maxButtonsPerRow = 5;
  const buttonSpacing = 15;

  const rows = Math.ceil(quantity / maxButtonsPerRow);
  const buttonsPerRow = Math.ceil(quantity / rows);

  for (let i = 0; i < rows; i++) {
    const rowButtons = [];

    for (let j = 0; j < buttonsPerRow; j++) {
      const buttonNumber = i * buttonsPerRow + j + 1;
      const buttonIndex = i * buttonsPerRow + j;

      if (buttonStates && buttonStates[buttonIndex] !== undefined) {
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
            </TouchableOpacity>,
          );
        }
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
