import React from "react";
// import { Text as DefaultText, View as DefaultView } from 'react-native';
import { Text, View } from "../components/Themed";
import { StyleSheet, Button, Image } from "react-native";
import { Avatar, ListItem } from "react-native-elements";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { menuItem } from "../types";

// type ItemProps =

export default function ItemCardComponent(menuItem: menuItem) {
  const {
    name,
    image,
    longDesc,
    shortDesc,
    ABV,
    Allergens,
    price,
    mandatoryMods,
  } = menuItem;

  const displayABV = (abv: number) => {
    if (abv > 0) {
      return `${abv}% ABV`;
    }
    return "";
  };

  return (
    <ListItem bottomDivider style={styles.item}>
      <Avatar size="large" source={{ uri: image }} />
      <ListItem.Content>
        <ListItem.Title>
          {name} {`$${Number(price).toFixed(2)}`}
        </ListItem.Title>
        <ListItem.Subtitle>{longDesc}</ListItem.Subtitle>
        <ListItem.Subtitle>{displayABV(ABV)}</ListItem.Subtitle>
        <MaterialCommunityIcons.Button
          name="tray-plus"
          size={24}
          color="white"
          backgroundColor="#a28"
          accessibilityLabel="Add item to tray"
        >
          Add
        </MaterialCommunityIcons.Button>
      </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#f9c2ff",
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    // flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
