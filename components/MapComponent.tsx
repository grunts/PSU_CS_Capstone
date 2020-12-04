import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import Region from "../constants/Region";

export default function MapComponent({ initialRegion }:  { initialRegion: typeof Region } ) {
    return (
        <View style={styles.container}>
            <MapView 
              style={styles.mapStyle}
              initialRegion={initialRegion}
              region={initialRegion}
              // onRegionChange={ region => setRegion( region )}
              >
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
