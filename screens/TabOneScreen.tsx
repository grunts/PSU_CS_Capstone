import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import ScrollListComponent from "../components/ListViewScroll";
/*import ChameleonComponent from "../components/Chameleon";*/

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <ScrollListComponent />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
});
