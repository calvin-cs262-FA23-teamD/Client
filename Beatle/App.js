import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from "react";

import Button from './components/Button';


export default function App() {

  const [pausePlayIcon, setPausePlayIcon] = useState("caretright")
  
  const PausePlay = () => {
    if (pausePlayIcon == "caretright") {
      setPausePlayIcon("pause")
    }else{
      setPausePlayIcon("caretright")
    }
  }

  return (
    <View style={styles.container}>
      <Text style={{ color: '#f0f5f5' }}>Welcome to Beatle!</Text>
      <View style={styles.footerContainer}>
        <Button image = {pausePlayIcon} onPress={PausePlay}/>
      </View>
      <StatusBar style="auto" />
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
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
