import * as React from "react";
import { StyleSheet } from "react-native";
import { Avatar } from 'react-native-elements';
import { Text, View } from "../components/Themed";
import { MenuItem } from '../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function StagingScreen({route}) {
    console.log("This is the route:");
    console.log(route);
    console.log("This is params:");
    console.log(route.params);
    console.log("This is menuItem:");
    console.log(route.params.MenuItem);
    const myMenuItem = route.params.MenuItem;
    
    const {
      name,
      image,
      longDesc,
      shortDesc,
      ABV,
      Allergens,
      price,
      mandatoryMods,
    } = myMenuItem;

    return (
        <View style={styles.container}>
        {/* food item title - this will be in BottomTabNavigator
            image
            longDescription 
            quantity
            list of mandatory mods
            list of non-mandatory mods
            optional comment
            add to cart button
             */}
             <Avatar 
          size="large"
          source={{uri: image}} />
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