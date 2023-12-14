/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-props-no-multi-spaces */
/* eslint-disable no-unused-expressions */
/* eslint-disable import/named */
/* eslint-disable import/extensions */
/* eslint-disable no-plusplus */
/* eslint-disable react/no-this-in-sfc */
/* eslint-disable no-shadow */
/* eslint-disable global-require */
/* eslint-disable no-use-before-define */
/* eslint-disable react/prop-types */
/* Trackbuilder.js */

/* Import react components */
import * as React from 'react';
import {
  // add KeyboardAvoidingView and ScrollView (A)
  StyleSheet, Text, View, KeyboardAvoidingView, ScrollView, FlatList, TouchableOpacity, TextInput,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { useRoute } from '@react-navigation/native';

/* Import component files */
import { Audio } from 'expo-av';
import { AntDesign } from '@expo/vector-icons';
import { Modal } from '../components/Modal.tsx';

/* Import component files */
import PausePlayButton from '../components/PausePlayButton';
import AddMeasure from '../components/AddMeasure.js';
import SoundModal, { switchSound } from '../components/SoundSelection';
import SoundButton from '../components/SoundButton';
import SavedTracks from '../components/SavedTracks.js';

/* Import style files */
import { stylesMain } from '../styles/stylesMain.js';
import { COLORS } from '../styles/colors';
import TrackbuilderWriting from '../components/TrackbuilderWriting.js';

/* hard coded click track */
const measures = [
  {
    number: 1,
    tempo: 120,
    beat: 4,
  },
  {
    number: 2,
    tempo: 60,
    beat: 3,
  },
  {
    number: 3,
    tempo: 150,
    beat: 5,
  },
];

/**  This function returns a button which represents one measure in the click track
* @param measure: number of measure
* @param onPress: The function called when button pressed
* @param MeasurBoxolor: Color of the button, will change based on whether button is selected
* @param textColor: color of text, will change based on whether button is selected
*
* @return the touchable opacity representing the measure
*/
function MeasureBox({
  measure, onPress, MeasureBoxColor, textColor,
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.measureBox, { backgroundColor: MeasureBoxColor }]}
    >
      <View style={[{ flexDirection: 'row', flex: 1, width: 150 }]}>
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
        <View style={[{ alignItems: 'stretch', justifyContent: 'space-evenly' }]}>
          <Text style={[stylesMain.text, { color: textColor, fontSize: 50 }]}>{measure.beat}</Text>
        </View>

        {/* Beats per minute */}
        <View style={{
          alignItems: 'stretch', justifyContent: 'space-evenly', paddingHorizontal: 15,
        }}
        >
          <Text style={[stylesMain.text, { color: textColor, fontSize: 20 }]}>
            {measure.tempo} BPM
          </Text>
        </View>

      </View>
    </TouchableOpacity>
  );
}

/** This function builds the main track builder screen. This is where users can create and play customizable click tracks
 * @param navigation This contains the navigation details for going between pages
 */
