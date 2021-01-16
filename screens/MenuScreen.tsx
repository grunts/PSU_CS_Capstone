import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import restaurants from "../mock/restaurant";
import MenuTitleComponent from "../components/MenuTitleComponent";

export default function MenuScreen() {
  return (
    <View style={styles.container}>
        <MenuTitleComponent title={restaurants[0].name}></MenuTitleComponent>
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