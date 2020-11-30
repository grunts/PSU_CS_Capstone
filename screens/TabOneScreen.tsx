import * as React from "react";
import { StyleSheet } from "react-native";

//import EditScreenInfo from "../components/EditScreenInfo";
import { Text, View } from "../components/Themed";
//import ListComponent from "../components/ListView";
import ScrollListComponent from "../components/ListViewScroll";

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
    //alignItems: "center",
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
