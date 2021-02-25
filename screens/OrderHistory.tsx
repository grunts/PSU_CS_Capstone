import React, { useState } from "react";
import {
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Alert,
  TouchableHighlight,
  Dimensions,
  TouchableWithoutFeedback
} from "react-native";
import { Text, View } from "../components/Themed";
import { MenuItem } from "../types";

import { Avatar, ListItem, Input } from "react-native-elements";
import { useSelector, useDispatch } from "react-redux";
import { ServingTrayState } from "../store/reducers/types";
import { AntDesign } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";
import CurrencyInput, { FakeCurrencyInput } from "react-native-currency-input";

/** imports for notifications */
import * as Notifications from "expo-notifications";

import AsyncStorage from "@react-native-async-storage/async-storage";
import { TextInput } from "react-native-gesture-handler";

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

interface RootState {
  servingTray: ServingTrayState;
}

/**
 * Creates order history screen
 */
export default function ServingTray() {
  const [gratuity, setGratuity] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const [tipField, setTipField] = useState(0.0);
  const [highLight, setHighLight] = useState(-1);
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

  const handleGratuity = (locGratuity) => {
    setHighLight(locGratuity);
    const toAdd: number = total * locGratuity;
    setTipField(0.0);
    if (total + gratuity == total + toAdd) {
      setHighLight(-1);
      setGratuity(0);
      return;
    }
    setGratuity(toAdd);
  };

  const promptCustomGratuity = () => {
    setModalVisible(true);
  };

  const handleCustomGratuity = () => {
    if (tipField <= 0) {
      setHighLight(-1);
    } else {
      setHighLight(1);
    }
    setGratuity(tipField);
  };
  /**
   This renderItem creates a condensed order history that is greyed out
   to reflect that the order is final at this point and the information has
   been delivered to the establishment
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
              //Display all mods user choices ina friendly way
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

  function currencyFormat(num) {
    return new Intl.NumberFormat("en-US", {}).format(num);
  }

  //If they have an orderHistory display it and allow for closing the tab, otherwise
  //just display a message letting them know the car is empty
  return orderHistory.length ? (
    <View style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <AntDesign
              name="hearto"
              size={30}
              color="#a28"
              style={{ marginTop: 0, paddingBottom: 12 }}
            />
            <Text style={styles.modalText}>
              Your tip is highly appreciated!
            </Text>
            {/* <Input
              // placeholder="0.00"
              leftIcon={<FontAwesome name="dollar" size={15} color="black" />}
              // onChangeText={(text) => setTipField(text)}
              // value={tipField}
              // keyboardType="numeric"
              InputComponent = {() => <CurrencyInput value={tipField} onChangeValue={text=>setTipField(text)}/>}
              containerStyle={{ width: 200 }}
            /> */}
            <View
              style={{
                flexDirection: "row",
                borderBottomColor: "grey",
                borderBottomWidth: 1,
                marginBottom: 25,
                width: 200,
                height: 25,
                backgroundColor: "white"
              }}
            >
              <FontAwesome
                name="dollar"
                size={15}
                color="black"
                style={{ paddingTop: 7 }}
              />
              <FakeCurrencyInput
                style={{
                  width: 200,
                  paddingLeft: 3,
                  fontSize: 18,
                  fontWeight: "500"
                }}
                containerStyle={{backgroundColor: "transparent"}}
                value={tipField}
                onChangeValue={(text: number) => setTipField(text)}
                placeholder="0.00"
                delimiter=","
                separator="."
              />
            </View>
            <TouchableHighlight
              style={{ ...styles.openButton, backgroundColor: "#a2006d" }}
              onPress={() => {
                handleCustomGratuity();
                setModalVisible(!modalVisible);
              }}
            >
              <Text style={styles.textStyle}>Confirm</Text>
            </TouchableHighlight>
          </View>
        </View>
      </Modal>
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
        <View style={styles.gratuityButtonContainer}>
          <TouchableOpacity
            style={
              highLight === 0.15
                ? [
                    styles.gratuityContainerSelected,
                    { borderTopLeftRadius: 6, borderBottomLeftRadius: 6 },
                  ]
                : { width: 60, paddingLeft: 0 }
            }
            onPress={() => handleGratuity(0.15)}
          >
            <Text
              style={
                highLight === 0.15
                  ? styles.gratuityAmountSelected
                  : styles.gratuityAmount
              }
            >
              15%{"\n"}${Number(total * 0.15).toFixed(2)}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: "100%",
              borderRightWidth: 1,
              borderRightColor: "#a28",
            }}
          ></View>
          <TouchableOpacity
            style={
              highLight === 0.2
                ? styles.gratuityContainerSelected
                : { width: 60 }
            }
            onPress={() => handleGratuity(0.2)}
          >
            <Text
              style={
                highLight === 0.2
                  ? styles.gratuityAmountSelected
                  : styles.gratuityAmount
              }
            >
              20%{"\n"}${Number(total * 0.2).toFixed(2)}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: "100%",
              borderRightWidth: 1,
              borderRightColor: "#a28",
            }}
          ></View>
          <TouchableOpacity
            style={
              highLight === 0.25
                ? styles.gratuityContainerSelected
                : { width: 60 }
            }
            onPress={() => handleGratuity(0.25)}
          >
            <Text
              style={
                highLight === 0.25
                  ? styles.gratuityAmountSelected
                  : styles.gratuityAmount
              }
            >
              25%{"\n"}${Number(total * 0.25).toFixed(2)}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: "100%",
              borderRightWidth: 1,
              borderRightColor: "#a28",
            }}
          ></View>
          <TouchableOpacity
            style={
              highLight === 0.3
                ? styles.gratuityContainerSelected
                : { width: 60 }
            }
            onPress={() => handleGratuity(0.3)}
          >
            <Text
              style={
                highLight === 0.3
                  ? styles.gratuityAmountSelected
                  : styles.gratuityAmount
              }
            >
              30%{"\n"}${Number(total * 0.3).toFixed(2)}
            </Text>
          </TouchableOpacity>
          <View
            style={{
              height: "100%",
              borderRightWidth: 1,
              borderRightColor: "#a28",
            }}
          ></View>
          <TouchableOpacity
            style={
              highLight === 1
                ? [
                    styles.gratuityContainerSelected,
                    { borderTopRightRadius: 6, borderBottomRightRadius: 6 },
                  ]
                : { width: 60, borderRadius: 10 }
            }
            onPress={() => promptCustomGratuity()}
          >
            <Text
              style={
                highLight === 1
                  ? styles.gratuityAmountSelected
                  : styles.gratuityAmount
              }
            >
              Custom{tipField ? `\n$${tipField.toFixed(2)}` : ""}
            </Text>
          </TouchableOpacity>
      </View>

        <TouchableOpacity
          onPress={async () => {
            if (!orderHistory.length) {
              return;
            }
            setGratuity(0);
            setTipField(0.0);
            //Simulate a server triggering that the order has been processed and tab is closed
            await mockAcceptedNotification(currentRestaurant);
            //Clear the redux store
            dispatch({ type: "CLOSE_TAB" });
          }}
          accessibilityLabel="Confirm total purchase"
          style={styles.confirmButton}
        >
          <Text style={{ color: "white" }}>
            Close tab - {MakeCurrencyString(total + gratuity)}
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
    // marginLeft: 60,
    // marginRight: 60,
    width: 305,
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    left: (Dimensions.get('window').width/2)-150,
    // left: 33,
    bottom: 10,
  },
  gratuityButtonContainer: {
    borderWidth: 1,
    backgroundColor: "white",
    borderColor: "#a28",
    marginBottom: 15,
    marginTop: 15,
    borderRadius: 8,
    alignItems: "center",
    position: "absolute",
    width: 305,
    height: 45,
    bottom: 62,
    left: (Dimensions.get('window').width/2)-150,
    flex: 1,
    flexDirection: "row",
  },
  gratuityAmount: {
    fontWeight: "600",
    textAlign: "center",
    color: "#a28",
    alignSelf: "center",
  },
  gratuityAmountSelected: {
    fontWeight: "600",
    color: "white",
    textAlign: "center",
  },
  gratuityContainerSelected: {
    flex: 1,
    backgroundColor: "#a28",
    // borderRadius: 10,
    maxWidth: 60,
    alignSelf: "stretch",
    justifyContent: "center",
    paddingLeft: 0,
    marginLeft: 0,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    backgroundColor: "transparent",
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    paddingTop: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  openButton: {
    backgroundColor: "#a28",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
    paddingLeft: 40,
    paddingRight: 40,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
    color: "black",
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
