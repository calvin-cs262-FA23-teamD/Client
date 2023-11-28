/* eslint-disable import/extensions */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* Import react components */
import * as React from 'react';
import {
  Text, View, TouchableOpacity, TextInput,
} from 'react-native';
import { useState } from 'react';

import { AntDesign } from '@expo/vector-icons';

/* Import style files */
// eslint-disable-next-line import/extensions
import { stylesMain } from '../styles/stylesMain.js';
import { COLORS } from '../styles/colors';

/* Import components */
import Counters from './Counters.js';

// export AddMeasure
export default function AddMeasure({
  newMeasureNum, setNewMeasureNum,
  newTempo, setNewTempo,
  newBeat, setNewBeat,
  isModalVisible, setIsModalVisible,
  handleModal,
}) {
  const [buttonStates, setButtonStates] = useState(
    Array.from({ length: newBeat }, () => 0), // Set the default state to display numbers
  );

  return (
    <View style={{ height: 600, width: '100%' }}>
      <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[stylesMain.title, { marginTop: 0 }]}>Add Measure</Text>
      </View>
      <View style={{ flex: 4, padding: 10, justifyContent: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text style={stylesMain.text}>Measure Num: </Text>
          <TextInput
            onChangeText={(text) => setNewMeasureNum(text)}
            value={newMeasureNum}
            defaultValue="60"
            keyboardType="numeric"
            cursorColor={COLORS.orange}
            style={{ width: 50 }}
            backgroundColor={COLORS.buttonBackground}
            borderBottomWidth={2}
            borderBottomColor={COLORS.offWhite}
            color={COLORS.orange}
            fontSize={20}
            fontWeight="bold"
            textAlign="center"
          />
        </View>

        <Counters
          width={200}
          beat={newBeat} setBeat={setNewBeat}
          BPM={newTempo} setBPM={setNewTempo}
          buttonStates={buttonStates} setButtonStates={setButtonStates}
        />
      </View>
      <View style={{
        flex: 2,
        paddingBottom: 12,
        alignItems: 'center',
        justifyContent: 'flex-end',
        flexDirection: 'row',
      }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity
            style={[stylesMain.buttons, { backgroundColor: COLORS.orange, width: 50 }]}
            onPress={() => setIsModalVisible(() => !isModalVisible)}
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.background} />
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity
            style={[stylesMain.buttons, { backgroundColor: COLORS.orange }]}
            onPress={handleModal}
          >
            <Text style={[stylesMain.text, { color: COLORS.background }]}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
