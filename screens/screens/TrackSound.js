/* eslint-disable linebreak-style */
// /* eslint-disable no-lone-blocks */
// /* eslint-disable import/no-unresolved */

// /* eslint-disable no-unused-vars */
// /* Trackbuilder.js */

// import * as React from 'react';
// import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
// import { useState, useRef, useEffect } from 'react';

// import { stylesMain } from './../styles/styleMain';
// import { COLORS } from './../styles/colors';

// // import Modal from "react-native-modal";
// import { Modal } from "../components/MeasureModal"

// /* Import component files */
// import BoxyBox from './../components/BoxyBox';

// /* Import sound ability */
// import { Audio } from 'expo-av';

// { /* hard coded click track */ }

// const measures = [
//   {
//     number: 1,
//     tempo: 168,
//     beat: 3,
//   },
//   {
//     number: 2,
//     tempo: 168,
//     beat: 2,
//   },
//   {
//     number: 3,
//     tempo: 168,
//     beat: 2,
//   },
//   {
//     number: 4,
//     tempo: 168,
//     beat: 3,
//   },
//   {
//     number: 5,
//     tempo: 168,
//     beat: 2,
//   },
//   {
//     number: 6,
//     tempo: 168,
//     beat: 2,
//   },
//   {
//     number: 7,
//     tempo: 168,
//     beat: 3,
//   },
//   {
//     number: 8,
//     tempo: 168,
//     beat: 3,
//   },
//   {
//     number: 9,
//     tempo: 168,
//     beat: 3,
//   },
//   {
//     number: 10,
//     tempo: 168,
//     beat: 3,
//   },
//   {
//     number: 11,
//     tempo: 168,
//     beat: 2,
//   },
//   {
//     number: 12,
//     tempo: 168,
//     beat: 2,
//   },
// ];

// export default function TrackSoundScreen({ navigation }) {
//   return (
//     <View style={stylesMain.container}>
//       <View style={stylesMain.header}>
//         <Text style={stylesMain.title}>Beatle</Text>
//       </View>

//         <View style={[stylesMain.body, { alignItems: 'center' }]}>

//         </View>

//     <View style={stylesMain.footer}>
//     <TouchableOpacity
//        style={[stylesMain.buttons, {}]}
//        onPress={() => navigation.navigate('Trackbuilder'
//        )}>
//         <Text style={[stylesMain.text, {}]}>Trackbuilder </Text>
//     </TouchableOpacity>
//         </View>
//     </View>
//  )
// }
