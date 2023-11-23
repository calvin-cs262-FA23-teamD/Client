/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable import/prefer-default-export */

import * as React from 'react';
import { Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'; // dropdown list for selecting sound

/* Import style code */
import { stylesMain } from '../styles/styleMain';
import { COLORS } from '../styles/colors';

/* Default sound and list of possible selectedSounds */
const soundList = [
  { key: '1', value: 'Default' },
  { key: '2', value: 'Clap' },
  { key: '3', value: 'Drum' },
  { key: '4', value: 'Piano' },
  { key: '5', value: 'Shotgun' },
  // Snap contributed by Abigail's friend Noah
  { key: '6', value: 'Snap' },
];

export async function switchSound(selectedSound, setSelectedSoundFile, setAccentSoundFile) {
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
}

export default function SoundSelection({ setSelectedSound, w }) {
  return (
    <View style={[stylesMain.subView]}>
      <View style={stylesMain.boxed}>
        <Text style={[stylesMain.text, { alignSelf: 'center' }]}>Sound</Text>
        <SelectList
          setSelected={(val) => setSelectedSound(val)}
          data={soundList}
          save="value"
          boxStyles={{ backgroundColor: COLORS.orange, width: w }}
          dropdownTextStyles={{ color: COLORS.orange }}
          placeholder="Default"
          search={false}
          maxHeight={100}
        />
      </View>
    </View>
  );
}
