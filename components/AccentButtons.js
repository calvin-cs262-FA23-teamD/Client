/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* eslint-disable no-plusplus */
/* Metronome.js */

import * as React from 'react';
import { Text, View, TouchableOpacity } from 'react-native';
import { useCallback, useEffect } from 'react';

/* Import component files */
import { AntDesign } from '@expo/vector-icons';

/* Import style code */
import { stylesMain } from '../styles/stylesMain';
import { COLORS } from '../styles/colors';

const generateButtons = (numButtons, buttonStates, setButtonStates, buttonSize) => {
  // const [buttonStates, setButtonStates] = useState(
  //   Array.from({ length: numButtons }, () => 0), // Set the default state to display numbers
  // );

  const toggleButtonState = useCallback((index) => {
    setButtonStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index] = (newStates[index] + 1) % 3; // Cycle through 0, 1, 2
      return newStates;
    });
  }, []); // Memoize the function

  // Watch for changes in numButtons and update buttonStates
  useEffect(() => {
    setButtonStates(Array(numButtons).fill(0).map((_, index) => (index === 0 ? 1 : 0)));
  }, [numButtons]);

  const buttons = [];
  const maxButtonsPerRow = 6;
  const buttonSpacing = 15;

  const rows = Math.ceil(numButtons / maxButtonsPerRow);
  const buttonsPerRow = Math.ceil(numButtons / rows);

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
            style={[
              j > 0 && { marginLeft: buttonSpacing },
              {
                width: buttonSize,
                height: buttonSize,
                borderRadius: 20,
                backgroundColor: COLORS.orange,
                justifyContent: 'center',
                alignItems: 'center',
              },
            ]}
            onPress={() => toggleButtonState(buttonIndex)}
          >
            {buttonContent}
          </TouchableOpacity>,
        );
      }
    }

    buttons.push(
      // eslint-disable-next-line object-curly-newline
      <View key={i} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginVertical: 10 }}>
        {rowButtons}
      </View>,
    );
  }

  return buttons;
};

// eslint-disable-next-line object-curly-newline
export default function AccentButtons({ numButtons, buttonStates, setButtonStates, buttonSize }) {
  return (
    <View style={[{ alignItems: 'center' }]}>
      {generateButtons(numButtons, buttonStates, setButtonStates, buttonSize)}
    </View>
  );
}
