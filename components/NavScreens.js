import { StyleSheet, View, Pressable, Text } from 'react-native';
import Button from './Button';

export default function NavScreens() {
  return (
    <View style={[styles.button, { width: w, height: h, flexDirection: 'row', alignItems: 'center' }]}>
      <View style={styles.valueText}>
        <Text style={{ color: '#f0f5f5', fontSize: w / 5 }}>{value.toString()}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    button: {
        alignItems: 'right',
        backgroundColor: '#1f2e2e',
        flexDirection: 'row',
        padding: 5,
        border: 10
    },
})