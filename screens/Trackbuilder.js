/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-shadow */
/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* Trackbuilder.js */

/* Import react components */
import * as React from 'react';
import {
  StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput,
} from 'react-native';
import { useState, useEffect } from 'react';

/* Import component files */
import { Audio } from 'expo-av';
import Button from '../components/Button';
import { Modal } from '../components/MeasureModal.tsx';

/* Import style files */
import { stylesMain } from '../styles/styleMain';
import { COLORS } from '../styles/colors';

/* hard coded click track */
const measures = [
  {
    number: 1,
    tempo: 52,
    beat: 3,
  },
  {
    number: 2,
    tempo: 52,
    beat: 2,
  },
  {
    number: 3,
    tempo: 52,
    beat: 2,
  },
  {
    number: 4,
    tempo: 52,
    beat: 2,
  },
  {
    number: 5,
    tempo: 52,
    beat: 3,
  },
  {
    number: 6,
    tempo: 52,
    beat: 3,
  },
  {
    number: 7,
    tempo: 52,
    beat: 4,
  },
  {
    number: 8,
    tempo: 52,
    beat: 2,
  },
  {
    number: 9,
    tempo: 96,
    beat: 2,
  },
  {
    number: 10,
    tempo: 96,
    beat: 2,
  },
  {
    number: 11,
    tempo: 96,
    beat: 2,
  },
  {
    number: 12,
    tempo: 96,
    beat: 2,
  },
];

/* The orange squares in the flatlist, each representing a measure */
function MeasureBox({
  measure, onPress, MeasureBoxColor, textColor,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.measureBox, { backgroundColor: MeasureBoxColor }]}
    >
      <View style={[{ flexDirection: 'column', flex: 1, width: 150 }]}>
        {/* measure number */}
        <View style={[{
          flex: 1, alignItems: 'flex-start', justifyContent: 'center', paddingHorizontal: 15,
        }]}
        >
          <Text style={[stylesMain.text, { color: textColor, fontSize: 20 }]}>
            {measure.number}
          </Text>
        </View>

        {/* Beats per measure */}
        <View style={[{ flex: 2, alignItems: 'center', justifyContent: 'center' }]}>
          <Text style={[stylesMain.text, { color: textColor, fontSize: 50 }]}>{measure.beat}</Text>
        </View>

        {/* Beats per minute */}
        <View style={{
          flex: 1, alignItems: 'flex-end', justifyContent: 'center', paddingHorizontal: 15,
        }}
        >
          <Text style={[stylesMain.text, { color: textColor, fontSize: 20 }]}>{measure.tempo}</Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}

