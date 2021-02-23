import React, { useState } from "react";
import { StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import MenuItemComponent from "../components/MenuItemComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MenuItem } from "../types";
import SearchBar from "../components/SearchBar";

import { useSelector, useDispatch } from "react-redux";
import { ServingTrayState } from "../store/reducers/types";


/** imports for notifications */
import * as Notifications from 'expo-notifications';

import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Get the pushToken from local storage
 */
const getData = async (toGet) => {
  try {
    const jsonValue = await AsyncStorage.getItem(toGet)
    console.log('Async Storage Acessed')
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch(e) {
    // error reading value
    console.log('Async Storage Error', e)
  }
} 


interface Subscription {
  remove: () => void;
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

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
  const { orderHistory } = tray;

  /**
   * retrieves redux dispatch functionality
   */
  const dispatch = useDispatch();

  // Sums the price of all the serving tray items
  const total = orderHistory[0].reduce(
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
      <Text
        style={{
          color: "black",
          fontStyle: "italic",
          fontSize: 12,
        }}
      >
        {item.customComments}
      </Text>
      {item.mods
        ? item.mods.map((m, i) => (
            //Clean up mod naming conventions due to maps not liking spaces in the key
            //and other 'extra' keywords
            //Display all mods user chose
            <Text
              key={m + i}
              style={{ color: "black", fontStyle: "italic" }}
            >
              {m
                .replace("_", " ")
                .replace("->", ": ")
                .replace("?", "")
                .replace("(recommended)", "")
                .trim()}
            </Text>
          ))
        : null}
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
      <FlatList
        data={orderHistory[0]}
        renderItem={renderItem}
        keyExtractor={(item, index) => item.name + index}
        contentContainerStyle={{
          paddingBottom: 50,
          flexGrow: 1,
          backgroundColor: "white",
        }}
        style={{ height: "100%" }}
        ListFooterComponent={
          <View style={{ padding: 50, backgroundColor: "white" }}></View>
        }
      />
      {/* <Text>Total: {MakeCurrencyString(total)}</Text> */}
      <TouchableOpacity
        onPress={async () => {
          // await schedulePushNotification();
          // await mockAcceptedNotification();

          /**
           * Tell the store that this order has been confirmed
           */
        //   dispatch({ type: "TRAY_CONFIRMED" });

          // /**
          //  * temporarily remove each item until the store can handle it
          //  */
          // for (let i = currentTray.length - 1; i >= 0; --i) {
          //   dispatch({ type: "REMOVE_ITEM", payload: currentTray[i], index: i });
          // }

        }}
        accessibilityLabel="Confirm total purchase"
        style={styles.confirmButton}
      >
        <Text style={{ color: "white" }}>
          Close tab - {MakeCurrencyString(total)}
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
    backgroundColor: "white",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    flex: 1,
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



async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order Received",
      body: 'Your order has been received by the restaurant!\nWe will let you know when your order is accepted!',
      data: { data: await getData('@pushToken') },
    },
    trigger: { seconds: 2 },
  });
}


async function mockAcceptedNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Order Accepted",
      body: 'Your order has been accepted by the restaurant!\nWe will let you know when your order is ready!',
      data: { data: await getData('@pushToken') },
    },
    trigger: { seconds: 30 },
  });
}
