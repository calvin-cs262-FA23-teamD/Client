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
      width: '100%',
      alignItems: 'center',
    },

    title: {
      color: COLORS.offWhite,
      fontWeight: 'bold',
      fontSize: 24,
      marginTop: -65
    },

    text: {
      color: COLORS.offWhite,
      fontWeight: 'bold',
      fontSize: 20,
    },

    updates: {
      flexDirection: "column",
      padding: 10,
      justifyContent: "center",
      alignSelf: 'center',
      columnGap: 25,
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
