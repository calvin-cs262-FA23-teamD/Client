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
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';
import { useEffect } from 'react';

/* Import sound ability */
import { Audio } from 'expo-av';

/* Import component files */
import Button from './components/Button';
import BoxyBox from './components/BoxyBox';

/* Default sound */
const DefaultClick = require('./assets/metronomesound.mp3');

/* 1000 milliseconds = 1 second */
const BPM = 1000;

/* Main function */
export default function App() {
  /* Hooks */
  const [pausePlayIcon, setPausePlayIcon] = useState("caretright")
  const [sound, setSound] = useState();

  /* Toggles pause and play button. */
  const PausePlay = () => {
    if (pausePlayIcon == "caretright") {
      setPausePlayIcon("pause")
      playSound()
    } else {
      setPausePlayIcon("caretright")
      pauseSound()
    }
  }

  /* Plays sound. The function is async playing an audio file is asynchronous. */
  async function playSound() {
    console.log('Loading Sound');
    const { sound } = await Audio.Sound.createAsync(DefaultClick);
    setSound(sound);
    console.log('Playing sound');
    await sound.playAsync();
  }

  /* Simply pauses sound. */
  async function pauseSound() {
    sound.pauseAsync();
    sound.unloadAsync();
  }

  /* The hook useEffect synchronizes a component with an external system. */
  /* setInterval() implements the BPM */
  useEffect(() => {
    const interval = setInterval(() => {
        sound.playAsync();
    }, BPM);
    return sound
      ? () => {
          console.log('Unloading sound');
          sound.unloadAsync();
          clearInterval(interval)
        }
      : undefined;
  }, [sound]);

  /* Main app layout. */
  return (
    <View style={styles.container}>
      <Text style={{ color: '#f0f5f5', fontWeight: 'bold', fontSize: 24, marginTop: 100 }}>Welcome to Beatle!</Text>
      <Button image={pausePlayIcon} onPress={PausePlay} w={250} h={100} />
      <BoxyBox/>
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
