import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function StagingScreen({ route }) {
    const { menuItem } = route.params;

    return (
        <View style={styles.container}>
        <Text>Hello World!</Text>
        {/* food item title - this will be in BottomTabNavigator
            image
            longDescription 
            quantity
            list of mandatory mods
            list of non-mandatory mods
            add to cart button
             */}
            <MaterialCommunityIcons.Button
            name="tray-plus"
            size={34} 
            color="white"
            backgroundColor="#a28"
            accessibilityLabel="Confirm add item">
              Finish
           </MaterialCommunityIcons.Button>
        </View>
    );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});