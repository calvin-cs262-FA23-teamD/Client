import { StyleSheet, View, Pressable, Text } from 'react-native';

// app icons
import { AntDesign } from '@expo/vector-icons'; 


//standard button function. inludes optional text and image
// currently the color of this is hardcoded, but we should prbably change that at some point
export default function Button({ label, image, onPress }) {
  return (
    <View style={styles.buttonContainer}>
      <Pressable 
        style={[styles.button, { backgroundColor: "#1f2e2e" }]}
        onPress={onPress}
      >
        <AntDesign name= {image} size={24} color="#ff6900" />
        {/*photo*/}
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

// style sheets
const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 68,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: '#ff6900',
    fontSize: 16,
  },
});
