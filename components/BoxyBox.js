/* eslint-disable object-curly-newline */
/* eslint-disable import/named */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

/* eslint-disable import/no-extraneous-dependencies */
import { View, Text, TouchableOpacity } from 'react-native';

// import from react (new)
import React, { useState, useEffect } from 'react';

// app icons
import { AntDesign } from '@expo/vector-icons';

import { stylesMain } from '../styles/stylesMain';
import { COLORS } from '../styles/colors';

// export BoxyBox
export default function BoxyBox({
  w, h, value, setValue, max = 65, min = 55,
}) {

  // for continuous incrementing/decrementing (new)
  const [incrementing, setIncrementing] = useState(false);
  const [decrementing, setDecrementing] = useState(false);

  // useEffect for continuous press (new)
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

    if (incrementing) {
      interval = setInterval(handleIncrement, 100);
    }

    if (decrementing) {
      interval = setInterval(handleDecrement, 100);
    }

    return () => {
      clearInterval(interval);
    };
  }, [value, max, min, incrementing, decrementing]);

  // when you hold down the button, takes the direction (+/-) (new)
  const handlePressIn = (direction) => {
    if (direction === 'increase' && value < max) {
      setIncrementing(true);
      setDecrementing(false);
    } else if (direction === 'decrease' && value > min) {
      setDecrementing(true);
      setIncrementing(false);
    }
  };

  // as soon as you let go of button (new)
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
            // hold down minus button (new)
            onPressIn={() => handlePressIn('decrease')}
            // release minus button (new)
            onPressOut={handlePressOut}
          >
            <AntDesign name="minus" size={24} color={COLORS.orange} />
          </TouchableOpacity>
        </View>

        <View style={stylesMain.valueText}>
          <Text style={{ color: COLORS.offWhite, fontSize: w / 6 }}>{value.toString()}</Text>
        </View>

        <View style={stylesMain.plusMinusButtons}>
          <TouchableOpacity
            style={[stylesMain.buttonContainer, { width: w / 2.7, height: h }]}
            // on single tap
            onPress={() => changeValue(true)}
            // hold down plus button (new)
            onPressIn={() => handlePressIn('increase')}
            // release plus button (new)
            onPressOut={handlePressOut}
          >
            <AntDesign name="plus" size={24} color={COLORS.orange} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}
