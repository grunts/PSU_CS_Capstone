import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import restaurants from "../mock/restaurant";
import MenuTitleComponent from "../components/MenuTitleComponent";
import MenuItemComponent from "../components/MenuItemComponent"

export default function MenuScreen({ route }) {
  const { restaurant } = route.params
  return (
    <View style={styles.container}>
        <MenuTitleComponent title={restaurant.name}></MenuTitleComponent>
        <MenuItemComponent menuItem={restaurant.menu[0]} />
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