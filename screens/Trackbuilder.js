/* Trackbuilder.js */

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Button from './../components/Button';

export default function TrackbuilderScreen({ navigation }) {

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Trackbuilder!</Text>
            <Text style={styles.button}>
              <Button label={'Play'} onPress={() => navigation.navigate('Metronome')} w={80} h={50}></Button>
            </Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0a0e0f',
        alignItems: 'center',
        justifyContent: 'center',
        rowGap: 50,
    },
    title: {
        color: '#f0f5f5',
        fontWeight: 'bold',
        fontSize: 19,
        marginTop: 50
    },
    button: {
        justifyContent: 'center',
        fontSize: 10,
    }
});