/* eslint-disable object-curly-newline */
/* eslint-disable import/named */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

/* eslint-disable import/no-extraneous-dependencies */
/*import { View, Text } from 'react-native';

// app icons
import { AntDesign } from '@expo/vector-icons';

import { stylesMain } from '../styles/styleMain';
import { COLORS } from '../styles/colors';

export default function BoxyBox({
  w, h, value, setValue, max = 65, min = 55,
}) {
  // hooks

  // this function will add or subtract 1 to the current value
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
            onPress={() => changeValue(false)}
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
            onPress={() => changeValue(true)}
          >
            <AntDesign name="plus" size={24} color={COLORS.orange} />
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

*/

import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

import { stylesMain } from '../styles/styleMain';
import { COLORS } from '../styles/colors';

// app icons
import { AntDesign } from '@expo/vector-icons';

export default function BoxyBox({
  w, h, value, setValue, max = 65, min = 55,
}) {
  const [incrementing, setIncrementing] = useState(false);
  const [decrementing, setDecrementing] = useState(false);

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

  const handlePressIn = (direction) => {
    if (direction === 'increase') {
      setIncrementing(true);
      setDecrementing(false);
    } else if (direction === 'decrease') {
      setDecrementing(true);
      setIncrementing(false);
    }
  };

  const handlePressOut = () => {
    setIncrementing(false);
    setDecrementing(false);
  };

  return (
    <View style={[stylesMain.boxyBoxes, { width: w, height: h, flexDirection: 'row', alignItems: 'center' }]}>
      <View style={stylesMain.plusMinusButtons}>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPressIn={() => handlePressIn('decrease')}
          onPressOut={handlePressOut}
        >
          {/* Trying to use minus from app icons (see import statements above) */}
          <AntDesign name="minus" size={w / 10} color={COLORS.orange} />
        </TouchableOpacity >
      </View >
      <View style={stylesMain.valueText}>
        <Text style={{ color: COLORS.offWhite, fontSize: w / 6 }}>{value.toString()}</Text>
      </View>
      <View style={stylesMain.plusMinusButtons}>
        <TouchableOpacity
          style={{ padding: 10 }}
          onPressIn={() => handlePressIn('increase')}
          onPressOut={handlePressOut}
        >
          {/* Trying to use plus from app icons (see import statements above) */}
          <AntDesign name="plus" size={w / 10} color={COLORS.orange} />
        </TouchableOpacity>
      </View>
    </View >
  );
}
