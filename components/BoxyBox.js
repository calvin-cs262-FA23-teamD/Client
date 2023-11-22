/* eslint-disable object-curly-newline */
/* eslint-disable import/named */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

/* eslint-disable import/no-extraneous-dependencies */
import { View, Text, TouchableOpacity } from 'react-native';

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
