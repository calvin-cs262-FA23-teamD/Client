/* Trackbuilder.js */

import * as React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Button from './../components/Button';

import { stylesMain } from './../styles/styleMain';
import { COLORS } from './../styles/colors';

//import Modal from "react-native-modal";
import { Modal } from "../components/MeasureModal"

{/* hard coded click track */}
const measures = [
  {
    number: 1,
    tempo: 168,
    beat: 3,
  },
  {
    number: 2,
    tempo: 168,
    beat: 2,
  },
  {
    number: 3,
    tempo: 168,
    beat: 2,
  },
  {
    number: 4,
    tempo: 168,
    beat: 3,
  },
  {
    number: 5,
    tempo: 168,
    beat: 2,
  },
  {
    number: 6,
    tempo: 168,
    beat: 2,
  },
  {
    number: 7,
    tempo: 168,
    beat: 3,
  },
  {
    number: 8,
    tempo: 168,
    beat: 3,
  },
  {
    number: 9,
    tempo: 168,
    beat: 3,
  },
  {
    number: 10,
    tempo: 168,
    beat: 3,
  },
  {
    number: 11,
    tempo: 168,
    beat: 2,
  },
  {
    number: 12,
    tempo: 168,
    beat: 2,
  },
];

{/* The orange squares in the flatlist, each representing a measure */}
const MeasureBox = ({ measure, onPress, MeasureBoxColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.measureBox, { backgroundColor: MeasureBoxColor, }]}>
    <View style={[ { flexDirection: 'column', flex: 1, width: 150, }]}>
      {/*measure number */}
      <View style={[{flex: 1, alignItems: 'flex-start', justifyContent: 'center', paddingHorizontal: 15}]}>
        <Text style={[stylesMain.text, { color: textColor, fontSize: 20 }]}>{measure.number}</Text>
      </View>

      {/*Beats per measure */}
      <View style={[ { flex: 2, alignItems: 'center', justifyContent: 'center',}]}>
        <Text style={[stylesMain.text, { color: textColor, fontSize: 50 }]}>{measure.beat}</Text>
      </View>

      {/*Beats per minute */}
      <View style={{flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 15}}>
        <Text style={[stylesMain.text, { color: textColor, fontSize: 20 }]}>{measure.tempo}</Text>
      </View>

    </View>
  </TouchableOpacity>
);

