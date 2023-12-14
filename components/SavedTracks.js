/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/prop-types */
/* Import react components */
import * as React from 'react';
import {
  Text, View, TouchableOpacity, FlatList, ActivityIndicator
} from 'react-native';
import { useState, useEffect } from 'react';

import { AntDesign } from '@expo/vector-icons';

/* Import style files */
// eslint-disable-next-line import/extensions
import { stylesMain } from '../styles/stylesMain.js';
import { COLORS } from '../styles/colors';

// export AddMeasure
export default function SavedTracks({
  isModalVisible, setIsModalVisible,
  selectedTrackID, setSelectedTrackID,
  selectedTrackName, setSelectedTrackName,
}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getTracks = async () => {
    try {
      const response = await fetch('https://beatleservice.azurewebsites.net/allClickTracks');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  //identify ID and name of selected track
  const selectTrack = (item) => {
    if (selectedTrackID !== item.item.id) {
      setSelectedTrackID(item.item.id);
      setSelectedTrackName(item.item.name);
    }
  };

  useEffect(() => {
    getTracks();
    console.log(data);
    console.log(selectedTrackName);
  }, [selectedTrackID]);


  return (
    <View style={{ height: 500, width: '100%' }}>
      <View style={{
        flex: 2, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20,
      }}
      >
        <Text style={[stylesMain.title, { marginTop: 0 }]}>Saved Tracks</Text>
      </View>
      <View style={{ flex: 16, padding: 0, justifyContent: 'center' }}>
        {isLoading ? (
          <ActivityIndicator />
        ) : (
          <FlatList
            data={data}
            keyExtractor={({ id }) => id.toString()}
            renderItem={(item) => (
              <View style={stylesMain.subView}>
                <TouchableOpacity 
                style={[stylesMain.flatButton, {
                  alignSelf: 'center',
                  marginBottom: 10,
                  backgroundColor: COLORS.orange,
                  width: 300,
                }]}
                onPress={() => {
                  console.log(item.item.id);
                  selectTrack(item);
                }}
                >
                  <Text style={stylesMain.text}>{item.item.name}</Text>
                </TouchableOpacity>
              </View>
            )}
          />
        )}
      </View>

      <View style={{
        flex: 2,
        paddingBottom: 12,
        justifyContent: 'flex-end',
        flexDirection: 'row',
        alignItems: 'flex-end',
      }}
      >
        <View style={{ flex: 1, alignItems: 'flex-start' }}>
          <TouchableOpacity
            style={[stylesMain.backButton, { backgroundColor: COLORS.orange, width: 50 }]}
            onPress={() => setIsModalVisible(() => !isModalVisible)}
          >
            <AntDesign name="arrowleft" size={24} color={COLORS.background} />
          </TouchableOpacity>
        </View>
      </View>

    </View>
  );
}
