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
import { Text, View, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list'; // dropdown list for selecting sound

/* Import sound ability */
import { Audio } from 'expo-av';

/* Import component files */
import PausePlayButton from '../components/PausePlayButton';
import Counters from '../components/Counters';

/* Import style code */
import { stylesMain } from '../styles/stylesMain';
import { COLORS } from '../styles/colors';

/* Default sound and list of possible selectedSounds */
const soundList = [
  { key: '1', value: 'Default' },
  // Clap contributed by Abigail's friend Angela (removed)
  // { key: '2', value: 'Clap' },
  { key: '2', value: 'Drum' },
  { key: '3', value: 'Piano' },
  { key: '4', value: 'Shotgun' },
  // Snap contributed by Abigail's friend Noah
  { key: '5', value: 'Snap' },
];

/* Main function */
export default function MetronomeScreen({ navigation }) {
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
    switch (selectedSound) {
      case 'Drum':
        setSelectedSoundFile(require('../assets/sounds/drum/floor_tom_louder.mp3'));
        setAccentSoundFile(require('../assets/sounds/drum/snare_drum_louder.mp3'));
        setSilentSoundFile(require('../assets/sounds/silent/silence.mp3'));
        break;
      case 'Piano':
        setSelectedSoundFile(require('../assets/sounds/piano/pianoD.mp3'));
        setAccentSoundFile(require('../assets/sounds/piano/pianoG.mp3'));
        setSilentSoundFile(require('../assets/sounds/silent/silence.mp3'));
        break;
      case 'Shotgun':
        setSelectedSoundFile(require('../assets/sounds/shotgun/Shotgun.mp3'));
        setAccentSoundFile(require('../assets/sounds/shotgun/Shotgun2.mp3'));
        setSilentSoundFile(require('../assets/sounds/silent/silence.mp3'));
        break;
      case 'Snap':
        setSelectedSoundFile(require('../assets/sounds/snap/snap-click-2.0.mp3'));
        setAccentSoundFile(require('../assets/sounds/snap/snap-accent-2.0.mp3'));
        setSilentSoundFile(require('../assets/sounds/silent/silence.mp3'));
        break;
      default:
        setSelectedSoundFile(require('../assets/sounds/metronome/metronomesound.mp3')); // Default
        setAccentSoundFile(require('../assets/sounds/metronome/metronomeaccent.mp3'));
        setSilentSoundFile(require('../assets/sounds/silent/silence.mp3'));
    }
  }, [selectedSound]);

  const [buttonStates, setButtonStates] = useState(
    Array.from({ length: beat }, () => 0), // Set the default state to display numbers
  );

  /* Main app layout */
  return (
    <View style={stylesMain.container}>

      <View style={stylesMain.header}>
        <Text style={stylesMain.title}>Beatle</Text>
      </View>

      <View style={[stylesMain.body, { alignItems: 'center', marginTop: -20 }]}>

        <PausePlayButton onPress={PausePlay} pausePlayIcon={pausePlayIcon} width={300} />

        <Counters
          width={300}
          beat={beat} setBeat={setBeat}
          BPM={BPM} setBPM={setBPM}
          buttonStates={buttonStates} setButtonStates={setButtonStates}
        />

        <View style={[stylesMain.subView]}>
          <View style={stylesMain.boxed}>
            <Text style={[stylesMain.text, { alignSelf: 'center', marginBottom: -5 }]}>Sound</Text>
            <SelectList
              setSelected={(val) => setSelectedSound(val)}
              data={soundList}
              save="value"
              boxStyles={{ backgroundColor: COLORS.orange, width: 300 }}
              dropdownTextStyles={{ color: COLORS.orange }}
              placeholder="Default"
              search={false}
              maxHeight={100}
            />
          </View>
        </View>

        <View style={stylesMain.footer}>
          <TouchableOpacity
            style={[stylesMain.buttons, { width: 300, alignSelf: 'center', marginBottom: 10 }]}
            onPress={() => {
              if (isPlaying) {
                PausePlay();
              }
              navigation.navigate('Trackbuilder');
            }}
          >
            <Text style={[stylesMain.text, {}]}>Trackbuilder </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