export default function TrackbuilderScreen({ navigation }) {
  const [selectedMeasure, setSelectedMeasure] = useState();
  const [selectedBeat, setSelectedBeat] = useState();
  const [selectedTempo, setSelectedTempo] = useState();

  //displaying a measure from the flatlist
  const renderMeasure = ({ item }) => {
    const MeasureBoxColor = item.number === selectedMeasure ? '#a23600' : '#ff6900';
    const color = item.number === selectedMeasure ? '#f0f5f5' : '#0a0e0f';

    return (
      <MeasureBox
        measure={item}
        onPress={() => selectMeasure(item)}
        MeasureBoxColor={MeasureBoxColor}
        textColor={color}
        styles={styles.measure}
      />
    );
  };

  // selecting a measure from the flatlist
  const selectMeasure = (item) => {
    if (selectedMeasure == item.number) {
      setSelectedMeasure(null);
      setSelectedBeat(null);
      setSelectedTempo(null);
    } else {
      setSelectedMeasure(item.number);
      setSelectedBeat(item.beat);
      setSelectedTempo(item.tempo);
    }
  }

  // hooks for handling adding a new measure
  const [newMeasureNum, setNewMeasureNum] = useState('');
  const [newTempo, setNewTempo] = useState('');
  const [newBeat, setNewBeat] = useState('');

  //handle the popup screen for adding a new measure
  [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => {
    if (isModalVisible) {
      addMeasure();
    }
    setIsModalVisible(() => !isModalVisible);
  }

  // insert a new measure into the list of measures
  const addMeasure = () => {
    if (newTempo != "" && newBeat != "" && newMeasureNum != "") {
      const newMeasure = {
        //number: 2,  // Set the number to match its index + 1
        number: newMeasureNum,
        tempo: newTempo,
        beat: newBeat,
      };

      // Insert the new measure as the third element in the array
      measures.splice(newMeasureNum-1, 0, newMeasure);
      //console.log(measures);

      // Update the 'number' property of each other object
      for (let i = 0; i < measures.length; i++) {
        measures[i].number = i + 1;
      }
    }
  }

  const [deleteVisible, setDeleteVisible] = useState(false)
  // delete selected measure from list of measures
  const deleteMeasure = () => {
    measures.splice(selectedMeasure - 1, 1);

    // Update the 'number' property of the remaining measures
    for (let i = 0; i < measures.length; i++) {
      measures[i].number = i + 1;
    }
  }

  return (
    <View style={stylesMain.container}>


      <View style={stylesMain.header}>
        <Text style={stylesMain.title}>Create Click Track</Text>
      </View>

      <View style={[stylesMain.body, { alignContent: 'flex-start' }]}>
        <View style={{ flex: 3, width: '100%' }}>
          <View style={{ flex: 2, justifyContent: 'space-evenly' }}>
            <Text style={stylesMain.text}>Measure Num: {selectedMeasure}</Text>
            <Text style={stylesMain.text}>Tempo: {selectedTempo}</Text>
            <Text style={stylesMain.text}>Beats: {selectedBeat}</Text>
          </View>
        </View>

        <View style={{ paddingBottom: 10, alignItems: 'flex-end' }}>
          <TouchableOpacity style={stylesMain.buttons} onPress={handleModal}>
            <Text style={[stylesMain.text]}>Add </Text>
          </TouchableOpacity>
        </View>

        <View style={{ flex: 2 }}>
          <FlatList
            data={measures}
            renderItem={renderMeasure}
            keyExtractor={measure => measure.number}
            extraData={selectedMeasure}
            horizontal={true}
          />
        </View>

        <View style={{ flex: 4, marginTop: 10, alignItems: 'flex-start' }}>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start', flex: 2 }}>
            <TouchableOpacity style={[stylesMain.buttons, {}]} onPress={deleteMeasure}>
              <Text style={[stylesMain.text]}>Delete </Text>
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start', flex: 2, width: '100%' }}>
            <TouchableOpacity style={[stylesMain.buttons, {}]} onPress={() => navigation.navigate('LogIn')}>
              <Text style={[stylesMain.text, { color: COLORS.orange }]}>Save Track </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={stylesMain.footer}>
        <TouchableOpacity style={[stylesMain.buttons, {}]} onPress={() => navigation.navigate('Metronome')}>
          <Text style={[stylesMain.text, {}]}>Metronome </Text>
        </TouchableOpacity>
      </View>

      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Body>
            <View style={{ height: 200 }}>
              <View style={{ flex: 2, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[stylesMain.title, { marginTop: 0 }]}>Add Measure</Text>
              </View>

              <View style={{ flex: 4, padding: 10, justifyContent: 'center' }}>
                <View style={{ flexDirection: 'row' }}>
                  <Text style={stylesMain.text}>Measure Num: </Text>
                  <TextInput
                    onChangeText={text => setNewMeasureNum(text)}
                    value={newMeasureNum}
                    defaultValue='60'

                    keyboardType='numeric'
                    cursorColor={COLORS.orange}

                    style={{ width: 50 }}
                    backgroundColor={COLORS.buttonBackground}
                    borderBottomWidth={2}
                    borderBottomColor={COLORS.offWhite}

                    color={COLORS.orange}
                    fontSize={20}
                    fontWeight='bold'
                    textAlign='center'
                  ></TextInput>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={stylesMain.text}>Tempo: </Text>
                  <TextInput
                    onChangeText={text => setNewTempo(text)}
                    value={newTempo}
                    defaultValue='60'

                    keyboardType='numeric'
                    cursorColor={COLORS.orange}

                    style={{ width: 50 }}
                    backgroundColor={COLORS.buttonBackground}
                    borderBottomWidth={2}
                    borderBottomColor={COLORS.offWhite}

                    color={COLORS.orange}
                    fontSize={20}
                    fontWeight='bold'
                    textAlign='center'
                  ></TextInput>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={stylesMain.text}>Beat: </Text>
                  <TextInput
                    onChangeText={text => setNewBeat(text)}
                    value={newBeat}
                    defaultValue='4'

                    keyboardType='numeric'
                    cursorColor={COLORS.orange}

                    style={{ width: 50 }}
                    backgroundColor={COLORS.buttonBackground}
                    borderBottomWidth={2}
                    borderBottomColor={COLORS.offWhite}

                    color={COLORS.orange}
                    fontSize={20}
                    fontWeight='bold'
                    textAlign='center'
                  ></TextInput>
                </View>
              </View>
              <View style={{
                flex: 2, paddingBottom: 12,
                alignItems: 'flex-end',
                justifyContent: 'center'
              }}>
                <TouchableOpacity style={[stylesMain.buttons, { backgroundColor: COLORS.orange }]} onPress={handleModal}>
                  <Text style={[stylesMain.text, { color: COLORS.background }]}>Add</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal.Body>
          {/* </View> */}
        </Modal.Container>
      </Modal>
    </View>
  );
}

/* StyleSheets */
const styles = StyleSheet.create({

  measureBox: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: COLORS.background,
    borderRightColor: COLORS.background
  },

});

