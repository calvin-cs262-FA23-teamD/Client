/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';

/* Import style code */
import { stylesMain } from '../styles/stylesMain';
import { COLORS } from '../styles/colors';

export default function SoundButton({ onPress, w, selectedSound }) {
  return (
    <View style={[stylesMain.subView, { paddingBottom: 40 }]}>
      <View style={stylesMain.boxed}>
        <Text style={[stylesMain.text, { alignSelf: 'center', marginBottom: -5 }]}>Sound:</Text>
        <TouchableOpacity
          style={[stylesMain.flatButton, {
            alignSelf: 'center',
            marginBottom: 10,
            backgroundColor: COLORS.buttonBackground,
            width: w,
          }]}
          onPress={onPress}
        >
          <Text style={stylesMain.text}>
            {selectedSound}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
