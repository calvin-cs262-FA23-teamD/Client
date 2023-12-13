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
    <View style={{ height: 500, width: '100%' }}>
      <View style={{
        flex: 2, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20,
      }}
      >
        <Text style={[stylesMain.title, { marginTop: 0 }]}>Metromone Info</Text>
      </View>
      <View style={{ flex: 4, padding: 10, justifyContent: 'center' }}>
        <Text style={stylesMain.text}>Technical writing about metronome</Text>
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
