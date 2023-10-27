/* Trackbuilder.js */

import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, FlatList } from 'react-native';
import Button from './../components/Button';
import { stylesMain } from './../styles/styleMain';

export default function TrackbuilderScreen({ navigation }) {

    return (
        <View style={stylesMain.container}>
            <View style={stylesMain.header}>
				<Text style={stylesMain.title}>Trackbuilder!</Text>
			</View>
			<Button label={'Play'} onPress={() => navigation.navigate('Metronome')} w={80} h={50}></Button>
        </View>
    );
}