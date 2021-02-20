import * as React from "react";
import { Keyboard, StyleSheet, Platform } from "react-native";
import { Text, View } from "../components/Themed";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { Image, ScrollView } from "react-native";
import { Card, Input } from "react-native-elements";
import InputSpinner from "react-native-input-spinner";
import { TextInput, KeyboardAvoidingView } from "react-native";
import { RadioButton } from "react-native-paper";
import { connect, useSelector, useDispatch } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { CheckBox } from "react-native-elements";

export default function StagingScreen({ route }) {
  let obj = {};
  const [quantity, setQuantity] = React.useState(1);
  const myMenuItem = route.params.MenuItem;
  const [comments, setComments] = React.useState("");
  const [checked, setChecked] = React.useState({ adtlCharges: 0 });
  const { colors, dark } = useTheme();
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

  const mandCount = mandatoryMods.length;
  const nonMandCount = nonMandatoryMods.length;

  console.log(checked);
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
              <>
                <View
                  key={mod.modName}
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
                  <Text style={{ color: "black", paddingLeft: 10 }}>
                    Required
                  </Text>
                  {/* {console.log(mod.modOptions.map(a=>a.option))} */}
                </View>
                <View
                  key={index}
                  style={{ backgroundColor: "transparent", width: "100%" }}
                >
                  {mod.modOptions.map((opt, index) => {
                    var name = mod.modName;
                    return (
                      <>
                        <View
                          key={`${opt}${index}`}
                          style={{
                            backgroundColor: "transparent",
                            flexDirection: "row",
                          }}
                        >
                          {/* <View
                            style={{
                              backgroundColor: "transparent",
                              borderWidth: 1,
                              height: 35,
                              width: 35,
                              borderRadius: 13,
                              marginLeft: 5,
                              marginTop: 3,
                              borderColor: "green",
                            }}
                          >
                            <RadioButton
                              value={index}
                              status={
                                checked[`${mod.modName}`] === index
                                  ? "checked"
                                  : "unchecked"
                              }
                              onPress={() => {
                                // obj[`${mod.modName}`] = index;
                                setChecked({ ...checked, [name]: index });
                              }}
                            />
                          </View> */}

                          <CheckBox
                            checked={
                              checked[`${mod.modName}`] === index ? true : false
                            }
                            checkedColor="#a28"
                            onPress={() => {
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
                              paddingLeft: 0
                            }}
                          >
                            {opt.option}
                          </Text>
                          {opt.adtlPrice ? <Text>{opt.adtlPrice}</Text> : null}
                        </View>
                        <Card.Divider
                          style={{ marginBottom: 0 }}
                        ></Card.Divider>
                      </>
                    );
                  })}
                </View>
              </>
            ))
          : null}

        {/*Check and display optional mods */}
        {nonMandatoryMods.length
          ? nonMandatoryMods.map((mod, index) => (
              <>
                <View
                  key={mod.modName}
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
                  key={index}
                  style={{ backgroundColor: "transparent", width: "100%" }}
                >
                  {mod.modOptions.map((opt, index) => {
                    return (
                      <>
                        <View
                          key={opt}
                          style={{
                            backgroundColor: "transparent",
                            flex: 1,
                            flexDirection: "row",
                            width: "100%",
                            justifyContent: "space-between",
                          }}
                        >
                          <CheckBox
                            checked={
                              typeof checked[mod.modName + opt.option] ===
                              "number"
                                ? true
                                : false
                            }
                            checkedColor="#a28"
                            onPress={() => {
                              const isChecked =
                                typeof checked[mod.modName + opt.option] ===
                                "number";
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
                                color: "black",
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
                      </>
                    );
                  })}
                </View>
              </>
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
        {/* <Card.Title style={{ color: colors.text, textAlign: "right" }}>
          ${Number(price).toFixed(2)}
        </Card.Title> */}
        {/* </Card> */}
        {/* The display for the input spinner is behaving strangely */}

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
              myMenuItem["customComments"] = comments;
              console.log(myMenuItem);
              dispatch({ type: "ADD_ITEM", payload: myMenuItem });
            }
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
