import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from "react-native";
import * as Location from 'expo-location';
import Region from "../constants/Region";
import MapComponent from "../components/MapComponent";
import { Text, View } from "../components/Themed";

export default function TabTwoScreen({navigation}: {navigation: any}) {
  const [errorMsg, setErrorMsg] = useState("");
  const [region, setRegion] = useState(Region);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
      }

      let result = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = result.coords
      setRegion( { latitude, longitude, latitudeDelta: region.latitudeDelta, longitudeDelta: region.longitudeDelta } );
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      {/**Add a small line to separate the title from the Map.*/}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <MapComponent 
        initialRegion={region}
        navigator={navigation}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  }
});
