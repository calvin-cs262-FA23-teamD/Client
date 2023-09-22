import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from "react";

//import other files
import Button from './components/Button';
import BoxyBox from './components/BoxyBox';


export default function App() {
  {/* hooks */ }
  const [pausePlayIcon, setPausePlayIcon] = useState("caretright")
  const [tempo, setTempo] = useState(60)
  const [beat, setBeat] = useState(4)
  

  {/* controls for hitting pause play button*/ }
  const PausePlay = () => {
    if (pausePlayIcon == "caretright") {
      setPausePlayIcon("pause")
    } else {
      setPausePlayIcon("caretright")
    }
  }

  {/*main app layout*/ }
  return (
    <View style={styles.container}>
      <Text style={{ color: '#f0f5f5', fontWeight: 'bold', fontSize: 24, marginTop: 100 }}>Welcome to Beatle!</Text>
      <Button image={pausePlayIcon} onPress={PausePlay} w={250} h={100} />
      <BoxyBox w={200} h={100} value={tempo} setValue={setTempo} min={20} max = {200}/>
      <BoxyBox w={200} h={100} value={beat} setValue={setBeat} min={1} max = {12}/>
    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0a0e0f',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
