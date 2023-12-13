/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
/* eslint-disable import/extensions */
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
  // add KeyboardAvoidingView and ScrollView (A)
  StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, FlatList, TouchableOpacity, TextInput,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';

/* Import component files */
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { Modal } from '../components/Modal.tsx';

/* Import component files */
import PausePlayButton from '../components/PausePlayButton';
import AddMeasure from '../components/AddMeasure.js';
import SoundModal, { switchSound } from '../components/SoundSelection';
import SoundButton from '../components/SoundButton';
import SavedTracks from '../components/SavedTracks.js';

/* Import style files */
import { stylesMain } from '../styles/stylesMain.js';
import { COLORS } from '../styles/colors';
import TrackbuilderWriting from '../components/TrackbuilderWriting.js';

/* hard coded click track */
const measures = [
  {
    number: 1,
    tempo: 120,
    beat: 4,
  },
  {
    number: 2,
    tempo: 60,
    beat: 3,
  },
  {
    number: 3,
    tempo: 150,
    beat: 5,
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
      <View style={[{ flexDirection: 'row', flex: 1, width: 150 }]}>
        {/* measure number */}
        <View style={[{
          alignItems: 'stretch', justifyContent: 'space-evenly', paddingHorizontal: 15,
        }]}
        >
          <Text style={[stylesMain.text, { color: textColor, fontSize: 20 }]}>
            {measure.number}
          </Text>
        </View>

        {/* Beats per measure */}
        <View style={[{ alignItems: 'stretch', justifyContent: 'space-evenly' }]}>
          <Text style={[stylesMain.text, { color: textColor, fontSize: 50 }]}>{measure.beat}</Text>
        </View>

        {/* Beats per minute */}
        <View style={{
          alignItems: 'stretch', justifyContent: 'space-evenly', paddingHorizontal: 15,
        }}
        >
          <Text style={[stylesMain.text, { color: textColor, fontSize: 20 }]}>
            {measure.tempo} BPM
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}

export default function TrackbuilderScreen({ navigation }) {
  const route = useRoute();
  let id = route.params?.id;
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
      setNewMeasureNum(measures.length + 1);
      // setSelectedBeat(null);
      // setSelectedTempo(null);
    } else {
      setSelectedMeasure(item.number);
      setNewMeasureNum(item.number + 1);
      // setSelectedBeat(item.beat);
      // setSelectedTempo(item.tempo);
    }
  };
  /* displaying a measure from the flatlist */
  const renderMeasure = ({ item }) => {
    const MeasureBoxColor = item.number === selectedMeasure ? COLORS.darkOrange : COLORS.orange;
    const color = item.number === selectedMeasure ? COLORS.offWhite : COLORS.background;

    return (
      <MeasureBox
        measure={item}
        onPress={() => selectMeasure(item)}
        MeasureBoxColor={MeasureBoxColor}
        textColor={color}
      />
    );
  };

  /* The following code controls the pop up modal and procedure for adding a
  *  new measure into the tracklist.
  *
  */

  /* handle the popup screen for adding a new measure */
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const handleAddModal = () => {
    if (isAddModalVisible) {
      addMeasure();
    }
    setIsAddModalVisible(() => !isAddModalVisible);
  };

  /* handle the popup screen for chaning the sound */
  const [isSoundModalVisible, setIsSoundModalVisible] = useState(false);
  const handleSoundModal = () => {
    setIsSoundModalVisible(() => !isSoundModalVisible);
  };

  /* handle the popup screen for chaning the technical writing */
  const [isTrackbuilderWritingVisible, setIsTrackbuilderWritingVisible] = useState(false);
  const handleTrackbuilderWriting = () => {
    setIsTrackbuilderWritingVisible(() => !isTrackbuilderWritingVisible);
  };

  const [loginText, setLoginText] = useState('Log In');
  const handleLogIn = () => {
    if (id) {
      id = null;
      console.log('user:', id);
      setLoginText('Log In');
    } else {
      navigation.navigate('LogIn');
    }
    console.log('when I press login the user is:', id);
  };

  useEffect(() => {
    console.log('the user was changed. It is now: ', id);
    id ? setLoginText('Log Out') : setLoginText('Log In');
  }, [id]);

  /* handle the popup screen for login and selecting a track
  *  if user is logged in, open Saved Tracked Modal
  *  if user is not logged in, navigate to login
  */
  const [isSavedTrackVisible, setIsSavedTrackVisible] = useState(false);
  const handleSavedTrackModal = () => {
    if (id) {
      setIsSavedTrackVisible(() => !isSavedTrackVisible);
    } else {
      navigation.navigate('LogIn');
    }
  };

  const SaveTrack = () => {
    if (!id) {
      navigation.navigate('LogIn');
    }
    // TODO add in save track code
    console.log('save track');
  };

  /* insert a new measure into the list of measures */
  const [newMeasureNum, setNewMeasureNum] = useState(measures.length + 1);
  const [newTempo, setNewTempo] = useState(60);
  const [newBeat, setNewBeat] = useState(4);
  const addMeasure = () => {
    if (newTempo !== '' && newBeat !== '' && newMeasureNum !== '') {
      console.log(newMeasureNum);
      console.log((newMeasureNum < 1) ? 1 : newMeasureNum);
      const newMeasureNumCorr = (newMeasureNum < 1) ? 1 : newMeasureNum;
      const newMeasure = {
        number: newMeasureNumCorr,
        tempo: newTempo,
        beat: newBeat,
      };
      // add in measure and update 'number' property
      measures.splice(newMeasureNumCorr - 1, 0, newMeasure);
      for (let i = 0; i < measures.length; i++) {
        measures[i].number = i + 1;
      }
      setNewMeasureNum(measures.length);
    }
  };

  /* delete selected measure from list of measures */
  const flatListRef = useRef(null);
  const deleteMeasure = () => {
    if (selectedMeasure != null) {
      measures.splice(selectedMeasure - 1, 1);
      // Update the 'number' property of the remaining measures
      for (let i = 0; i < measures.length; i++) {
        measures[i].number = i + 1;
      }
      flatListRef.current.forceUpdate();
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
  // eslint-disable-next-line no-unused-vars
  const [silentSoundFile, setSilentSoundFile] = useState(require('../assets/sounds/silent/silence.mp3'));
  const [sound, setSound] = useState(); // current loaded sound

  const [count, setCount] = useState(-1); // current beat

  const [beatList, setBeatList] = useState([]); // list of all the accent values of each beat
  const [tempoList, setTempoList] = useState([]); // list of tempos for each beat

  // eslint-disable-next-line no-unused-vars
  const [title, setTitle] = useState('New Track');

  /* variables to make timer work */
  let expected;
  let drift = 0;
  let actual;

  /* Toggles pause and play */
  const PausePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
    setPausePlayIcon((PausePlayIcon) => (PausePlayIcon === 'caretright' ? 'pause' : 'caretright'));
    setCount(-1);
    drift = 0;
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
      actual = Date.now();
      drift = (actual - expected);

      // Temporaraly commented out to make eslist happy
      // console.log(count);
      // console.log('drift ', drift);
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

      expected = Date.now() + ((60 / tempoList[count]) * 1000) - drift;
      setTimeout(playSound, ((60 / tempoList[count]) * 1000) - drift);
    }
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [count]);

  /* update the beat sound (paired) */
  useEffect(() => {
    switchSound(selectedSound, setSelectedSoundFile, setAccentSoundFile, setSilentSoundFile);
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

  // add a keyboard avoiding view and a scroll view, but currently getting warning (A)
  return (
    <KeyboardAvoidingView
      // behavior={isIOS ? "padding" : "height"}
      enabled
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled
      >
        <View style={stylesMain.container}>
          <View style={[stylesMain.header, { flexDirection: 'row' }]}>
            <View style={[stylesMain.subView, { flex: 1, alignItems: 'center', justifyContent: 'flex-end' }]}>
              <TouchableOpacity
                style={[stylesMain.smallButton, { backgroundColor: COLORS.background }]}
                onPress={handleLogIn}
              >
                <Text style={[stylesMain.text, { color: COLORS.orange }]}>{loginText}</Text>
              </TouchableOpacity>
            </View>
            <View style={[stylesMain.header, { flex: 3, height: '100%' }]}>
              <Text style={stylesMain.title}>Trackbuilder</Text>
            </View>
            <View style={[stylesMain.subView, { flex: 1 }]}>
              <TouchableOpacity
                style={[stylesMain.backButton,
                  { backgroundColor: COLORS.buttonBackground, width: 50 }]}
                onPress={handleTrackbuilderWriting}
              >
                <AntDesign name="question" size={24} color={COLORS.offWhite} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[stylesMain.body, {}]}>
            <View style={{ flex: 1.5, justifyContent: 'center' }}>
              <PausePlayButton onPress={PausePlay} pausePlayIcon={pausePlayIcon} width={300} />
            </View>

            <View style={{ flex: 6 }}>
              <View style={{ alignItems: 'center', paddingBottom: 5 }}>
                <TextInput
                  onChangeText={(text) => setTitle(text)}
                  value={title}
                  defaultValue={title}
                  cursorColor={COLORS.orange}
                  style={{ width: 300 }}
                  backgroundColor={COLORS.background}
                  // borderBottomWidth={2}'
                  // borderBottomColor={COLORS.orange}
                  color={COLORS.offWhite}
                  fontSize={20}
                  fontWeight="bold"
                  textAlign="center"
                />
              </View>
              <View style={{ maxHeight: 250 }}>
                {/* warning may be caused by use of FlatList within ScrollView,
                potential solution to use SectionList instead */}
                <FlatList
                  ref={flatListRef}
                  data={measures}
                  renderItem={renderMeasure}
                  keyExtractor={(measure) => measure.number}
                  extraData={selectedMeasure}
                  vertical
                  showsVerticalScrollIndicator={false}
                />
              </View>

              <View style={{ flex: 4, marginTop: 10, alignItems: 'flex-start' }}>
                <View style={{ alignItems: 'flex-start', flex: 2, flexDirection: 'row' }}>
                  <View style={{ flex: 2, alignItems: 'flex-start' }}>
                    <TouchableOpacity style={[stylesMain.smallButton, {}]} onPress={deleteMeasure}>
                      <Text style={[stylesMain.text]}> Delete </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 2, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={[stylesMain.smallButton, { flexDirection: 'row' }]} onPress={handleAddModal}>
                      <Text style={[stylesMain.text]}> Add </Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <View style={{ alignItems: 'flex-start', flex: 2, flexDirection: 'row' }}>
                  <View style={{ flex: 2, alignItems: 'flex-start' }}>
                    <TouchableOpacity
                      style={[stylesMain.smallButton, {}]}
                      onPress={handleSavedTrackModal}
                    >
                      <Text style={[stylesMain.text, { color: COLORS.offWhite }]}>My Tracks</Text>
                    </TouchableOpacity>
                  </View>
                  <View style={{ flex: 2, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={[stylesMain.smallButton, {}]} onPress={SaveTrack}>
                      <Text style={[stylesMain.text, { color: COLORS.offWhite }]}>Save Track</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                <SoundButton onPress={handleSoundModal} w={300} selectedSound={selectedSound} />
              </View>
            </View>
          </View>

          <View style={[stylesMain.footer, {}]}>
            <TouchableOpacity
              style={[stylesMain.flatButton, { width: 300, alignSelf: 'center', marginBottom: 10 }]}
              onPress={() => {
                if (isPlaying) {
                  PausePlay();
                }
                navigation.navigate('Metronome', { id });
              }}
            >
              <Text style={[stylesMain.text, { color: COLORS.background }]}>Metronome </Text>
            </TouchableOpacity>
          </View>

          <Modal isVisible={isAddModalVisible}>
            <Modal.Container>
              <Modal.Body>
                <AddMeasure
                  newMeasureNum={newMeasureNum}
                  setNewMeasureNum={setNewMeasureNum}
                  newTempo={newTempo}
                  setNewTempo={setNewTempo}
                  newBeat={newBeat}
                  setNewBeat={setNewBeat}
                  isModalVisible={isAddModalVisible}
                  setIsModalVisible={setIsAddModalVisible}
                  handleModal={handleAddModal}
                />
              </Modal.Body>
              {/* </View> */}
            </Modal.Container>
          </Modal>

          <Modal isVisible={isSoundModalVisible}>
            <Modal.Container>
              <Modal.Body>
                <SoundModal
                  selectedSound={selectedSound}
                  setSelectedSound={setSelectedSound}
                  isModalVisible={isSoundModalVisible}
                  setIsModalVisible={setIsSoundModalVisible}
                  handleModal={handleSoundModal}
                />
              </Modal.Body>
              {/* </View> */}
            </Modal.Container>
          </Modal>

          <Modal isVisible={isSavedTrackVisible}>
            <Modal.Container>
              <Modal.Body>
                <SavedTracks
                  isModalVisible={isSavedTrackVisible}
                  setIsModalVisible={setIsSavedTrackVisible}
                />
              </Modal.Body>
              {/* </View> */}
            </Modal.Container>
          </Modal>

          <Modal isVisible={isTrackbuilderWritingVisible}>
            <Modal.Container>
              <Modal.Body>
                <TrackbuilderWriting
                  isModalVisible={isTrackbuilderWritingVisible}
                  setIsModalVisible={setIsTrackbuilderWritingVisible}
                />
              </Modal.Body>
              {/* </View> */}
            </Modal.Container>
          </Modal>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
