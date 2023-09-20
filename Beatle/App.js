import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useState } from "react";

//import other files
import Button from './components/Button';


export default function App() {
  {/* hooks */}
  const [pausePlayIcon, setPausePlayIcon] = useState("caretright")
  
  {/* controls for hitting pause play button*/}
  const PausePlay = () => {
    if (pausePlayIcon == "caretright") {
      setPausePlayIcon("pause")
    }else{
      setPausePlayIcon("caretright")
    }
  }

  {/*main app layout*/}
  return (
    <View style={styles.container}>
      <Text style={{ color: 'peru' }}>Welcome to Beatle!</Text>
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
    backgroundColor: 'mistyrose',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerContainer: {
    flex: 1 / 3,
    alignItems: 'center',
  },
});
