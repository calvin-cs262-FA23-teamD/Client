/* eslint-disable linebreak-style */
/* eslint-disable object-curly-newline */
/* eslint-disable react/prop-types */
import * as React from 'react';
import {
  Text, View, TouchableOpacity, StyleSheet
} from 'react-native';

/* Import style code */
import { stylesMain } from '../styles/styleMain';
import { COLORS } from '../styles/colors';

/* The orange squares in the flatlist, each representing a measure */
export default function MeasureBox({
    measure, onPress, MeasureBoxColor, textColor
    }) {
    return (
        <TouchableOpacity
            onPress={onPress}
            //onLongPress={drag}
            //disabled={isActive}
            style={[styles.measureBox, { backgroundColor: MeasureBoxColor }]}
        >
            <View style={[{ flexDirection: 'row', width: 150 }]}>
            {/* measure number */}
            <View style={[{
                alignItems: 'stretch', justifyContent: 'space-evenly', paddingHorizontal: 15,
            }]}
            >
                <Text style={[stylesMain.text, { color: textColor, fontSize: 20 }]}>
                {measure.number}
                </Text>
            </View>

            {/* Beats per measure */}
            <View style={[{alignItems: 'stretch', justifyContent: 'space-evenly' }]}>
                <Text style={
                [stylesMain.text, { color: textColor, fontSize: 50 }]
                }>{measure.beat}</Text>
            </View>

            {/* Beats per minute */}
            <View style={{
                alignItems: 'stretch', justifyContent: 'space-evenly', paddingHorizontal: 15,
            }}
            >
                <Text style={
                [stylesMain.text, { color: textColor, fontSize: 20 }]
                }>{measure.tempo} BPM</Text>
            </View>

            </View>
        </TouchableOpacity>
    );
}

/* StyleSheets */
const styles = StyleSheet.create({

    measureBox: {
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderLeftColor: COLORS.background,
      borderRightColor: COLORS.background,
    },
  
  });