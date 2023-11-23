/* eslint-disable react/prop-types */
import * as React from 'react';
import { View, TouchableOpacity } from 'react-native';

// app icons
import { AntDesign } from '@expo/vector-icons';

/* Import style code */
import { stylesMain } from '../styles/styleMain';
import { COLORS } from '../styles/colors';

export default function PausePlayButton({ onPress, pausePlayIcon, width }) {
  return (
    <View style={[stylesMain.subView, { padding: 7 }]}>
      <TouchableOpacity
        style={[
          stylesMain.button,
          { backgroundColor: COLORS.buttonBackground, width, height: width / 3 },
        ]}
        onPress={onPress}
      >
        <AntDesign name={pausePlayIcon} size={24} color={COLORS.orange} />
      </TouchableOpacity>
    </View>
  );
}
