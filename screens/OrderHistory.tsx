import React from "react";
import { StyleSheet, FlatList, Button, TouchableOpacity } from "react-native";
import { Text, View } from "../components/Themed";
import { MenuItem } from "../types";

import { Avatar, ListItem } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { ServingTrayState } from "../store/reducers/types";

/** imports for notifications */
import * as Notifications from "expo-notifications";

import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Get the pushToken from local storage
 */
const getData = async (toGet) => {
  try {
    const jsonValue = await AsyncStorage.getItem(toGet);
    console.log("Async Storage Acessed");
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // error reading value
    console.log("Async Storage Error", e);
  }
};

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
  const { orderHistory, currentRestaurant } = tray;

  /**
   * retrieves redux dispatch functionality
   */
  const dispatch = useDispatch();

  // Sums the price of all the serving tray items
  const total = orderHistory.reduce(
    (accumulator, currentItem) => (accumulator += currentItem.price),
    0
  );

  /**
   * Creates components to populate the list
   *
   * @param {object} params Item info and index in array
   */
  const renderItem = ({ item, index }: { item: MenuItem; index: number }) => (
    <ListItem
      containerStyle={{
        backgroundColor: "gray",
        opacity: 0.6,
        borderBottomColor: "black",
        borderBottomWidth: 1,
      }}
    >
      {/**A simple picture element for holding an image of the food item.*/}
      <Avatar size="large" source={{ uri: item.image }} />
      {/**The Content component holds the body of the data in the list item.*/}
      <ListItem.Content>
        <ListItem.Title style={{ fontSize: 20 }}>
          {item.name} {`$${Number(item.price).toFixed(2)}`}
        </ListItem.Title>
        <ListItem.Subtitle>{item.longDesc}</ListItem.Subtitle>
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
              <Text key={m + i} style={{ color: "black", fontStyle: "italic" }}>
                {m
                  .replace("_", " ")
                  .replace("->", ": ")
                  .replace("?", "")
                  .replace("(recommended)", "")
                  .trim()}
              </Text>
            ))
          : null}
      </ListItem.Content>
    </ListItem>
  );

  return orderHistory.length ? (
    <View style={styles.container}>
      <FlatList
        data={orderHistory}
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
      <TouchableOpacity
        onPress={async () => {
          if (!orderHistory.length) {
            return;
          }
          await mockAcceptedNotification(currentRestaurant);
          dispatch({ type: "CLOSE_TAB" });
        }}
        accessibilityLabel="Confirm total purchase"
        style={styles.confirmButton}
      >
        <Text style={{ color: "white" }}>
          Close tab - {MakeCurrencyString(total)}
        </Text>
      </TouchableOpacity>
    </View>
  ) : (
    <View
      style={{
        flex: 1,
        backgroundColor: "transparent",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text style={{ fontSize: 25, textAlign: "center", padding: 10 }}>
        There is nothing here!
      </Text>
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
    bottom: 10,
  },
});

async function mockAcceptedNotification(place) {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Your tab has been closed!",
      body: `Thank you for dining with ${place}!`,
      data: { data: await getData("@pushToken") },
    },
    trigger: { seconds: 3 },
  });
}
