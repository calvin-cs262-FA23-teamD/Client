/* Trackbuilder.js */

import * as React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import Button from './../components/Button';

import { stylesMain } from './../styles/styleMain';
import { COLORS } from './../styles/colors';

//import Modal from "react-native-modal";
import { Modal } from "../components/MeasureModal"

const measures = [
  {
    number: 1,
    tempo: 100,
    beat: 4,
  },
  {
    number: 2,
    tempo: 100,
    beat: 4,
  },
  {
    number: 3,
    tempo: 100,
    beat: 4,
  },
  {
    number: 4,
    tempo: 50,
    beat: 3,
  },
  {
    number: 5,
    tempo: 50,
    beat: 3,
  },
];

const MeasureBox = ({ measure, onPress, backgroundColor, textColor }) => (
  <TouchableOpacity onPress={onPress} style={[styles.measureBox, { backgroundColor: backgroundColor }]}>
    <View style={[styles.measureBlock, { flexDirection: 'column', }]}>
      <View style={styles.measureMark}>
        <Text style={[stylesMain.text, { color: textColor, fontSize: 20 }]}>{measure.number}</Text>
      </View>
      <View style={styles.beats}>
        <Text style={[stylesMain.text, { color: textColor, fontSize: 50 }]}>{measure.beat}</Text>
      </View>
      <View style={styles.tempo}>
        <Text style={[stylesMain.text, { color: textColor, fontSize: 20 }]}>{measure.tempo}</Text>
      </View>
    </View>
  </TouchableOpacity>
);

export default function TrackbuilderScreen({ navigation }) {
  const [selectedMeasure, setSelectedMeasure] = useState();
  const [selectedBeat, setSelectedBeat] = useState();
  const [selectedTempo, setSelectedTempo] = useState();

  const [number, onChangeNumber] = useState('');

  [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => setIsModalVisible(() => !isModalVisible);

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

  const renderMeasure = ({ item }) => {
    const backgroundColor = item.number === selectedMeasure ? '#a23600' : '#ff6900';
    const color = item.number === selectedMeasure ? '#f0f5f5' : '#0a0e0f';

    return (
      <MeasureBox
        measure={item}
        onPress={() => selectMeasure(item)}
        backgroundColor={backgroundColor}
        textColor={color}
        styles={styles.measure}
      />
    );
  };

  const addMeasure = () => {
    const newMeasure = {
      number: 2,  // Set the number to match its index + 1
      tempo: 60,
      beat: 5,
    };

    // Insert the new measure as the third element in the array
    measures.splice(newMeasure.number - 1, 0, newMeasure);

    // Update the 'number' property of each other object
    for (let i = 0; i < measures.length; i++) {
      measures[i].number = i + 1;
    }
  }

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
            <Text style={stylesMain.text}>Measure: {selectedMeasure}</Text>
            <Text style={stylesMain.text}>Tempo: {selectedTempo}</Text>
            <Text style={stylesMain.text}>Beat: {selectedBeat}</Text>
          </View>
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

        <View style={{ flex: 4, marginTop: 50, alignItems: 'flex-end' }}>
          <TouchableOpacity style={styles.buttons} onPress={handleModal}>
            <Text style={[stylesMain.text]}>Add </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buttons} onPress={deleteMeasure}>
            <Text style={[stylesMain.text]}>Delete </Text>
          </TouchableOpacity>
          <View style={{ marginTop: 50, marginLeft: 260 }}>
            <Button style={{ alignItems: 'right' }} label={'Log In'} onPress={() => navigation.navigate('LogIn')} w={80} h={50}></Button>
          </View>
        </View>
      </View>
      <View style={stylesMain.footer}>
        <Button label={'Metronome'} onPress={() => navigation.navigate('Metronome')} w={100} h={50}></Button>
      </View>

      <Modal isVisible={isModalVisible}>
        <Modal.Container>
          <Modal.Body>
            <View style={{ height: 300 }}>
              <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[stylesMain.title, { marginTop: 0 }]}>Add Measure</Text>
              </View>

              <View style={{ flex: 4, backgroundColor: 'blue', padding: 10 }}>
                <View style={{ flexDirection: 'row' }}>
                  {/* <Text style={styles.text}>Measure:  </Text>
                <TextInput
                  style={styles.input}
                  onChange={onChangeNumber}
                  value={number}
                  keyboardType='numeric'
                  backgroundColor='#f0f5f5'
                ></TextInput>
                </View> */}
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>Tempo:  </Text>
                  <TextInput
                    style={styles.input}
                    onChange={onChangeNumber}
                    value={number}
                    keyboardType='numeric'
                    backgroundColor='#f0f5f5'
                  ></TextInput>
                </View>

                <View style={{ flexDirection: 'row' }}>
                  <Text style={styles.text}>Beat:  </Text>
                  <TextInput
                    style={styles.input}
                    onChange={onChangeNumber}
                    value={number}
                    keyboardType='numeric'
                    backgroundColor='#f0f5f5'
                  ></TextInput>
                </View>
              </View>
              <View style={{ flex: 1, backgroundColor: 'green' }}>
                <TouchableOpacity style={styles.buttons} onPress={handleModal}>
                  <Text style={styles.text}>hello</Text>
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

  measureBlock: {
    flex: 1,
    width: 200
  },
  measureMark: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  beats: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tempo: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 15
  },
  buttons: {
    backgroundColor: '#1f2e2e',
    borderRadius: 20,

    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
    alignItems: 'center',
    justifyContent: 'center',
    width: 150,
    height: 50,
  },

  bottom: {
    flex: 4,
  },

  measureBox: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderLeftColor: COLORS.background,
    borderRightColor: COLORS.background
  },

});