export default function TrackbuilderScreen({ navigation }) {

  // get the parameters that have been passed through navigation
  const route = useRoute();
  let id = route.params?.id;

  /* The following section of code controls the various modals that can appear within the trackbuilder
  *
  */

  /** This handles the AddModal, which is where the user can create a new measure and add it to the click track.
   * In particular, this code sets the modal to be visible or invisible.
   */
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const handleAddModal = () => {
    if (isAddModalVisible) {
      addMeasure();
    }
    setIsAddModalVisible(() => !isAddModalVisible);
  };

  /** This handles the SoundModal, which is where the user can change the sound of the click track.
   * In particular, this code sets the modal to be visible or invisible.
   */
  const [isSoundModalVisible, setIsSoundModalVisible] = useState(false);
  const handleSoundModal = () => {
    setIsSoundModalVisible(() => !isSoundModalVisible);
  };

  /** This handles the TrackBuildeWriting Modal, which information about using the app is displayed.
   * In particular, this code sets the modal to be visible or invisible.
   */
  const [isTrackbuilderWritingVisible, setIsTrackbuilderWritingVisible] = useState(false);
  const handleTrackbuilderWriting = () => {
    setIsTrackbuilderWritingVisible(() => !isTrackbuilderWritingVisible);
  };

  /** This handles the SavedTracks Modal, stores and displays a user's saved tracks
   * In particular, this code sets the modal to be visible or invisible.
   * If the user is not logged in, it redirects them to the log in page.
   */
  const [isSavedTrackVisible, setIsSavedTrackVisible] = useState(false);
  const handleSavedTrackModal = () => {
    if (id) {
      setIsSavedTrackVisible(() => !isSavedTrackVisible);
    } else {
      navigation.navigate('LogIn');
    }
  };

   /** This handles the user's login. If the user has logged in, it will log them out.
   * In particular, this code sets the modal to be visible or invisible.
   */
   const [loginText, setLoginText] = useState('Log In');
   const handleLogIn = () => {
     if (id) {
       id = null;
       //console.log('user:', id);
       setLoginText('Log In');
     } else {
       navigation.navigate('LogIn');
     }
    // console.log('when I press login the user is:', id);
   };

   /** This helps to correctly change the text of the login logout button
    */
   useEffect(() => {
    //console.log('the user was changed. It is now: ', id);
    id ? setLoginText('Log Out') : setLoginText('Log In');
  }, [id]);

  /** This function is supposed to save a track into the database. However, It is currently not implemented */
  const SaveTrack = () => {
    if (!id) {
      navigation.navigate('LogIn');
    }
    // TODO add in save track code
    console.log('save track');
  };

    /** this section of code updates the value of selected measure
   * @param item the measure that was selected and should be made the selected measure
   * 
   * @return updates value of selectedMeasure
   */
    const [selectedMeasure, setSelectedMeasure] = useState();
    const selectMeasure = (item) => {
      if (selectedMeasure === item.number) {
        setSelectedMeasure(null);
        setNewMeasureNum(measures.length + 1);
      } else {
        setSelectedMeasure(item.number);
        setNewMeasureNum(item.number + 1);
      }
    };

    /** the folling section of code handles the clicktrack content, rendering the clicktrack onto the screen,
     * and adding or deleting measures.
    */
  
    /** This section of Code renders the MeasureBox onto the screen
     * @param item this is which measure is being rendered
     * 
     * @return returns the MeasureBox, which is a button containing the measure's information
    */
    const renderMeasure = ({ item }) => {
      const MeasureBoxColor = item.number === selectedMeasure ? COLORS.darkOrange : COLORS.orange;
      const color = item.number === selectedMeasure ? COLORS.offWhite : COLORS.background;
  
      return (
        <MeasureBox
          measure={item}
          onPress={() => selectMeasure(item)}
          MeasureBoxColor={MeasureBoxColor}
          textColor={color}
        />
      );
    };

  /** This function hanles creating a new measure and adding it into the current clicktrack
   * It relies on the values in the hooks newTempo, and newBeat to create a new measure
   * it then inserts the measure in location newMeasureNum, and corrects the measureNums of all
   * the other measures
   * @param newMeasureNum the new measure number
   * @param newTempo tempo of measure
   * @param newBeat beat of measure
   * @param measures the clicktrack
   * 
   * @return modified clicktrack
  */
  const [newMeasureNum, setNewMeasureNum] = useState(measures.length + 1);
  const [newTempo, setNewTempo] = useState(60);
  const [newBeat, setNewBeat] = useState(4);
  const addMeasure = () => {
    if (newTempo !== '' && newBeat !== '' && newMeasureNum !== '') {
      //console.log(newMeasureNum);
      //console.log((newMeasureNum < 1) ? 1 : newMeasureNum);
      const newMeasureNumCorr = (newMeasureNum < 1) ? 1 : newMeasureNum;
      const newMeasure = {
        number: newMeasureNumCorr,
        tempo: newTempo,
        beat: newBeat,
      };
      measures.splice(newMeasureNumCorr - 1, 0, newMeasure);
      for (let i = 0; i < measures.length; i++) {
        measures[i].number = i + 1;
      }
      setNewMeasureNum(measures.length);
    }
  };

  /** This function deletes a selected measure and updates the clicktrack accordingly
   * @param selectedMeasure the measure that will be deleted
   * @param measures the clicktrack
   * 
   * @return the updated clicktrack
   */
  const flatListRef = useRef(null);
  const deleteMeasure = () => {
    if (selectedMeasure != null) {
      measures.splice(selectedMeasure - 1, 1);
      // Update the 'number' property of the remaining measures
      for (let i = 0; i < measures.length; i++) {
        measures[i].number = i + 1;
      }
      flatListRef.current.forceUpdate();
    }
  };
  
  /** This function reads the clicktrack and generates a list of the sound and tempo of each beat 
   * @param measures the clicktrack
   * 
   * @return set the values of newTempoList and newCountList
  */
  function setUpTrack() {
    const newCountList = [];
    const newTempoList = [60]; // initialized so that tempos line up with measures
    let i;
    measures.forEach((measure) => {
      for (i = 0; i < measure.beat; i++) {
        if (i === 0) { newCountList.push(1); } else { newCountList.push(0); }
        newTempoList.push(measure.tempo);
      }
    });
    setBeatList(newCountList);
    setTempoList(newTempoList);
  }

  /* The following code implements playing of the clicktrack
  *
  * */
 /** These control whether the clictrack is playing */
  const [isPlaying, setIsPlaying] = useState(false);
  const [pausePlayIcon, setPausePlayIcon] = useState('caretright');

  /** these determine what sound to play */
  const [selectedSound, setSelectedSound] = React.useState('Default'); // Initialize selected state with default sound
  const [selectedSoundFile, setSelectedSoundFile] = useState(require('../assets/sounds/metronome/metronomesound.mp3')); // sound file of selected sound
  const [accentSoundFile, setAccentSoundFile] = useState(require('../assets/sounds/metronome/metronomeaccent.mp3'));
  // eslint-disable-next-line no-unused-vars
  const [silentSoundFile, setSilentSoundFile] = useState(require('../assets/sounds/silent/silence.mp3'));
  const [sound, setSound] = useState(); // current loaded sound

  /** This keeps track of what beat the track is on */
  const [count, setCount] = useState(-1); // current beat

  /** this keep track of number of beats and the tempos of each measure */
  const [beatList, setBeatList] = useState([]); // list of all the accent values of each beat
  const [tempoList, setTempoList] = useState([]); // list of tempos for each beat

  let expected;     
  let actual;       
  let drift = 0; 

  /** This function hangles whether the track should start or stop playing.
   * @param isPlaying tells if the function is currently playing'
   * @param PausePlayIcon the image displayed on the pause play button
   */
  const PausePlay = () => {
    setIsPlaying((isPlaying) => !isPlaying);
    setPausePlayIcon((PausePlayIcon) => (PausePlayIcon === 'caretright' ? 'pause' : 'caretright'));
    setCount(-1);
    drift = 0;
  };

    /** this code triggers the clicktrack to start playing  by incrementing count*/
    useEffect(() => {
      // Temporaraly commented out to make eslist happy
      // console.log(isPlaying);
  
      if (isPlaying) {
        setUpTrack();
        setCount((count) => (count + 1));
      }
    }, [isPlaying]);

  /** This function plays a beat by loading the sound, playing it, and incrementing the count, 
   * which triggers the next sound
   * @param expected when we expect the beat to occur
   * @param actual when the beat actually occurs
   * @param drift variation between expected beat and actual beat
   * @param beatlist what beat are they on?
   * @param accentSoundFile sound of accent beat
   * @param selectedSoundFile sound of selected sound
  */
  async function playSound() {
    if (count < beatList.length) {
      // Play sound, accenting the down beat
      const { sound } = await Audio.Sound.createAsync(
        (beatList[count] === 1) ? accentSoundFile : selectedSoundFile,
      );
      setSound(sound);
      await sound.playAsync();

      // increment to next count and calculate drift
      setCount((count) => (count + 1));
      actual = Date.now();
      drift = (actual - expected);

      // console.log(count);
      // console.log('drift ', drift);
    } else {
      PausePlay();
    }
  }

  /** this code calls the next beat to start playing by setting up the expected, and calling a timeout 
   * @param isPlaying is the clicktrack playing
   * @param tempoList list of tempos throughout clicktrack
   * @param expected when the next beat should be
   * @param drift how much the beat is off
  */
  useEffect(() => {
    if (isPlaying && count >= 0) {
      // Temporaraly commented out to make eslist happy
      // console.log(count);
      // console.log(tempoList[count]);

      expected = Date.now() + ((60 / tempoList[count]) * 1000) - drift;
      setTimeout(playSound, ((60 / tempoList[count]) * 1000) - drift);
    }
    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [count]);

  /** this code  switches the sound that the clicktrack is using when the user changes selectedSound
   * @param selectedSound the sound pair that should be played
  */
  useEffect(() => {
    switchSound(selectedSound, setSelectedSoundFile, setAccentSoundFile, setSilentSoundFile);
  }, [selectedSound]);

  
  //* These are hooks meant to help with the implementation of the database
  const[selectedTrackID, setSelectedTrackID] = useState(0);
  const[selectedTrackName, setSelectedTrackName] = useState('New Track');

  // add a keyboard avoiding view and a scroll view, but currently getting warning (A)
  return (
    <KeyboardAvoidingView
      // behavior={isIOS ? "padding" : "height"}
      enabled
      style={{ flex: 1 }}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEnabled
      >
        <View style={stylesMain.container}>
          {/* Header */}
          <View style={[stylesMain.header, { flexDirection: 'row' }]}>
            <View style={[stylesMain.subView, { flex: 1, alignItems: 'center', justifyContent: 'flex-end' }]}>
              <TouchableOpacity
                style={[stylesMain.smallButton, { backgroundColor: COLORS.background }]}
                onPress={handleLogIn}
              >
                <Text style={[stylesMain.text, { color: COLORS.orange }]}>{loginText}</Text>
              </TouchableOpacity>
              {/* Page Title */}
            </View>
            <View style={[stylesMain.header, { flex: 3, height: '100%' }]}>
              <Text style={stylesMain.title}>Trackbuilder</Text>
            </View>
            {/* Info button */}
            <View style={[stylesMain.subView, { flex: 1 }]}>
              <TouchableOpacity
                style={[stylesMain.backButton,
                  { backgroundColor: COLORS.buttonBackground, width: 50 }]}
                onPress={handleTrackbuilderWriting}
              >
                <AntDesign name="question" size={24} color={COLORS.offWhite} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Main body of code */}
          <View style={[stylesMain.body, {}]}>
            {/* Pause Play Button */}
            <View style={{ flex: 1.5, justifyContent: 'center' }}>
              <PausePlayButton onPress={PausePlay} pausePlayIcon={pausePlayIcon} width={300} />
            </View>

            {/* Track Title */}
            <View style={{ flex: 6 }}>
              <View style={{ alignItems: 'center', paddingBottom: 5 }}>
                <TextInput
                  onChangeText={(text) => setSelectedTrackName(text)}
                  value={selectedTrackName}
                  defaultValue={selectedTrackName}
                  cursorColor={COLORS.orange}
                  style={{ width: 300 }}
                  backgroundColor={COLORS.background}
                  // borderBottomWidth={2}'
                  // borderBottomColor={COLORS.orange}
                  color={COLORS.offWhite}
                  fontSize={20}
                  fontWeight="bold"
                  textAlign="center"
                />
              </View>
              
              {/* Display of TrackList */}
              <View style={{ maxHeight: 250 }}>
                {/* warning may be caused by use of FlatList within ScrollView,
                potential solution to use SectionList instead */}
                <FlatList
                  ref={flatListRef}
                  data={measures}
                  renderItem={renderMeasure}
                  keyExtractor={(measure) => measure.number}
                  extraData={selectedMeasure}
                  vertical
                  showsVerticalScrollIndicator={false}
                />
              </View>

              {/* interaction buttons */}
              <View style={{ flex: 4, marginTop: 10, alignItems: 'flex-start' }}>
                <View style={{ alignItems: 'flex-start', flex: 2, flexDirection: 'row' }}>
                  {/* Delete measure */}
                  <View style={{ flex: 2, alignItems: 'flex-start' }}>
                    <TouchableOpacity style={[stylesMain.smallButton, {}]} onPress={deleteMeasure}>
                      <Text style={[stylesMain.text]}> Delete </Text>
                    </TouchableOpacity>
                  </View>
                  {/* Add Measure */}
                  <View style={{ flex: 2, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={[stylesMain.smallButton, { flexDirection: 'row' }]} onPress={handleAddModal}>
                      <Text style={[stylesMain.text]}> Add </Text>
                    </TouchableOpacity>
                  </View>
                </View>

                <View style={{ alignItems: 'flex-start', flex: 2, flexDirection: 'row' }}>
                  {/* My Tracks */}
                  <View style={{ flex: 2, alignItems: 'flex-start' }}>
                    <TouchableOpacity
                      style={[stylesMain.smallButton, {}]}
                      onPress={handleSavedTrackModal}
                    >
                      <Text style={[stylesMain.text, { color: COLORS.offWhite }]}>My Tracks</Text>
                    </TouchableOpacity>
                  </View>
                  {/* Save Track */}
                  <View style={{ flex: 2, alignItems: 'flex-end' }}>
                    <TouchableOpacity style={[stylesMain.smallButton, {}]} onPress={SaveTrack}>
                      <Text style={[stylesMain.text, { color: COLORS.offWhite }]}>Save Track</Text>
                    </TouchableOpacity>
                  </View>
                </View>
                {/* Sound */}
                <SoundButton onPress={handleSoundModal} w={300} selectedSound={selectedSound} />
              </View>
            </View>
          </View>

          {/* Naviate to metronome */}
          <View style={[stylesMain.footer, {}]}>
            <TouchableOpacity
              style={[stylesMain.flatButton, { width: 300, alignSelf: 'center', marginBottom: 10 }]}
              onPress={() => {
                if (isPlaying) {
                  PausePlay();
                }
                navigation.navigate('Metronome', { id });
              }}
            >
              <Text style={[stylesMain.text, { color: COLORS.background }]}>Metronome </Text>
            </TouchableOpacity>
          </View>

          {/* Add Track Modal */}
          <Modal isVisible={isAddModalVisible}>
            <Modal.Container>
              <Modal.Body>
                <AddMeasure
                  newMeasureNum={newMeasureNum}
                  setNewMeasureNum={setNewMeasureNum}
                  newTempo={newTempo}
                  setNewTempo={setNewTempo}
                  newBeat={newBeat}
                  setNewBeat={setNewBeat}
                  isModalVisible={isAddModalVisible}
                  setIsModalVisible={setIsAddModalVisible}
                  handleModal={handleAddModal}
                />
              </Modal.Body>
            </Modal.Container>
          </Modal>

          {/* SoundModal */}
          <Modal isVisible={isSoundModalVisible}>
            <Modal.Container>
              <Modal.Body>
                <SoundModal
                  selectedSound={selectedSound}
                  setSelectedSound={setSelectedSound}
                  isModalVisible={isSoundModalVisible}
                  setIsModalVisible={setIsSoundModalVisible}
                  handleModal={handleSoundModal}
                />
              </Modal.Body>
            </Modal.Container>
          </Modal>
            
          {/* Saved Tracks Modal */}
          <Modal isVisible={isSavedTrackVisible}>
            <Modal.Container>
              <Modal.Body>
                <SavedTracks
                  isModalVisible={isSavedTrackVisible}
                  setIsModalVisible={setIsSavedTrackVisible}
                  selectedTrackID={selectedTrackID}
                  setSelectedTrackID={setSelectedTrackID}
                  selectedTrackName={selectedTrackName}
                  setSelectedTrackName={setSelectedTrackName}
                />
              </Modal.Body>
            </Modal.Container>
          </Modal>

          {/* Technical Writing Modal */}
          <Modal isVisible={isTrackbuilderWritingVisible}>
            <Modal.Container>
              <Modal.Body>
                <TrackbuilderWriting
                  isModalVisible={isTrackbuilderWritingVisible}
                  setIsModalVisible={setIsTrackbuilderWritingVisible}
                />
              </Modal.Body>
              {/* </View> */}
            </Modal.Container>
          </Modal>

        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
