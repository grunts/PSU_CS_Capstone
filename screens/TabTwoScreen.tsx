import * as React from "react";
import { StyleSheet, Dimensions } from "react-native";
import MapView from 'react-native-maps';

import EditScreenInfo from "../components/EditScreenInfo";
import MapComponent from "../components/MapComponent";
import { Text, View } from "../components/Themed";
const restaurants = require("../mock/restaurant");

export default function TabTwoScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tab Two</Text>
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />
      <MapComponent></MapComponent>
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
