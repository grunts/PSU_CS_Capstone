import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { Ionicons } from '@expo/vector-icons';
import { useHeaderHeight } from '@react-navigation/stack'
import Constants from 'expo-constants';
import { useTheme } from "@react-navigation/native";


export default function TitleBarComponent({title, numItems, navigator}: {title: String, numItems: Number, navigator: any}) {
    const { dark } = useTheme()
    return (
        <View style={styles.inline}>
          <TouchableOpacity
          style={{position: "absolute", right: 10, bottom: 5, flex: 1}}
          onPress={() => navigator.navigate("ServingTray")}
        >
          <View style={styles.container2}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {numItems}
            </Text>
          </View>
          <Ionicons name="restaurant" size={30} color={dark ? "white": "black"} />
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center"
    },
    container2: {
      position: "absolute",
      height: 25,
      width: 25,
      borderRadius: 12,
      backgroundColor: "#a28",
      opacity: 0.7,
      right: 19,
      bottom: 16,
      alignItems: "center",
      justifyContent: "center",
      zIndex: 2000
    },
    inline: {
        flexDirection: 'row',
        justifyContent: "center",
        backgroundColor: "transparent"
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        maxWidth: 200,
    },
  });