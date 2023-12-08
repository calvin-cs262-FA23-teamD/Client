/* eslint-disable linebreak-style */
/* eslint-disable react/prop-types */
/* eslint-disable global-require */
/* eslint-disable import/prefer-default-export */

import * as React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list'; // dropdown list for selecting sound

/* Import style code */
import { AntDesign } from '@expo/vector-icons';
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

export async function switchSound(selectedSound, setSelectedSoundFile, setAccentSoundFile) {
  switch (selectedSound) {
    /* case 'Clap':
      setSelectedSoundFile(require('../assets/sounds/clap/clap-click.mp3'));
      setAccentSoundFile(require('../assets/sounds/clap/clap-accent.mp3'));
      break; */
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

export function SoundSelection({ setSelectedSound, w }) {
  return (
    <View style={[stylesMain.subView]}>
      <View style={stylesMain.boxed}>
        <Text style={[stylesMain.text, { alignSelf: 'center' }]}>Sound</Text>
        <SelectList
          setSelected={(val) => setSelectedSound(val)}
          data={soundList}
          save="value"
          boxStyles={{ backgroundColor: COLORS.orange, width: w }}
          dropdownStyles={{ position: 'absolute', width: '100%' }}
          dropdownTextStyles={{ color: COLORS.orange }}
          placeholder="Default"
          search={false}
          maxHeight={100}
        />
      </View>
    </View>
  );
}

// export SoundModal
export default function SoundModal({
  selectedSound, setSelectedSound,
  isModalVisible, setIsModalVisible,
  // eslint-disable-next-line no-unused-vars
  handleModal,
}) {
  const selectSound = (item) => {
    if (selectedSound !== item.value) {
      setSelectedSound(item.value);
    }
  };

  const renderSoundButton = ({ item }) => {
    const SoundButtonColor = item.value === selectedSound ? '#a23600' : '#ff6900';
    const textColor = item.value === selectedSound ? '#f0f5f5' : '#0a0e0f';

    return (
      <TouchableOpacity
        style={[stylesMain.flatButton,
          {
            backgroundColor: SoundButtonColor,
            width: 300,
            alignSelf: 'center',
            marginBottom: 10,
          },
        ]}
        onPress={() => selectSound(item)}
      >
        <Text style={[stylesMain.text, { color: textColor }]}>{item.value}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={{ height: 500, width: '100%' }}>
      <View style={{
        flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20,
      }}
      >
        <Text style={[stylesMain.title, { marginTop: 0 }]}> Select Sound </Text>
      </View>
      <View style={{ flex: 5, padding: 10, justifyContent: 'center' }}>

        <FlatList
          // ref={flatListRef}
          data={soundList}
          renderItem={renderSoundButton}
          keyExtractor={(sound) => sound.key}
          extraData={selectedSound}
          vertical
          showsVerticalScrollIndicator
        />

      </View>
      <View style={{
        flex: 1,
        paddingBottom: 12,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity
            style={[stylesMain.flatButton, { backgroundColor: COLORS.orange, width: 50 }]}
            onPress={() => setIsModalVisible(() => !isModalVisible)}
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.background} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export function SoundButton({ onPress, w, selectedSound }) {
  return (
    <View style={[stylesMain.subView, { paddingBottom: 40 }]}>
      <View style={stylesMain.boxed}>
        <Text style={[stylesMain.text, { alignSelf: 'center', marginBottom: -5 }]}>Sound:</Text>
        <TouchableOpacity
          style={[stylesMain.flatButton, {
            alignSelf: 'center',
            marginBottom: 10,
            backgroundColor: COLORS.buttonBackground,
            width: w,
          }]}
          onPress={onPress}
        >
          <Text style={stylesMain.text}>
            {selectedSound}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
