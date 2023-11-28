/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* Import react components */
import * as React from 'react';
import {
  Text, View, TouchableOpacity, TextInput,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';

/* Import style files */
// eslint-disable-next-line import/extensions
import { stylesMain } from '../styles/stylesMain.js';
import { COLORS } from '../styles/colors';

// export AddMeasure
export default function AddMeasure({
  newMeasureNum, setNewMeasureNum,
  newTempo, setNewTempo,
  newBeat, setNewBeat,
  isModalVisible, setIsModalVisible,
  handleModal,
}) {
  return (
    <View style={{ height: 250 }}>
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
        <View style={{ flexDirection: 'row' }}>
          <Text style={stylesMain.text}>Tempo: </Text>
          <TextInput
            onChangeText={(text) => setNewTempo(text)}
            value={newTempo}
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
        <View style={{ flexDirection: 'row' }}>
          <Text style={stylesMain.text}>Beat: </Text>
          <TextInput
            onChangeText={(text) => setNewBeat(text)}
            value={newBeat}
            defaultValue="4"
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
