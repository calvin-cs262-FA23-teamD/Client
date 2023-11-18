/* eslint-disable import/named */
/* eslint-disable react/react-in-jsx-scope */
/* eslint-disable react/prop-types */

/* eslint-disable import/no-extraneous-dependencies */
import { View, Text } from 'react-native';

import Button from './Button';

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
      width: w, height: h, flexDirection: 'row', alignItems: 'center',
    }]}
    >
      <View style={stylesMain.plusMinusButtons}>
        <Button image="minus" w={w / 2.7} h={h} onPress={() => changeValue(false)} />
      </View>
      <View style={stylesMain.valueText}>
        <Text style={{ color: COLORS.offWhite, fontSize: w / 6 }}>{value.toString()}</Text>
      </View>
      <View style={stylesMain.plusMinusButtons}>
        <Button image="plus" w={w / 2.7} h={h} onPress={() => changeValue(true)} />
      </View>
    </View>
  );
}
