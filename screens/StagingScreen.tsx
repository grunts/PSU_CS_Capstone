import React, { Fragment, useState } from "react";
import { StyleSheet, Platform } from "react-native";
import { Text, View } from "../components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Image, ScrollView } from "react-native";
import { Card } from "react-native-elements";
import InputSpinner from "react-native-input-spinner";
import { TextInput, KeyboardAvoidingView } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";

export default function StagingScreen({ route }) {
  const [quantity, setQuantity] = React.useState(1);
  const myMenuItem = route.params.MenuItem;
  const [comments, setComments] = React.useState("");
  const [checked, setChecked] = React.useState({
    adtlCharges: 0,
    mods: new Map(),
  });
  const navigation = useNavigation();
  const tray = useSelector((state) => state.servingTray);
  const dispatch = useDispatch();

  const {
    name,
    image,
    longDesc,
    shortDesc,
    ABV,
    Allergens,
    price,
    mandatoryMods,
    nonMandatoryMods,
  } = myMenuItem;
  let updateComments = (comments) => {
    setComments(comments);
  };
  return (
    // We want to wrap this all in a KeyBoardAvoiding view so that when the user wants to type something they can see
    <KeyboardAvoidingView
      style={{ height: "100%", backgroundColor: "white" }}
      behavior={Platform.OS === "ios" ? "position" : "height"}
      contentContainerStyle={{ flex: 1 }}
      keyboardVerticalOffset={0}
    >
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        {/*Picture of the menu item */}
        <Image
          resizeMode="cover"
          source={{ uri: image }}
          style={{ width: "100%", height: 250 }}
        ></Image>
        <View
          style={{
            justifyContent: "center",
            alignContent: "center",
            backgroundColor: "transparent",
            paddingTop: 15,
            paddingLeft: 10,
            marginBottom: 30,
          }}
        >
          <Text
            style={{
              color: "black",
              textAlignVertical: "center",
              fontWeight: "400",
              fontSize: 40,
            }}
          >
            {name}
          </Text>
          <Text style={{ color: "gray" }}>{longDesc}</Text>
        </View>
        {/*Check and display mandatory mods */}
        {mandatoryMods.length
          ? mandatoryMods.map((mod, index) => (
              <Fragment key={mod.modName + index}>
                <View
                  style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "#f2f2f2",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      paddingLeft: 10,
                      fontSize: 20,
                      fontWeight: "500",
                    }}
                  >
                    {mod.modName}
                  </Text>
                  {/**All mods in this category are required */}
                  <Text style={{ color: "black", paddingLeft: 10 }}>
                    Required
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "transparent", width: "100%" }}
                >
                  {/**List out every option per mod */}
                  {mod.modOptions.map((opt, index) => {
                    var name = mod.modName;
                    return (
                      <Fragment key={opt.option + index}>
                        <View
                          style={{
                            backgroundColor: "transparent",
                            flexDirection: "row",
                          }}
                        >
                          <CheckBox
                            //Simulate a radio button by only allowing one value per mod to be selected
                            //via its position in the list
                            checked={
                              checked[`${mod.modName}`] === index ? true : false
                            }
                            checkedColor="#a28"
                            //On press take the old state and update the value of the option
                            //with the index
                            //Use a map to easily controls mod selection, no duplicates allowed
                            //Clearing the map before entry reflects choosing from a
                            //radio button list
                            onPress={() => {
                              mod.modOptions.forEach((clean) => {
                                const item = `${mod.modName}->${clean.option}`;
                                checked.mods.delete(item);
                              });
                              checked.mods.set(
                                `${mod.modName}->${opt.option}`,
                                true
                              );
                              setChecked({ ...checked, [name]: index });
                            }}
                            containerStyle={{ marginRight: 0 }}
                            style={{ paddingLeft: 0 }}
                            center
                          />
                          <Text
                            style={{
                              color: "black",
                              padding: 16,
                              fontSize: 16,
                              fontWeight: "500",
                              paddingLeft: 0,
                            }}
                          >
                            {opt.option}
                          </Text>
                          {/**Does the selection cost extra? */}
                          {opt.adtlPrice ? <Text>{opt.adtlPrice}</Text> : null}
                        </View>
                        <Card.Divider
                          style={{ marginBottom: 0 }}
                        ></Card.Divider>
                      </Fragment>
                    );
                  })}
                </View>
              </Fragment>
            ))
          : null}

        {/*Check and display optional mods */}
        {nonMandatoryMods.length
          ? nonMandatoryMods.map((mod, index) => (
              <Fragment key={mod.modName + index}>
                <View
                  style={{
                    width: "100%",
                    height: 60,
                    backgroundColor: "#f2f2f2",
                    justifyContent: "center",
                  }}
                >
                  <Text
                    style={{
                      color: "black",
                      paddingLeft: 10,
                      fontSize: 20,
                      fontWeight: "500",
                    }}
                  >
                    {mod.modName}
                  </Text>
                </View>
                <View
                  style={{ backgroundColor: "transparent", width: "100%" }}
                >
                  {mod.modOptions.map((opt, index) => {
                    return (
                      <Fragment key={opt.option + index}>
                        <View
                          style={{
                            backgroundColor: "transparent",
                            flex: 1,
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          {/**Here we do not want to simulate a radio list as multiple selections make sense */}
                          <CheckBox
                            checked={
                              typeof checked[mod.modName + opt.option] ===
                              "number"
                                ? true
                                : false
                            }
                            checkedColor="#a28"
                            //We need to check if the selection costs more and update the price
                            //If it is selected we add, if it has been pressed and was alreadu selected
                            //we subtract
                            //Non radio lists can have as many selected as they please and we do not need
                            //to clear. These CheckButtons should both be moved to components called
                            //RadioButton and CheckButton and imported here
                            onPress={() => {
                              const isChecked =
                                typeof checked[mod.modName + opt.option] ===
                                "number";
                              const item = `${mod.modName}->${opt.option}`;
                              isChecked
                                ? checked.mods.delete(item.replace("", "_"))
                                : checked.mods.set(item.replace("", "_"), true);
                              setChecked({
                                ...checked,
                                [mod.modName + opt.option]: isChecked
                                  ? null
                                  : index,
                                adtlCharges: isChecked
                                  ? checked.adtlCharges - opt.adtlPrice
                                  : checked.adtlCharges + opt.adtlPrice,
                              });
                            }}
                            containerStyle={{ marginRight: 0 }}
                            style={{ paddingLeft: 0 }}
                            center
                          />
                          <Text
                            style={{
                              color: "black",
                              padding: 16,
                              paddingLeft: 0,
                              fontSize: 16,
                              fontWeight: "500",
                              width: "100%",
                              flex: 1,
                              flexDirection: "row",
                              justifyContent: "flex-start",
                            }}
                          >
                            {opt.option}
                          </Text>
                          {opt.adtlPrice ? (
                            <Text
                              style={{
                                padding: 13,
                                color: "gray",
                                textAlign: "right",
                                fontSize: 16,
                                fontWeight: "500",
                              }}
                            >
                              ${Number(opt.adtlPrice).toFixed(2)}
                            </Text>
                          ) : null}
                        </View>
                        <Card.Divider
                          style={{ marginBottom: 0 }}
                        ></Card.Divider>
                      </Fragment>
                    );
                  })}
                </View>
              </Fragment>
            ))
          : null}
        <View
          style={{
            width: "100%",
            height: 60,
            backgroundColor: "#f2f2f2",
            justifyContent: "center",
          }}
        >
          <Text
            style={{
              color: "black",
              paddingLeft: 10,
              fontSize: 20,
              fontWeight: "500",
            }}
          >
            Notes for the chef
          </Text>
        </View>

        {/**Allow for custom comments to be attatched to the order */}
        <TextInput
          placeholderTextColor="silver"
          placeholder="Any modifications?"
          onChangeText={updateComments}
          value={comments}
          style={{
            backgroundColor: "white",
            height: 60,
            borderRadius: 8,
            width: "95%",
            alignSelf: "center",
          }}
        />
        <Card.Divider></Card.Divider>
        {/** Allow for quantitiy selection of the menu item */}
        <InputSpinner
          style={styles.spinner}
          width={150}
          max={10}
          min={1}
          step={1}
          colorMax={"#f04048"}
          colorMin={"#f04048"}
          colorLeft={"#a28"}
          colorRight={"#a28"}
          colorPress={"#dc4ecf"}
          value={quantity}
          background="transparent"
          textColor="black"
          editable={false}
          onChange={(num: number) => {
            setQuantity(num);
          }}
        />
      </ScrollView>

      <View
        style={{
          position: "absolute",
          bottom: 15,
          left: 50,
          right: 50,
          alignItems: "center",
          backgroundColor: "transparent",
        }}
      >
        <MaterialCommunityIcons.Button
          onPress={() => {
            for (let i = 0; i < quantity; ++i) {
              //Add each item to the redux store for later checkout with
              //the additonal comments and info

              //Get all of the key which represent mods and turn them into an
              //array. Probably could have just mapped modName to Option but
              //that is not how it started haha.
              const arratize = Array.from(checked.mods.keys());
              dispatch({
                type: "ADD_ITEM",
                payload: myMenuItem,
                comments: comments,
                adtlCharges: checked.adtlCharges,
                mods: arratize,
              });
            }
            //send the user back to the menu screen after their order has been placed
            navigation.goBack();
          }}
          name="tray-plus"
          size={28}
          color="white"
          backgroundColor="#a28"
          accessibilityLabel="Confirm add item"
        >
          {`Confirm order $${Number(
            quantity * (price + Math.max(0, checked.adtlCharges))
          ).toFixed(2)}`}
        </MaterialCommunityIcons.Button>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    flex: 1,
    // width: '100%',
    // justifyContent: "center",
    // alignItems: 'center',
  },
  bottomcontainer: {
    width: "105%",
    height: 100,
    justifyContent: "center",
    position: "absolute",
    bottom: 0,
  },
  buttonContainer: {},
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  spinner: {
    // margin: 15,
    alignSelf: "center",
  },
});
