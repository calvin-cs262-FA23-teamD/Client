/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import * as React from 'react';
import { Text, View } from 'react-native';

/* Import component files */
import BoxyBox from './BoxyBox';
import AccentButtons from './AccentButtons';

/* Import style code */
import { stylesMain } from '../styles/stylesMain';

export default function Counters({
  width,
  beat, setBeat,
  BPM, setBPM,
  buttonStates, setButtonStates,
}) {
  return (
    <View style={[stylesMain.subView, {}]}>
      <View style={stylesMain.boxed}>
        <Text style={[stylesMain.text, { alignSelf: 'center' }]}>Tempo</Text>
        <BoxyBox w={width} h={width / 3} value={BPM} setValue={setBPM} min={20} max={200} />
      </View>
      <View style={stylesMain.boxed}>
        <Text style={[stylesMain.text, { alignSelf: 'center' }]}>  Beat </Text>
        <BoxyBox w={width} h={width / 3} value={beat} setValue={setBeat} min={1} max={12} />
      </View>
      <View style={[stylesMain.boxed, { width: '100%', justifyContent: 'flex-end' }]}>
        <AccentButtons
          numButtons={beat}
          buttonStates={buttonStates}
          setButtonStates={setButtonStates}
          buttonSize={width / 7}
        />
      </View>
    </View>
  );
}
