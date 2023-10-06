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
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useRef, useEffect } from 'react';
/* Import SelectList (Abigail) */
import { SelectList } from 'react-native-dropdown-select-list';

/* Import sound ability */
import { Audio } from 'expo-av';

/* Import component files */
import Button from './components/Button';
import BoxyBox from './components/BoxyBox';
import { load } from 'mime';

/* Default sound */
const DefaultClick = require('./assets/metronomesound.mp3'); // :) enjoy!

/* Second sound (Abigail) */
const BackupClick = require('./assets/shotgun.mp3');

/* Main function */
export default function App() {
  /* Hooks */
  const [pausePlayIcon, setPausePlayIcon] = useState("caretright")

  // Test (Abigail)
  const [selected, setSelected] = React.useState("");

  // Create data "array" (Abigail)
  const soundList = [
    { key: '1', value: 'Default' },
    { key: '2', value: 'Bass' },
    { key: '3', value: 'Clap' },
    { key: '4', value: 'Piano' },
    { key: '5', value: 'Shotgun' },
  ]
  /*tempo stores the current tempo */
  //These were set as constant variables, i dunno if var will fix all the probs, but now we can change them
  var [tempo, setTempo] = useState(60)
  var [beat, setBeat] = useState(4)
  var [sound, setSound] = useState();
  var [isPlaying, setIsPlaying] = useState(false);

  let metronomeInterval;

  /* Toggles pause and play button. */
  const PausePlay = () => {
    if (!isPlaying) {
      setIsPlaying(true)
      setPausePlayIcon("pause");
      setIsPlaying(true)
      playSound()
    } else {
      setIsPlaying(false)
      setPausePlayIcon("caretright"); 
      clearInterval(metronomeInterval); // Stop the metronome loop
      setIsPlaying(false);              // set isPLaying to false
    }
  }

  async function loadSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(DefaultClick);
    setSound(sound);
  }
  /* Plays sound. The function is async playing an audio file is asynchronous. */
  async function playSound() {
    console.log('Playing sound');
    await sound.playAsync();
  }

  /* The hook useEffect synchronizes a component with an external system. */
  /* setInterval() implements the BPM */
  useEffect(() => {

    if (sound && isPlaying) {

      loadSound();
      let interval = (60 / tempo) * 1000;

      // Start the metronome loop
      metronomeInterval = setInterval(() => {
        playSound(); // Play the sound at the specified BPM interval
      }, interval); // Tempo value works in reverse rn, higher=slower
    }

    // Clean up when the component unmounts
    // Is there a way to change this so it only unloads when it stops/is paused?
    // I got the most slowdown when it kept having to load and unload the sound
    return () => {
      console.log('Unloading sound');
      if (sound) {
        sound.unloadAsync();
      }
      clearInterval(metronomeInterval);
    };
  }, [sound, isPlaying, tempo]);

  /* Main app layout */
  return (
    <View style={styles.container}>
      <SelectList setSelected={(val) => setSelected(val)} data={soundList} save="value" dropdownTextStyles={{ color: '#ff6900' }} placeholder="Sound" search='false' inputStyles={{ color: '#fff' }} />
      <Text style={{ color: '#f0f5f5', fontWeight: 'bold', fontSize: 24, marginTop: 100 }}>Welcome to Beatle!</Text>
      <Button image={pausePlayIcon} onPress={PausePlay} w={250} h={100} />
      <Text> </Text>
      <BoxyBox w={200} h={100} value={tempo} setValue={setTempo} min={20} max={200} />
      <Text> </Text>
      <BoxyBox w={200} h={100} value={beat} setValue={setBeat} min={1} max={12} />
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
});
