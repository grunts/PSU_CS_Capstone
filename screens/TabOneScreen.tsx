import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import ScrollListComponent from "../components/ListViewScroll";

export default function TabOneScreen({navigation}: {navigation: any}) {
  return (
    <View style={styles.container}>
        <ScrollListComponent navigator={navigation}/>
    </View>
  );
}
      /*<ScrollListComponent navigator={navigation}/>*/

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
    height: 10,
    width: "80%",
  },
});
