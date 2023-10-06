import { StyleSheet, View, Pressable, Text } from 'react-native';

import Button from './Button';
// app icons
import { AntDesign } from '@expo/vector-icons';
import { useState } from "react";

export default function BoxyBox({w, h, value, setValue, max=65, min=55}) {
    // hooks

  // this function will add or subtract 1 to the current value
  const changeValue = (direction) => {
    if (direction==true && value<max) {
      setValue(value+1)
    } else if (direction==false && value>min) {
      setValue(value-1)
    }
  }  

  return(
    <View style={[styles.boxyBoxes, { width: w, height: h, flexDirection: 'row', alignItems: 'center' }]}>
      <View style={styles.plusMinusButtons}>
        <Button image={"minus"} w={w/4} h={h} onPress={() => changeValue(false)}/>
      </View>
      <View style={styles.valueText}>
        <Text style={{ color: '#f0f5f5', fontSize: w/5 }}>{value.toString()}</Text>
      </View>
      <View style={styles.plusMinusButtons}>
        <Button image={"plus"} w={w/4} h={h} onPress={() => changeValue(true)}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    boxyBoxes: {
        alignItems: 'center',
        backgroundColor: '#1f2e2e',
        flexDirection: 'row',
        padding: 5,
        border :10
      },
    plusMinusButtons: {
        alignItems: 'center',
        flex: 1
      },
    valueText: {
        alignItems: 'center',
        flex: 1,
      },
})