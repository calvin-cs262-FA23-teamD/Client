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
 *      https://github.com/musicandcode/Metronome/blob/main/app.js
 */

import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useState, useRef, useEffect } from 'react';
import { SelectList } from 'react-native-dropdown-select-list';  // dropdown list for selecting sound

/* Import component files */
import Button from './components/Button';
import BoxyBox from './components/BoxyBox';

/* Import sound ability */
import { Audio } from 'expo-av';

/* Import style code */
import { stylesMain } from './styles/styleMain';
import { COLORS } from './styles/colors';

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
export default function App() {
  /* Hooks */
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausePlayIcon, setPausePlayIcon] = useState("caretright");

  const [selectedSound, setSelectedSound] = React.useState("Default"); // Initialize selected state with default sound
  const [selectedSoundFile, setSelectedSoundFile] = useState(require('./assets/sounds/metronome/metronomesound.mp3')); // sound file of selected sound
  const [accentSoundFile, setAccentSoundFile] = useState(require('./assets/sounds/metronome/edit-metronome-accent-sound.mp3'));
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
        setSelectedSoundFile(require('./assets/sounds/clap/clap-click.mp3'));
        setAccentSoundFile(require('./assets/sounds/clap/clap-accent.mp3'));
        break;
      case 'Drum':
        setSelectedSoundFile(require('./assets/sounds/drum/floor_tom_louder.mp3'));
        setAccentSoundFile(require('./assets/sounds/drum/snare_drum_louder.mp3'));
        break;
      case 'Piano':
        setSelectedSoundFile(require('./assets/sounds/piano/piano-click.mp3'));
        setAccentSoundFile(require('./assets/sounds/piano/piano-accent.mp3'));
        break;
      case 'Shotgun':
        setSelectedSoundFile(require('./assets/sounds/shotgun/Shotgun.mp3'));
        setAccentSoundFile(require('./assets/sounds/shotgun/Shotgun2.mp3'));
        break;
      case 'Snap':
        setSelectedSoundFile(require('./assets/sounds/snap/snap-click.mp3'));
        setAccentSoundFile(require('./assets/sounds/snap/snap-accent.mp3'));
        break;
      default:
        setSelectedSoundFile(require('./assets/sounds/metronome/metronomesound.mp3')); // Default
        setAccentSoundFile(require('./assets/sounds/metronome/edit-metronome-accent-sound.mp3'));
    }
  }, [selectedSound]);

  /* Main app layout */
  return (
    <View style={stylesMain.container}>
      <View style={stylesMain.header}>
        <Text style={stylesMain.title}>Beatle</Text>
      </View>

      <Button image={pausePlayIcon} onPress={PausePlay} w={325} h={100} />

      <View style={stylesMain.updates}>
        <View style={stylesMain.counters}>

          <View style={stylesMain.boxed}>
            <Text style={stylesMain.subtitle}>Tempo</Text>
            <BoxyBox w={300} h={100} value={BPM} setValue={setBPM} min={20} max={200} />
          </View>

          <View style={stylesMain.boxed}>
            <Text style={stylesMain.subtitle}>Beat</Text>
            <BoxyBox w={300} h={100} value={beat} setValue={setBeat} min={1} max={12} />
          </View>

        </View>
        <View style={stylesMain.sounds}>

          <View style={stylesMain.boxed}>
            <Text style={stylesMain.subtitle}>Sound</Text>
            <SelectList setSelected={(val) => setSelectedSound(val)}
              data={soundList} save="value"
              boxStyles={{ backgroundColor: COLORS.orange }}
              dropdownTextStyles={{ color: COLORS.orange }}
              placeholder="Sound"
              search={false}
              style={stylesMain.dropDown}
            />
          </View>

        </View>
      </View>
    </View>
  );
}
