import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import MenuItemComponent from "../components/MenuItemComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MenuItem } from "../types";
import SearchBar from "../components/SearchBar";

import { useSelector, useDispatch } from "react-redux";
import { ServingTrayState } from "../store/reducers/types"

interface RootState {
  servingTray: ServingTrayState;
}

export default function ServingTray() {
  const tray: ServingTrayState = useSelector((state: RootState) => state.servingTray);
  const { currentTray } = tray;
  const dispatch = useDispatch();
  
  // Sums the price of all the serving tray items
  const total = currentTray.reduce(
    (accumulator, currentItem) =>
      (accumulator += currentItem.price),
    0
  );

  const renderItem = ({ item, index }: { item: MenuItem, index: number }) => (
    <View>
      <MenuItemComponent menuItem={item}>
        {/**Use a convenient button component from react-native-vector-icons to create an remove from tray button.*/}
        <MaterialCommunityIcons.Button
          name="tray-minus"
          onPress={() => dispatch({ type: "REMOVE_ITEM", payload: item, index: index })}
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

  return (
    <View style={styles.container}>
      <SearchBar
        renderFunction={renderItem}
        dataToBeSearched={currentTray}
        fieldToSearch={"name"}
      />
      <FlatList
        data={currentTray}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.name + index}
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
