import React from 'react';
import { StyleSheet, Button, Image } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { MenuItem } from '../types';


//The component holding a menu item and all of its info - requires an object containing a MenuItem as an input argument
export default function ItemCardComponent({ menuItem }: { menuItem : MenuItem }) {
  
  //Extract constants name, image, longDesc, etc. from menuItem object
  const {
    name,
    image,
    longDesc,
    shortDesc,
    ABV,
    Allergens,
    price,
    mandatoryMods,
  } = menuItem

  //Define a function that takes the abv field and determines whether it is > 0 and returns an appropriate ABV string
  const displayABV = (abv: number) => {
    //If abv > 0 return a string with the ABV %.  Otherwise, return an empty string
    return abv > 0 ? `${abv}% ABV` : ''
  }

  //Define the ItemCardComponent and return it as the default export
  return (
    <ListItem bottomDivider style={styles.item}>
        <Avatar 
          size="large"
          source={{uri: image}} />
        <ListItem.Content>
          <ListItem.Title>{name} {`$${Number(price).toFixed(2)}`}</ListItem.Title>
          <ListItem.Subtitle>{longDesc}</ListItem.Subtitle>
          <ListItem.Subtitle>{displayABV(ABV)}</ListItem.Subtitle>
          <MaterialCommunityIcons.Button
          name="tray-plus"
          size={24} 
          color="white"
          backgroundColor="#a28"
          accessibilityLabel="Add item to tray"
            >Add
          </MaterialCommunityIcons.Button>
        </ListItem.Content>
    </ListItem>
  );
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: '#f9c2ff',
    padding: 5,
    marginVertical: 8,
    marginHorizontal: 16,
    // flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});