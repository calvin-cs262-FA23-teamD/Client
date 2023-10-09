/* Beatle -- App.js
 * 
 * (Emma) As of Tues. 9-26-23:
 *    ADDED SOUND! IT CLICKS AT 60 BPM!!!
 * 
 *    Major additions:
 *      expo-av
 *      new "plugin" in app.json
 *      new functions playSound() and pauseSound()
 *      useEffect >:C
 * 
 *    Some sources used: 
 *      https://docs.expo.dev/versions/latest/sdk/av/
 *      https://docs.expo.dev/versions/latest/sdk/audio/
 *      https://react.dev/reference/react/useEffect
 *      https://www.waldo.com/blog/sound-react-native-apps-101-tutorial-examples
 *      https://www.tutorialspoint.com/how-to-call-a-function-repeatedly-every-5-seconds-in-javascript
 *      https://devtrium.com/posts/set-interval-react
 *      https://stackoverflow.com/questions/63570597/typeerror-func-apply-is-not-a-function
 *      https://www.npmjs.com/package/react-native-dropdown-select-list
 */

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useRef, useEffect } from 'react';
/* Import SelectList (Abigail) */
import { SelectList } from 'react-native-dropdown-select-list';

/* Import component files */
import Button from './components/Button';
import BoxyBox from './components/BoxyBox';

/* Import sound ability */
import { Audio } from 'expo-av';


/* Default sound and list of possible sounds*/
const DefaultClick = require('./assets/metronomesound.mp3'); // :) enjoy!
const soundList = [
  { key: '1', value: 'Default' },
  { key: '2', value: 'Bass' },
  { key: '3', value: 'Clap' },
  { key: '4', value: 'Piano' },
  { key: '5', value: 'Shotgun' },
]

/* Main function */
export default function App() {
  /* Hooks */
  const [pausePlayIcon, setPausePlayIcon] = useState("caretright")
  const [selectedSound, setSelectedSound] = React.useState("Default"); // Initialize selected state with default sound
  const [soundFile, setSoundFile] = useState(require('./assets/metronomesound.mp3'));

  /*hooks*/
  var [BPM, setBPM] = useState(60);     //Beats per minute
  var [beat, setBeat] = useState(4);    // how many beats are in a measure
  var [count, setCount] = useState(0);  // which beat of the measure are we on
  var [sound, setSound] = useState();   // sound that is currently loaded
  var [isPlaying, setIsPlaying] = useState(false);  // is the metronome currently playing

  let metronomeInterval;  // time between each beat

  /* Toggles pause and play button. */
  const PausePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true)
      setPausePlayIcon("pause");
      playSound()
    } else {
      setIsPlaying(false)
      setPausePlayIcon("caretright");
      clearInterval(metronomeInterval); // Stop the metronome loop
    }
  }

  /* Plays sound. The function is async playing an audio file is asynchronous. */
  async function playSound() {
    // Play sound, accenting the down beat
    console.log(count);
    setCount((count + 1) % beat);
    if (count == 0) {
      const { sound } = await Audio.Sound.createAsync(soundFile);
      setSound(sound);
      await sound.playAsync();
    } else {
      const { sound } = await Audio.Sound.createAsync(DefaultClick);
      setSound(sound);
      await sound.replayAsync();
    }
    console.log(isPlaying);
  }

  /*update the accent beat sound*/
  useEffect(() => {
    switch (selectedSound) {
      case 'Bass':
        setSoundFile(require('./assets/bass_c.mp3'));
        break;
      case 'Clap':
        setSoundFile(require('./assets/clap.mp3'));
        break;
      case 'Piano':
        setSoundFile(require('./assets/piano_c3.mp3'));
        break;
      case 'Shotgun':
        setSoundFile(require('./assets/shotgun.mp3'));
        break;
      default:
        setSoundFile(require('./assets/metronomesound.mp3')); // Default
    }
  },[selectedSound]);


  /* setInterval() implements the metronome playing at a sepecific BPM */
  useEffect(() => {

    if (sound && isPlaying) {
      let interval = (60 / BPM) * 1000;

      // Start the metronome loop
      metronomeInterval = setInterval(() => {
        playSound(); // Play the sound at the specified BPM interval
      }, interval); // BPM value works in reverse rn, higher=slower
    }
    
    return () => {
      console.log('Unloading sound');
      if (sound) {
        sound.unloadAsync();
      }
      clearInterval(metronomeInterval);
    };
  }, [sound, isPlaying, BPM]);

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
            <SelectList setSelected={(val) => setSelectedSound(val)}
              data={soundList} save="value"
              boxStyles={{ backgroundColor: '#ff6900' }}
              dropdownTextStyles={{ color: '#ff6900' }}
              placeholder="Sound"
              search={false}
              style={styles.dropDown}
            />
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
    columnGap: 40
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
  }


});
