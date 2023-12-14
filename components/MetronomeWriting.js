/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/prop-types */
/* Import react components */
import * as React from 'react';
import {
  Text, View, TouchableOpacity,
} from 'react-native';

import { AntDesign } from '@expo/vector-icons';

/* Import style files */
// eslint-disable-next-line import/extensions
import { stylesMain } from '../styles/stylesMain.js';
import { COLORS } from '../styles/colors';

// export AddMeasure
export default function MetronomeWriting({
  isModalVisible, setIsModalVisible,
}) {
  return (
    <View style={{ height: 700, width: '100%' }}>
      <View style={{
        flex: 2, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 15,
      }}
      >
        <Text style={[stylesMain.title, { marginTop: 0 }]}>Metromone Info</Text>
      </View>
      <View style={{ flex: 15, padding: 10, justifyContent: 'center' }}>
        <Text style={[stylesMain.text, { fontSize: 16 }]}>
          {'Tempo and Beats-Per-Measure :\n'}
          {'    Tap on number in middle to manually\n      enter in a new value.\n'}
          {'    Use plus or minus buttons on sides\n      to increase or decrease the value.\n\n'}

          {'Accent Buttons:\n'}
          {'    The number of buttons matches the\n      current value of Beats-Per-Measure.\n'}
          {'    Tap one of the buttons to change the\n      value.\n'}
          {'    The order of values is: accent, normal,\n      and silent.\n\n'}

          {'Sound List:\n'}
          {'    Tap on the sound button to open a\n      pop-up of sound options.\n'}
          {'    To change the sound, tap on one of\n      the other options.\n'}

        </Text>
      </View>

      <View style={{
        flex: 2,
        paddingBottom: 12,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity
            style={[stylesMain.backButton, { backgroundColor: COLORS.orange, width: 50 }]}
            onPress={() => setIsModalVisible(() => !isModalVisible)}
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.background} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}
