/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable import/named */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

/* eslint-disable import/no-extraneous-dependencies */
import { View, TouchableOpacity, TextInput } from 'react-native';

// import from react
import React, { useState, useEffect } from 'react';

// app icons
import { AntDesign } from '@expo/vector-icons';

import { stylesMain } from '../styles/stylesMain';
import { COLORS } from '../styles/colors';

// export BoxyBox
export default function BoxyBox({
  w, h, value, setValue, max = 65, min = 55,
}) {
  // for continuous incrementing/decrementing
  const [incrementing, setIncrementing] = useState(false);
  const [decrementing, setDecrementing] = useState(false);

  // useEffect for continuous press
  useEffect(() => {
    let interval;

    const handleIncrement = () => {
      if (value < max) {
        setValue((prevValue) => prevValue + 1);
      }
    };

    const handleDecrement = () => {
      if (value > min) {
        setValue((prevValue) => prevValue - 1);
      }
    };

    // Clear the interval when incrementing or decrementing becomes false (new)
    const clearIntervalIfNecessary = () => {
      if (!incrementing && !decrementing) {
        clearInterval(interval);
      }
    };

    if (incrementing) {
      // interval = setInterval(handleIncrement, 100);
      // new way to handle, calls clearInterval after every inc/dec (new)
      interval = setInterval(() => {
        handleIncrement();
        clearIntervalIfNecessary();
      }, 50);
    }

    if (decrementing) {
      // interval = setInterval(handleDecrement, 100);
      // new way to handle, calls clearInterval after every inc/dec (new)
      interval = setInterval(() => {
        handleDecrement();
        clearIntervalIfNecessary();
      }, 50);
    }

    return () => {
      clearInterval(interval);
    };
  }, [value, max, min, incrementing, decrementing]);

  // when you hold down the button, takes the direction (+/-)
  const handlePressIn = (direction) => {
    if (direction === 'increase' && value < max) {
      setIncrementing(true);
      setDecrementing(false);
    } else if (direction === 'decrease' && value > min) {
      setDecrementing(true);
      setIncrementing(false);
    }
  };

  // as soon as you let go of button
  const handlePressOut = () => {
    setIncrementing(false);
    setDecrementing(false);
  };

  // this function will add or subtract 1 to the current value
  // normal single tap, keep this
  const changeValue = (direction) => {
    if (direction === true && value < max) {
      setValue(value + 1);
    } else if (direction === false && value > min) {
      setValue(value - 1);
    }
  };
  // this function will reset the current value to what the user enters
  const updateValue = (newValue) => {
    if (newValue >= max) {
      // fixed the bug that allowed numbers like 2006 (A)
      setValue(max.toString());
    } else if (newValue <= min) {
      // there is still a bug that allows numbers too low (A)
      // console.log('error, value too low');
      setValue(min);
    } else {
      setValue(Math.floor(newValue));
    }
  };

  return (
    <View style={[stylesMain.boxyBoxes, {
    }]}
    >
      {/* <Text style={[stylesMain.text, { alignSelf: 'center' }]}>Tempo</Text> */}
      <View style={{ width: w, height: h, alignItems: 'center', flexDirection: 'row' }}>

        <View style={stylesMain.plusMinusButtons}>
          <TouchableOpacity
            style={[stylesMain.buttonContainer, { width: w / 2.7, height: h }]}
            // on single tap
            onPress={() => changeValue(false)}
            // hold down minus button
            onPressIn={() => handlePressIn('decrease')}
            // release minus button
            onPressOut={handlePressOut}
          >
            <AntDesign name="minus" size={24} color={COLORS.orange} />
          </TouchableOpacity>
        </View>

        <View style={stylesMain.valueText}>
          {/* BUG!!! if you enter too low a value, it will update correctly,
          but the text will not display the right value */}
          <TextInput
            onChangeText={(text) => updateValue(text)}
            value={value}
            defaultValue={value.toString()}
            keyboardType="numeric"
            cursorColor={COLORS.orange}
            style={{ width: w / 3 }}
            backgroundColor={COLORS.buttonBackground}
            color={COLORS.offWhite}
            fontSize={w / 6}
            textAlign="center"
          />
        </View>

        <View style={stylesMain.plusMinusButtons}>
          <TouchableOpacity
            style={[stylesMain.buttonContainer, { width: w / 2.7, height: h }]}
            // on single tap
            onPress={() => changeValue(true)}
            // hold down plus button
            onPressIn={() => handlePressIn('increase')}
            // release plus button
            onPressOut={handlePressOut}
          >
            <AntDesign name="plus" size={24} color={COLORS.orange} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
