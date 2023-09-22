import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useState } from "react";

//import other files
import Button from './components/Button';


export default function App() {
  {/* hooks */ }
  const [pausePlayIcon, setPausePlayIcon] = useState("caretright")

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
      <View style={styles.footerContainer}>
        <Button image={pausePlayIcon} onPress={PausePlay} w={250} h={100} />
      </View>
      <StatusBar style="auto" />
      {
        /* created a box that will be used to adjust tempo and time markings
        /  has caretup icon and caretdown icon and text
        /  TODO: change text to a numerical variable that will change when buttons are pressed (function)
        */
      }
      <View style={styles.boxyBoxes}>
        <View style={styles.plusMinusButtons}>
          <Button image={"caretup"} w={100} h={100} />
          <Button image={"caretdown"} w={100} h={100} />
        </View>
        <View style={styles.plusMinusText}>
          <Text style={{ color: '#000' }}>Random</Text>
        </View>
      </View>
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
    alignItems: 'center',
    // Moved button to bottom of screen
    marginTop: 50,
    padding: 10
  },
  boxyBoxes: {
    height: 200,
    width: 200,
    alignItems: 'center',
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: 5
  },
  plusMinusButtons: {
    alignItems: 'center',
    flex: 1
  },
  plusMinusText: {
    alignItems: 'center',
    flex: 1
  },
});
