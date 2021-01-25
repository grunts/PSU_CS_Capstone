import * as React from "react";
import { StyleSheet, SectionList } from "react-native";
import { Text, View } from "../components/Themed";
import MenuTitleComponent from "../components/MenuTitleComponent";
import MenuItemComponent from "../components/MenuItemComponent";
import DefaultRestaurant from "../constants/DefaultRestaurant";

export default function MenuScreen({ route }) {
  const { restaurants } = route.params;
  const categories = extractCategories(restaurants);
  return (
    <View style={styles.container}>
        <MenuTitleComponent title={restaurants.name ?? DefaultRestaurant.name}></MenuTitleComponent>
        {/*<MenuItemComponent menuItem={restaurant.menu[0]} />*/}
        <SectionList sections={}/>
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

function extractCategories(restaurants) {
  
}