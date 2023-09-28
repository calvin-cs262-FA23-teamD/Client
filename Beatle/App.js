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
 */

import * as React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState, useRef, useEffect } from 'react';

/* Import sound ability */
import { Audio } from 'expo-av';


/* Import component files */
import Button from './components/Button';
import BoxyBox from './components/BoxyBox';

/* Default sound */
const DefaultClick = require('./assets/metronomesound.mp3');

/* Main function */
export default function App() {
  /* Hooks */
  const [pausePlayIcon, setPausePlayIcon] = useState("caretright")

  /*tempo stores the current tempo */
  const [tempo, setTempo] = useState(60)
  const [beat, setBeat] = useState(4)
  const [sound, setSound] = useState();
  const [isPlaying, setIsPlaying] = useState(false);

  let metronomeInterval;

  /* Toggles pause and play button. */
  const PausePlay = () => {
    if (pausePlayIcon == "caretright") {
      setPausePlayIcon("pause")
      setIsPlaying(true)
      playSound()
    } else {
      setPausePlayIcon("caretright")
      clearInterval(metronomeInterval); // Stop the metronome loop
      setIsPlaying(false);              // set isPLaying to false
    }
  }

  /* Plays sound. The function is async playing an audio file is asynchronous. */
  async function playSound() {
    console.log('Loading Sound');
    const {sound } = await Audio.Sound.createAsync(DefaultClick);
    setSound(sound);
    console.log('Playing sound');
    await sound.playAsync();
  }

  /* The hook useEffect synchronizes a component with an external system. */
  /* setInterval() implements the BPM */

  useEffect(() => {

    if (sound && isPlaying) {
      // Calculate the interval based on the BPM

      // Start the metronome loop
      metronomeInterval = setInterval(() => {
        playSound(); // Play the sound at the specified BPM interval
      },500);
    }

    // Clean up when the component unmounts
    return () => {
      console.log('Unloading sound');
      if (sound) {
        sound.unloadAsync();
      }
      clearInterval(metronomeInterval);
    };
  }, [sound, isPlaying]);


  /* Main app layout. */
  return (
    <View style={styles.container}>
      <Text style={{ color: '#f0f5f5', fontWeight: 'bold', fontSize: 24, marginTop: 100 }}>Welcome to Beatle!</Text>
      <Button image={pausePlayIcon} onPress={PausePlay} w={250} h={100} />
      <BoxyBox w={200} h={100} value={tempo} setValue={setTempo} min={20} max = {200}/>
      <BoxyBox w={200} h={100} value={beat} setValue={setBeat} min={1} max = {12}/>
    </View>

  );
}

/* StyleSheets. */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
