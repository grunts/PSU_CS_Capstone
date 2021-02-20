import React, { useState, useEffect } from "react";
import { StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import MenuItemComponent from "../components/MenuItemComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MenuItem } from "../types";
import SearchBar from "../components/SearchBar";

import { useSelector, useDispatch } from "react-redux";
import { ServingTrayState } from "../store/reducers/types";

interface RootState {
  servingTray: ServingTrayState;
}

/**
 * Creates serving tray screen
 * Populates a flatlist that includes a button to remove that item by dispatching redux action
 */
export default function ServingTray() {
  /**
   * hook to retrieve serving tray information from redux store
   */
  const tray: ServingTrayState = useSelector(
    (state: RootState) => state.servingTray
  );

  /**
   * Destructures tray contents
   */
  const { currentTray } = tray;

  /**
   * retrieves redux dispatch functionality
   */
  const dispatch = useDispatch();

  // Sums the price of all the serving tray items
  const total = currentTray.reduce(
    (accumulator, currentItem) => (accumulator += currentItem.price),
    0
  );

  /**
   * Creates components to populate the list
   *
   * @param {object} params Item info and index in array
   */
  const renderItem = ({ item, index }: { item: MenuItem; index: number }) => (
      <MenuItemComponent menuItem={item}>
        {/**
         * Use a convenient button component from Material-Community-icons to create an remove from tray button.
         * */}
        <Text style={{paddingTop: 3, fontStyle: "italic", fontSize: 12}}>{item.customComments}</Text>
        <MaterialCommunityIcons.Button
          name="tray-minus"
          onPress={() =>
            dispatch({ type: "REMOVE_ITEM", payload: item, index: index })
          }
          size={26}
          color="#a28"
          backgroundColor="white"
          accessibilityLabel="Remove item from tray"
        >
          Remove
        </MaterialCommunityIcons.Button>
      </MenuItemComponent>
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
        contentContainerStyle={{ paddingBottom: 50, flexGrow: 1, backgroundColor: "white"}}
        style={{height: "100%"}}
        ListFooterComponent={<View style={{ padding: 50, backgroundColor: "white"}}></View>}
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

/**
 * Converts value to truncate and display as a currency
 *
 * @param {number} value The amount to convert
 */
const MakeCurrencyString = (value: number) => {
  return `$${value.toFixed(2)}`;
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1
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
    bottom: 65,
  },
});
