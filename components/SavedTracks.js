/* eslint-disable linebreak-style */
/* eslint-disable import/extensions */
/* eslint-disable react/jsx-max-props-per-line */
/* eslint-disable react/prop-types */
/* Import react components */
import * as React from 'react';
import {
  Text, View, TouchableOpacity, FlatList, ActivityIndicator,
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
  id,
}) {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const getTracks = async () => {
    try {
      const response = await fetch('https://beatleservice.azurewebsites.net/allClickTracks');
      const json = await response.json();

      const userTracks = json.filter((item) => item.userid === id);

      setData(userTracks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // identify ID and name of selected track
  const selectTrack = (item) => {
    if (selectedTrackID !== item.item.id) {
      setSelectedTrackID(item.item.id);
      setSelectedTrackName(item.item.name);
    }
  };

  const deleteTrack = async (trackId) => {
    try {
      const response = await fetch(`https://beatleservice.azurewebsites.net/delClickTrack/${trackId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Add any additional headers as needed
        },
      });
      if (response.ok) {
        console.log('Track', trackId, 'deleted successfully');
      } else {
        console.error('Failed to delete track:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Error in deleteTrack:', error.message);
      // Handle the error or update the UI as needed
    }
  };

  useEffect(() => {
    getTracks();
  }, [selectedTrackID]);

  return (
    <View style={{ height: 500, width: '100%' }}>
      <View style={{
        flex: 1, justifyContent: 'flex-start', alignItems: 'center', paddingTop: 20,
      }}
      >
        <Text style={[stylesMain.title, { marginTop: 0 }]}>Saved Tracks</Text>
      </View>

      <View style={{ flex: 6, padding: 0, justifyContent: 'flex-start' }}>
        <View style={{
          alignItems: 'flex-end', paddingBottom: 10, alignSelf: 'flex-start', width: '100%',
        }}
        >
          <TouchableOpacity
            style={[stylesMain.smallButton, { backgroundColor: COLORS.orange }]}
            onPress={() => { deleteTrack(selectedTrackID); }}
          >
            <Text style={[stylesMain.text, { color: COLORS.background }]}>Delete</Text>
          </TouchableOpacity>

        </View>
        <View style={{ maxHeight: 300 }}>
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
                      backgroundColor: item.item.id === selectedTrackID ? '#a23600' : '#ff6900',
                      width: 300,
                      height: 50,
                    }]}
                    onPress={() => {
                      // console.log(item.item.id);
                      selectTrack(item);
                    }}
                  >
                    <Text style={[stylesMain.text, {
                      color: item.item.id === selectedTrackID ? '#f0f5f5' : '#0a0e0f',
                    }]}
                    >
                      {item.item.name}
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          )}
        </View>
      </View>
      <View style={{
        flex: 0.5,
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
        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <TouchableOpacity
            style={[stylesMain.smallButton, { backgroundColor: COLORS.orange }]}
            onPress={() => setIsModalVisible(() => !isModalVisible)}
          >
            <Text style={[stylesMain.text, { color: COLORS.background }]}>Open</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  );
}
