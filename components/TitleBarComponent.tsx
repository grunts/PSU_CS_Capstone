import React from 'react';
import { StyleSheet, TouchableOpacity } from "react-native";
import { Text, View } from "./Themed";
import { Ionicons } from '@expo/vector-icons';

export default function TitleBarComponent({title, numItems, navigator}: {title: String, numItems: Number, navigator: any}) {
    return (
        <View style={styles.inline}>
            <Text style={styles.title}>{title.length < 17 ? title : title.substring(0,17)+"..."}</Text>
          <TouchableOpacity
          style={{position: "absolute", right: 10, bottom: -2, flex: 1}}
          onPress={() => navigator.navigate("ServingTray")}
        >
          <View style={styles.container2}>
            <Text style={{ color: "white", fontWeight: "bold" }}>
              {numItems}
            </Text>
          </View>
          <Ionicons name="restaurant" size={30} />
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
      height: 30,
      width: 30,
      borderRadius: 15,
      backgroundColor: "#a28",
      opacity: 0.7,
      right: 15,
      bottom: 15,
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