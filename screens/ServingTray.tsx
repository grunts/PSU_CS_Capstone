import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import MenuItemComponent from "../components/MenuItemComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MenuItem } from "../types";
import restaurants from "../mock/restaurant.js";
import SearchBar from "../components/SearchBar";

export default function ServingTray({ navigation }: { navigation: any }) {
  const [tray, setTray] = useState(tempTray);

  const renderItem = ({ item, index }) => (
    <View>
      <MenuItemComponent menuItem={item}>
        {/**Use a convenient button component from react-native-vector-icons to create an remove from tray button.*/}
        <MaterialCommunityIcons.Button
          name="tray-minus"
          onPress={() => {
            setTray(removeItem(tray, index));
          }}
          size={24}
          color="#a28"
          backgroundColor="white"
          accessibilityLabel="Remove item from tray"
        >
          Remove
        </MaterialCommunityIcons.Button>
      </MenuItemComponent>
    </View>
  );

  // Returns a copy of the tray with indexed item removed
  const removeItem = (array: MenuItem[], index: number) => [
    ...array.slice(0, index),
    ...array.slice(++index),
  ];

  // Reducer that sums the price of all the serving tray items
  const total = tray.reduce(
    (accumulator: number, currentItem: MenuItem) =>
      (accumulator += currentItem.price),
    0
  );

  return (
    <View style={styles.container}>
      <SearchBar
        renderFunction={renderItem}
        dataToBeSearched={tray}
        fieldToSearch={"name"}
      />
      <FlatList
        data={tray}
        renderItem={renderItem}
        keyExtractor={(item: MenuItem, index: number) => item.name + index}
        ListFooterComponent={<View style={{padding: 40}}></View>}
      />
      {/* <Text>Total: {MakeCurrencyString(total)}</Text> */}
      <TouchableOpacity
        onPress={() => {}}
        accessibilityLabel="Confirm total purchase"
        style={styles.confirmButton}
      >
        <Text style={{ color: "white" }}>
          Confirm - {MakeCurrencyString(total)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const MakeCurrencyString = (value: number) => {
  return `$${value.toFixed(2)}`;
};

// const formatter = new Intl.NumberFormat('en-US', {
//   style: 'currency',
//   currency: 'USD',
//   minimumFractionDigits: 2
// })

const tempReducer = (accumulator, currentItem) => {
  accumulator.push(...currentItem.menu);
  accumulator.push(...currentItem.menu);
  return accumulator;
};

const tempTray = restaurants.reduce(tempReducer, []);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "transparent",
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
  confirmButton: {
    backgroundColor: "#a28",
    padding: 15,
    marginLeft: 60,
    marginRight: 60,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: 50,
    bottom: 5,
  },
});
