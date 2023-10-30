import { StyleSheet } from 'react-native';

import { COLORS } from './colors';

export const stylesMain = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    alignItems: 'center',
    justifyContent: 'center',
  },

  header: {
    padding: 15,
  },

  title: {
    color: COLORS.offWhite,
    fontWeight: 'bold',
    fontSize: 24,
    marginTop: -65
  },

  updates: {
    flexDirection: "column",
    padding: 10,
    justifyContent: "center",
    alignSelf: 'center',
    columnGap: 25,
  },

  subtitle: {
    color: COLORS.offWhite,
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center'
  },

  counters: {
    justifyContent: 'space-between',
    rowGap: 15,
  },

  boxed: {
    rowGap: 15,
  },

  sounds: {
    justifyContent: 'flex-start',
    marginTop: 25,
  },

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

  // used on log in/sign up screens
  orangeButton: {
    backgroundColor: 'orange', // Set the background color to orange
    borderRadius: 5, // Add border radius for rounded corners
    padding: 10,
    marginTop: 5,
  },

  buttonText: {
    color: 'white',
    alignSelf: 'center',
  },

  // BoxyBox (used for tempo and beat counters)
  boxyBoxes: {
    borderRadius: 25,
    alignItems: 'center',
    backgroundColor: COLORS.buttonBackground,
    flexDirection: 'row',
    padding: 5,
    border: 10,
  },

  plusMinusButtons: {
    alignItems: 'center',
    flex: 1
  },

  valueText: {
    alignItems: 'center',
    flex: 1,
  },
});
