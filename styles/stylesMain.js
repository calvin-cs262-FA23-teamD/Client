/* eslint-disable linebreak-style */
/* eslint-disable import/prefer-default-export */
/* eslint-disable import/named */
import { StyleSheet } from 'react-native';

import { COLORS } from './colors';

export const stylesMain = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  header: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end',
    flex: 1.5,
  },

  body: {
    flex: 10,
    justifyContent: 'center',
    width: '100%',
  },

  footer: {
    flex: 0.75,
    width: '100%',
    alignContent: 'flex-end',
    justifyContent: 'center',
    paddingBottom: 12,
  },

  title: {
    color: COLORS.offWhite,
    fontWeight: 'bold',
    fontSize: 26,
    marginTop: -5,
  },

  text: {
    color: COLORS.offWhite,
    fontWeight: 'bold',
    fontSize: 20,
  },

  updates: {
    flexDirection: 'column',
    padding: 10,
    justifyContent: 'center',
    alignSelf: 'center',
    columnGap: 25,
  },

  subView: {
    justifyContent: 'flex-start',
    rowGap: 10,
    width: '100%',
    alignItems: 'center',
  },

  boxed: {
    rowGap: 7,
  },

  // for log in and sign up screens
  orangeButton: {
    backgroundColor: '#ff6900', // Set the background color to orange
    borderRadius: 5, // Add border radius for rounded corners
    padding: 10,
    marginTop: 5,
    width: 250,
    justifyContent: 'center',
    alignSelf: 'center',
  },

  buttonText: {
    color: 'white', // Set the text color to white
    textAlign: 'center',
  },
  // end for log in and sign up screens

  // Button (used for the play-pause)
  buttonContainer: {
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 3,
  },

  button: {
    borderRadius: 25,
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
    color: COLORS.offWhite,
    fontSize: 16,
  },

  // this is the main type of button in the trackbuilder
  flatButton: {
    borderRadius: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: 300,
    height: 50,
    backgroundColor: COLORS.orange,
  },

  smallButton: {
    borderRadius: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: 150,
    height: 50,
    backgroundColor: COLORS.buttonBackground,
  },

  backButton: {
    borderRadius: 20,
    marginHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    width: 50,
    height: 50,
    backgroundColor: COLORS.orange,
  },

  // BoxyBox (used for tempo and beat counters)
  boxyBoxes: {
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: COLORS.buttonBackground,
    padding: 5,
    border: 10,
  },

  plusMinusButtons: {
    alignItems: 'center',
    flex: 1,
  },

  valueText: {
    alignItems: 'center',
    flex: 1,
  },
});
