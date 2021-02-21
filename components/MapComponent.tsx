import React from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View, Dimensions } from 'react-native';
import Region from "../constants/Region";
import restaurants from '../mock/restaurant.js';

/**Component for the map view page of restaurants. This component accepts a props object containing
 * an initialRegion for the user's location.*/
export default function MapComponent({ initialRegion, navigator }:  { initialRegion: typeof Region, navigator: any } ) {
  return (
      /**MapView is wrapped in a normal View to give it flexbox properties.*/
      <View style={styles.container}>
        <MapView style={styles.mapStyle} initialRegion={initialRegion} region={initialRegion}>
          <Marker coordinate={initialRegion} title={'You'} description={'You are here'} pinColor={'green'}/>
          {/**For each restaurant in the list of restaurants provided, create a Marker for that restaurant
            * from its location.*/}
          {restaurants.map((marker, index) => 
            (<Marker 
              key={index} 
              coordinate={marker.location} 
              title={marker.name} 
              description={marker.description}
              onCalloutPress={() => navigator.navigate('MenuScreen', { restaurant: marker })} />
            )
          )}
        </MapView>
      </View>
  );
}

/**Styles used in this component.*/
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
