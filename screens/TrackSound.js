/* Trackbuilder.js */

import * as React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { useState, useRef, useEffect } from 'react';

import Button from './../components/Button';

import { stylesMain } from './../styles/styleMain';
import { COLORS } from './../styles/colors';

//import Modal from "react-native-modal";
import { Modal } from "../components/MeasureModal"

/* Import component files */
import BoxyBox from './../components/BoxyBox';

/* Import sound ability */
import { Audio } from 'expo-av';

{/* hard coded click track */ }
const measures = [
    {
        number: 1,
        tempo: 168,
        beat: 3,
    },
    {
        number: 2,
        tempo: 168,
        beat: 3,
    },
    {
        number: 3,
        tempo: 100,
        beat: 3,
    },
    {
        number: 4,
        tempo: 100,
        beat: 3,
    },
    {
        number: 5,
        tempo: 168,
        beat: 3,
    },
    {
        number: 5,
        tempo: 168,
        beat: 3,
    },
];


export default function TrackSoundScreen({ navigation }) {
    /* Hooks */
    const [isPlaying, setIsPlaying] = useState(false);
    const [pausePlayIcon, setPausePlayIcon] = useState("caretright");

    const [selectedSound, setSelectedSound] = React.useState("Default"); // Initialize selected state with default sound
    const [selectedSoundFile, setSelectedSoundFile] = useState(require('./../assets/sounds/metronome/metronomesound.mp3')); // sound file of selected sound
    const [accentSoundFile, setAccentSoundFile] = useState(require('./../assets/sounds/metronome/metronomeaccent.mp3'));
    const [sound, setSound] = useState();   // current loaded sound

    const [BPM, setBPM] = useState(60);     // beats per minute
    const [count, setCount] = useState(-1); // current count

    const [beatList, setBeatList] = useState([]);
    const [tempoList, setTempoList] = useState([]);


    /* variables to make timer work */
    this.expected;
    this.drift = 0;

    /* Toggles pause and play */
    const PausePlay = () => {
        setIsPlaying(isPlaying => !isPlaying);
        setPausePlayIcon(PausePlayIcon => (PausePlayIcon === "caretright" ? "pause" : "caretright"));
        setCount(-1);
        this.drift = 0;
    }

    /* Plays sound. The function is async playing an audio file is asynchronous. */
    async function playSound() {
        if (count < beatList.length) {
            /* Play sound, accenting the down beat */
            const { sound } = await Audio.Sound.createAsync((beatList[count] == 1) ? accentSoundFile : selectedSoundFile);
            setSound(sound);
            await sound.playAsync();

            /* increment to next count and calculate drift */
            setCount(count => (count + 1));
            this.actual = Date.now();
            this.drift = (this.actual - this.expected);
            console.log(count);
            console.log("drift ", this.drift);
        } else {
            PausePlay();
        }
    }

    /* This function generates the secquence of beats and whether the are accents of down beats */
    function setUpTrack() {
        const newCountList = [];
        const newTempoList = [60];  //initialized so that tempos line up with measures and the sound does not start immediatly
        measures.forEach((measure) => {
            for (i = 0; i < measure.beat; i++) {
                if (i == 0)
                    newCountList.push(1);
                else
                    newCountList.push(0);
                newTempoList.push(measure.tempo);
            };
        })
        setBeatList(newCountList);
        setTempoList(newTempoList);
    }


    /* start metronome by incrementing count*/
    useEffect(() => {
        console.log(isPlaying)
        if (isPlaying) {
            setUpTrack();
            setCount(count => (count + 1));
        }
    }, [isPlaying]);

    /* call playSound every interval, taking into account the drift */
    useEffect(() => {
        if (isPlaying && count >= 0) {
            console.log(count);
            console.log(tempoList[count]);
            this.expected = Date.now() + (60 / tempoList[count] * 1000) - this.drift;
            setTimeout(playSound, (60 / tempoList[count] * 1000) - this.drift);
        }
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [count]);

    /*update the beat sound (paired)*/
    useEffect(() => {
        switch (selectedSound) {
            case 'Clap':
                setSelectedSoundFile(require('./../assets/sounds/clap/clap-click.mp3'));
                setAccentSoundFile(require('./../assets/sounds/clap/clap-accent.mp3'));
                break;
            case 'Drum':
                setSelectedSoundFile(require('./../assets/sounds/drum/floor_tom_louder.mp3'));
                setAccentSoundFile(require('./../assets/sounds/drum/snare_drum_louder.mp3'));
                break;
            case 'Piano':
                setSelectedSoundFile(require('./../assets/sounds/piano/pianoD.mp3'));
                setAccentSoundFile(require('./../assets/sounds/piano/pianoG.mp3'));
                break;
            case 'Shotgun':
                setSelectedSoundFile(require('./../assets/sounds/shotgun/Shotgun.mp3'));
                setAccentSoundFile(require('./../assets/sounds/shotgun/Shotgun2.mp3'));
                break;
            case 'Snap':
                setSelectedSoundFile(require('./../assets/sounds/snap/snap-click.mp3'));
                setAccentSoundFile(require('./../assets/sounds/snap/snap-accent.mp3'));
                break;
            default:
                setSelectedSoundFile(require('./../assets/sounds/metronome/metronomesound.mp3')); // Default
                setAccentSoundFile(require('./../assets/sounds/metronome/metronomeaccent.mp3'));
        }

    }, [selectedSound]);


    return (
        <View style={stylesMain.container}>
            <View style={stylesMain.header}>
                <Text style={stylesMain.title}>Beatle</Text>
            </View>

            <View style={[stylesMain.body, { alignItems: 'center' }]}>
                <Button image={pausePlayIcon} onPress={PausePlay} w={300} h={100} />
            </View>

            <View style={stylesMain.footer}>
                <TouchableOpacity style={[stylesMain.buttons, {}]} onPress={() => navigation.navigate('Trackbuilder')}>
                    <Text style={[stylesMain.text, {}]}>Trackbuilder </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
