/* Things to do (Abigail):
 * -Keeps going up/down after you release
 * -(DONE, sort of [see comments]) Keyboard squishes screen when it opens
 * -(DONE) Sign up goes back to trackbuilder, not log in
 * -Deleting track resets measure to 2, not 1
 * -Calvin's laugh (optional)
 * -(DONE) warning messages on log in
 *
 *
 * Things to do in general:
 * -Save track should save track
 */

/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable import/no-named-as-default-member */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-expressions */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable global-require */
/* eslint-disable react/prop-types */
/* eslint-disable no-use-before-define */
/* Metronome.js */

import * as React from 'react';
// import KeyboardAvoidingView and ScrollView (A)
import {
  Text, View, KeyboardAvoidingView, ScrollView, TouchableOpacity,
} from 'react-native';
import { useState, useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

/* Import sound ability */
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';

/* Import component files */
import PausePlayButton from '../components/PausePlayButton';
import Counters from '../components/Counters';
import { Modal } from '../components/Modal.tsx';
import SoundModal, { switchSound } from '../components/SoundSelection';
import SoundButton from '../components/SoundButton';
import MetronomeWriting from '../components/MetronomeWriting';

/* Import style code */

import { stylesMain } from '../styles/stylesMain';
import { COLORS } from '../styles/colors';

/* Main function */
export default function MetronomeScreen({ navigation }) {
  const route = useRoute();
  const id = route.params?.id;

  /* Hooks */
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausePlayIcon, setPausePlayIcon] = useState('caretright');

  const [selectedSound, setSelectedSound] = React.useState('Default'); // Initialize selected state with default sound
  const [selectedSoundFile, setSelectedSoundFile] = useState(require('../assets/sounds/metronome/metronomesound.mp3')); // sound file of selected sound
  const [accentSoundFile, setAccentSoundFile] = useState(require('../assets/sounds/metronome/metronomeaccent.mp3'));
  // add silence
  const [silentSoundFile, setSilentSoundFile] = useState(require('../assets/sounds/silent/silence.mp3'));
  const [sound, setSound] = useState(); // current loaded sound

  const [BPM, setBPM] = useState(60); // beats per minute
  const [beat, setBeat] = useState(4); // beats per measure
  const [measure, setMeasure] = useState(-1); // current measure

  /* variables to make timer work */
  let expected;
  let drift = 0;
  let actual;
  const interval = (60 / BPM) * 1000;

  let beatSound;

  /* Toggles pause and play */
  const PausePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
    setPausePlayIcon((PausePlayIcon) => (PausePlayIcon === 'caretright' ? 'pause' : 'caretright'));

    setMeasure(-1);
    drift = 0;
  };

  /* Plays sound. The function is async playing an audio file is asynchronous. */
  async function playSound() {
    /* Play sound, accenting the down beat */
    beatSound = buttonStates[measure % beat];
    // When adding in silence, replace the first "selectedSoundFile" (done 12/6)
    // eslint-disable-next-line no-nested-ternary, max-len
    const soundFile = (beatSound === 1) ? accentSoundFile : (
      beatSound === 2) ? silentSoundFile : selectedSoundFile;

    const { sound } = await Audio.Sound.createAsync(soundFile);
    setSound(sound);
    await sound.playAsync();

    /* increment measure and calculate drift */
    setMeasure((measure) => (measure + 1));
    actual = Date.now();
    drift = (actual - expected);

    // Temporarally commented out to make eslint happy
    console.log(measure);
    console.log('drift ', drift);
  }

  /* start metronome by incrementing measure */
  useEffect(() => {
    // Temporaraly commented out to make eslint happy
    // console.log(isPlaying);

    if (isPlaying) {
      setMeasure((measure) => (measure + 1));
    }
  }, [isPlaying]);

  /* call playSound every interval, taking into account the drift */
  useEffect(() => {
    if (isPlaying && measure >= 0) {
      expected = Date.now() + interval - drift;
      setTimeout(playSound, interval - drift);
    }
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [measure]);

  /* update the beat sound (paired) */
  useEffect(() => {
    switchSound(selectedSound, setSelectedSoundFile, setAccentSoundFile, setSilentSoundFile);
  }, [selectedSound]);

  const [buttonStates, setButtonStates] = useState(
    Array.from({ length: beat }, () => 0), // Set the default state to display numbers
  );

  /* handle the popup screen for chaning the sound */
  const [isSoundModalVisible, setIsSoundModalVisible] = useState(false);
  const handleModal = () => {
    setIsSoundModalVisible(() => !isSoundModalVisible);
  };

  /* handle the popup screen for chaning the technical writing */
  const [isMetronomeWritingVisible, setIsMetronomeWritingVisible] = useState(false);
  const handleMetrnomeWriting = () => {
    setIsMetronomeWritingVisible(() => !isMetronomeWritingVisible);
  };

  /* Main app layout */
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
            <View style={[stylesMain.subView, { flex: 1 }]} />
            <View style={[stylesMain.header, { flex: 3, height: '100%' }]}>
              <Text style={stylesMain.title}>Beatle</Text>
            </View>
            <View style={[stylesMain.subView, { flex: 1 }]}>
              <TouchableOpacity
                style={[stylesMain.backButton,
                  { backgroundColor: COLORS.buttonBackground, width: 50 }]}
                onPress={handleMetrnomeWriting}
              >
                <AntDesign name="question" size={24} color={COLORS.offWhite} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[stylesMain.body, {}]}>
            <View style={{ flex: 1.5, justifyContent: 'center' }}>
              <PausePlayButton onPress={PausePlay} pausePlayIcon={pausePlayIcon} width={300} />
            </View>

            <View style={{ flex: 6, justifyContent: 'space-between' }}>
              <Counters
                width={300}
                beat={beat} setBeat={setBeat}
                BPM={BPM} setBPM={setBPM}
                buttonStates={buttonStates} setButtonStates={setButtonStates}
              />

              <SoundButton onPress={handleModal} w={300} selectedSound={selectedSound} />
            </View>
          </View>

          <View style={[stylesMain.footer, {}]}>
            <TouchableOpacity
              style={[stylesMain.flatButton, { alignSelf: 'center', marginBottom: 10 }]}
              onPress={() => {
                if (isPlaying) {
                  PausePlay();
                }
                navigation.navigate('Trackbuilder', { id });
              }}
            >
              <Text style={[stylesMain.text, { color: COLORS.background }]}>Trackbuilder </Text>
            </TouchableOpacity>
          </View>

          <Modal isVisible={isSoundModalVisible}>
            <Modal.Container>
              <Modal.Body>
                <SoundModal
                  selectedSound={selectedSound}
                  setSelectedSound={setSelectedSound}
                  isModalVisible={isSoundModalVisible}
                  setIsModalVisible={setIsSoundModalVisible}
                  handleModal={handleModal}
                />
              </Modal.Body>
              {/* </View> */}
            </Modal.Container>
          </Modal>

          <Modal isVisible={isMetronomeWritingVisible}>
            <Modal.Container>
              <Modal.Body>
                <MetronomeWriting
                  isModalVisible={isMetronomeWritingVisible}
                  setIsModalVisible={setIsMetronomeWritingVisible}
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
