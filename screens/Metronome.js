/* Metronome.js */

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useRef, useEffect } from 'react';

import { SelectList } from 'react-native-dropdown-select-list';  // dropdown list for selecting sound

/* Import component files */
import Button from './../components/Button';
import BoxyBox from './../components/BoxyBox';

/* Import sound ability */
import { Audio } from 'expo-av';


/* Default sound and list of possible selectedSounds*/
const soundList = [
  { key: '1', value: 'Default' },
  { key: '2', value: 'Clap' },
  { key: '3', value: 'Drum' },
  { key: '4', value: 'Piano' },
  { key: '5', value: 'Shotgun' },
  // Snap contributed by Abigail's friend Noah
  { key: '6', value: 'Snap' },
]


/* Main function */
export default function MetronomeScreen( {navigation} ) {
  /* Hooks */
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausePlayIcon, setPausePlayIcon] = useState("caretright");

  const [selectedSound, setSelectedSound] = React.useState("Default"); // Initialize selected state with default sound
  const [selectedSoundFile, setSelectedSoundFile] = useState(require('./../assets/sounds/metronome/metronomesound.mp3')); // sound file of selected sound
  const [accentSoundFile, setAccentSoundFile] = useState(require('./../assets/sounds/metronome/edit-metronome-accent-sound.mp3'));
  const [sound, setSound] = useState();   // current loaded sound

  const [BPM, setBPM] = useState(60);     // beats per minute
  const [beat, setBeat] = useState(4);    // beats per measure
  const [measure, setMeasure] = useState(-1); // current measure

  /* variables to make timer work */
  this.expected;
  this.drift = 0;
  this.date;
  this.interval = 60 / BPM * 1000

  /* Toggles pause and play */
  const PausePlay = () => {
    setIsPlaying(isPlaying => !isPlaying);
    setPausePlayIcon(PausePlayIcon => (PausePlayIcon === "caretright" ? "pause" : "caretright"));

    setMeasure(-1);
    this.drift = 0;
  }

  /* Plays sound. The function is async playing an audio file is asynchronous. */
  async function playSound() {
    /* Play sound, accenting the down beat */
    const { sound } = await Audio.Sound.createAsync((measure % beat == 0) ? accentSoundFile : selectedSoundFile);
    setSound(sound);
    await sound.playAsync();

    /* increment measure and calculate drift */
    setMeasure(measure => (measure + 1));
    this.actual = Date.now();
    this.drift = (this.actual - this.expected);
    console.log(measure);
    console.log("drift ", this.drift);
  }

  /* start metronome by incrementing measure*/
  useEffect(() => {
    console.log(isPlaying);
    if (isPlaying) {
      setMeasure(measure => (measure + 1));
    }
  }, [isPlaying]);

  /* call playSound every interval, taking into account the drift */
  useEffect(() => {
    if (isPlaying && measure >= 0) {
      this.expected = Date.now() + this.interval - this.drift;
      setTimeout(playSound, this.interval - this.drift);
    }
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [measure]); // this function is called every time the measure updates. This allows the metronome to act recursively while also allowing for hook updates



  /*update the beat sound (paired)*/
  useEffect(() => {
    switch (selectedSound) {
      case 'Clap':
        setSelectedSoundFile(require('./../assets/sounds/clap/clap.mp3'));
        setAccentSoundFile(require('./../assets/sounds/metronome/edit-metronome-accent-sound.mp3'));
        break;
      case 'Drum':
        setSelectedSoundFile(require('./../assets/sounds/drum/floor_tom.mp3'));
        setAccentSoundFile(require('./../assets/sounds/drum/snare_drum.mp3'));
        break;
      case 'Piano':
        setSelectedSoundFile(require('./../assets/sounds/piano/piano_c3.mp3'));
        setAccentSoundFile(require('./../assets/sounds/metronome/edit-metronome-accent-sound.mp3'));
        break;
      case 'Shotgun':
        setSelectedSoundFile(require('./../assets/sounds/shotgun/Shotgun.mp3'));
        setAccentSoundFile(require('./../assets/sounds/shotgun/Shotgun2.mp3'));
        break;
      case 'Snap':
        setSelectedSoundFile(require('./../assets/sounds/snap/snap-click.mp3'));
        setAccentSoundFile(require('./../assets/sounds/snap/snap-accent.mp3'));
        break;
      default:
        setSelectedSoundFile(require('./../assets/sounds/metronome/metronomesound.mp3')); // Default
        setAccentSoundFile(require('./../assets/sounds/metronome/edit-metronome-accent-sound.mp3'));
    }
  }, [selectedSound]);

  /* Main app layout */
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Beatle</Text>
      </View>
      <Button image={pausePlayIcon} onPress={PausePlay} w={250} h={100} />
      <View style={styles.updates}>
        <View style={styles.counters}>
          <View style={styles.boxed}>
            <Text style={styles.subtitle}> Tempo</Text>
            <BoxyBox w={200} h={100} value={BPM} setValue={setBPM} min={20} max={200} />
          </View>
          <View style={styles.boxed}>
            <Text style={styles.subtitle}> Beat</Text>
            <BoxyBox w={200} h={100} value={beat} setValue={setBeat} min={1} max={12} />
          </View>
        </View>
        <View style={styles.sounds}>
          <View style={styles.boxed}>
            <Text style={styles.subtitle}> Sound</Text>
            <SelectList setSelectedSound={(val) => setSelectedSound(val)}
              data={soundList} save="value"
              boxStyles={{ backgroundColor: '#ff6900' }}
              dropdownTextStyles={{ color: '#ff6900' }}
              placeholder="Sound"
              search={false}
              style={styles.dropDown}
            />
          </View>
          <View style={styles.nav}>
            <Button label={'New Track'} onPress={() => navigation.navigate('Trackbuilder')} w={80} h={50}></Button>
          </View>
        </View>
      </View>
    </View>
  );
}

/* StyleSheets */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    padding: 50,
  },
  title: {
    color: '#f0f5f5',
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: 100
  },
  updates: {
    flexDirection: "row",
    padding: 50,
    justifyContent: "center",
    columnGap: 25
  },
  subtitle: {
    color: '#f0f5f5',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center'
  },
  counters: {
    justifyContent: 'space-between',
    rowGap: 20
  },
  boxed: {
    rowGap: 10,
  },
  sounds: {
    justifyContent: 'flex-start',
    rowGap: 110,
  },
  nav: {
    justifyContent: 'flex-start',
  }

});