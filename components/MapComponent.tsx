import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import Region from "../constants/Region";
import restaurants from '../mock/restaurant.js';

export default function MapComponent({ initialRegion }:  { initialRegion: typeof Region } ) {
    return (
        <View style={styles.container}>
            <MapView 
              style={styles.mapStyle}
              initialRegion={initialRegion}
              region={initialRegion}
              // onRegionChange={ region => setRegion( region )}
              >
                <Marker 
                  coordinate={initialRegion}
                  title={'You'}
                  description={'You are here'}
                  pinColor={'green'}
                  />
                {restaurants.map((marker, index) => (
                  <Marker 
                  key={index}
                  coordinate={marker.location}
                  title={marker.name}
                  description={marker.description}
                  />
                ))}
            </MapView>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