export default function TrackbuilderScreen({ navigation }) {
  /* The following code controls the flatlist display of the tracklist,
  *  as well as the display of its current values.
  *
  */

  /* selecting a measure from the flatlist */
  const [selectedMeasure, setSelectedMeasure] = useState();
  // const [selectedBeat, setSelectedBeat] = useState();
  // const [selectedTempo, setSelectedTempo] = useState();
  const selectMeasure = (item) => {
    if (selectedMeasure === item.number) {
      setSelectedMeasure(null);
      // setSelectedBeat(null);
      // setSelectedTempo(null);
    } else {
      setSelectedMeasure(item.number);
      // setSelectedBeat(item.beat);
      // setSelectedTempo(item.tempo);
    }
  };
  /* displaying a measure from the flatlist */
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

  /* The following code controls the pop up modal and procedure for adding a
  *  new measure into the tracklist.
  *
  */

  /* handle the popup screen for adding a new measure */
  const [isModalVisible, setIsModalVisible] = useState(false);
  const handleModal = () => {
    if (isModalVisible) {
      addMeasure();
    }
    setIsModalVisible(() => !isModalVisible);
  };

  /* insert a new measure into the list of measures */
  const [newMeasureNum, setNewMeasureNum] = useState('');
  const [newTempo, setNewTempo] = useState('');
  const [newBeat, setNewBeat] = useState('');
  const addMeasure = () => {
    if (newTempo !== '' && newBeat !== '' && newMeasureNum !== '') {
      const newMeasure = {
        number: newMeasureNum,
        tempo: newTempo,
        beat: newBeat,
      };
      // add in measure and update 'number' property
      measures.splice(newMeasureNum - 1, 0, newMeasure);
      for (let i = 0; i < measures.length; i++) {
        measures[i].number = i + 1;
      }
    }
  };

  /* delete selected measure from list of measures */
  const deleteMeasure = () => {
    measures.splice(selectedMeasure - 1, 1);
    // Update the 'number' property of the remaining measures
    for (let i = 0; i < measures.length; i++) {
      measures[i].number = i + 1;
    }
  };

  /* The following code implements the clicking metronome which plays
  *  the click track back as audio.
  *
  * */

  /* Hooks */
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausePlayIcon, setPausePlayIcon] = useState('caretright');

  // eslint-disable-next-line no-unused-vars
  const [selectedSound, setSelectedSound] = React.useState('Default'); // Initialize selected state with default sound
  const [selectedSoundFile, setSelectedSoundFile] = useState(require('../assets/sounds/metronome/metronomesound.mp3')); // sound file of selected sound
  const [accentSoundFile, setAccentSoundFile] = useState(require('../assets/sounds/metronome/metronomeaccent.mp3'));
  const [sound, setSound] = useState(); // current loaded sound

  const [count, setCount] = useState(-1); // current beat

  const [beatList, setBeatList] = useState([]); // list of all the accent values of each beat
  const [tempoList, setTempoList] = useState([]); // list of tempos for each beat

  /* variables to make timer work */
  this.expected;
  this.drift = 0;

  /* Toggles pause and play */
  const PausePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
    setPausePlayIcon((PausePlayIcon) => (PausePlayIcon === 'caretright' ? 'pause' : 'caretright'));
    setCount(-1);
    this.drift = 0;
  };

  /* Plays sound. The function is async playing an audio file is asynchronous. */
  async function playSound() {
    if (count < beatList.length) {
      // Play sound, accenting the down beat
      const { sound } = await Audio.Sound.createAsync(
        (beatList[count] === 1) ? accentSoundFile : selectedSoundFile,
      );
      setSound(sound);
      await sound.playAsync();

      // increment to next count and calculate drift
      setCount((count) => (count + 1));
      this.actual = Date.now();
      this.drift = (this.actual - this.expected);

      // Temporaraly commented out to make eslist happy
      // console.log(count);
      // console.log('drift ', this.drift);
    } else {
      PausePlay();
    }
  }

  /* start metronome by incrementing count */
  useEffect(() => {
    // Temporaraly commented out to make eslist happy
    // console.log(isPlaying);

    if (isPlaying) {
      setUpTrack();
      setCount((count) => (count + 1));
    }
  }, [isPlaying]);

  /* call playSound every interval, taking into account the drift */
  useEffect(() => {
    if (isPlaying && count >= 0) {
      // Temporaraly commented out to make eslist happy
      // console.log(count);
      // console.log(tempoList[count]);

      this.expected = Date.now() + ((60 / tempoList[count]) * 1000) - this.drift;
      setTimeout(playSound, ((60 / tempoList[count]) * 1000) - this.drift);
    }
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [count]);

  /* update the beat sound (paired) */
  useEffect(() => {
    switch (selectedSound) {
      case 'Clap':
        setSelectedSoundFile(require('../assets/sounds/clap/clap-click.mp3'));
        setAccentSoundFile(require('../assets/sounds/clap/clap-accent.mp3'));
        break;
      case 'Drum':
        setSelectedSoundFile(require('../assets/sounds/drum/floor_tom_louder.mp3'));
        setAccentSoundFile(require('../assets/sounds/drum/snare_drum_louder.mp3'));
        break;
      case 'Piano':
        setSelectedSoundFile(require('../assets/sounds/piano/pianoD.mp3'));
        setAccentSoundFile(require('../assets/sounds/piano/pianoG.mp3'));
        break;
      case 'Shotgun':
        setSelectedSoundFile(require('../assets/sounds/shotgun/Shotgun.mp3'));
        setAccentSoundFile(require('../assets/sounds/shotgun/Shotgun2.mp3'));
        break;
      case 'Snap':
        setSelectedSoundFile(require('../assets/sounds/snap/snap-click.mp3'));
        setAccentSoundFile(require('../assets/sounds/snap/snap-accent.mp3'));
        break;
      default:
        setSelectedSoundFile(require('../assets/sounds/metronome/metronomesound.mp3')); // Default
        setAccentSoundFile(require('../assets/sounds/metronome/metronomeaccent.mp3'));
    }
  }, [selectedSound]);

  /* This function generates the secquence of beats and whether the are accents of down beats */
  function setUpTrack() {
    const newCountList = [];
    const newTempoList = [60]; // initialized so that tempos line up with measures
    let i;
    measures.forEach((measure) => {
      for (i = 0; i < measure.beat; i++) {
        if (i === 0) { newCountList.push(1); } else { newCountList.push(0); }
        newTempoList.push(measure.tempo);
      }
    });
    setBeatList(newCountList);
    setTempoList(newTempoList);
  }

  return (
    <View style={stylesMain.container}>

      <View style={stylesMain.header}>
        <Text style={stylesMain.title}>Create Click Track</Text>
      </View>

      <View style={[stylesMain.body, {}]}>
        <View style={{ flex: 3, width: '100%' }}>
          <View style={{ flex: 2, justifyContent: 'space-evenly', alignItems: 'center' }}>
            {/* <Text style={stylesMain.text}>Measure Num: {selectedMeasure}</Text>
            <Text style={stylesMain.text}>Tempo: {selectedTempo}</Text>
            <Text style={stylesMain.text}>Beats: {selectedBeat}</Text> */}
            <Button image={pausePlayIcon} onPress={PausePlay} w={300} h={100} />

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
            keyExtractor={(measure) => measure.number}
            extraData={selectedMeasure}
            horizontal
          />
        </View>

        <View style={{ flex: 4, marginTop: 10, alignItems: 'flex-start' }}>
          <View style={{ alignItems: 'flex-end', justifyContent: 'flex-start', flex: 2 }}>
            <TouchableOpacity style={[stylesMain.buttons, {}]} onPress={deleteMeasure}>
              <Text style={[stylesMain.text]}>Delete </Text>
            </TouchableOpacity>
          </View>
          <View style={{
            alignItems: 'flex-end', justifyContent: 'flex-start', flex: 2, width: '100%',
          }}
          >
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
                alignItems: 'flex-end',
                justifyContent: 'center',
              }}
              >
                <TouchableOpacity
                  style={[stylesMain.buttons, { backgroundColor: COLORS.orange }]}
                  onPress={handleModal}
                >
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
    borderRightColor: COLORS.background,
  },

});
