import React, { ReactNode } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';
import { MenuItem } from '../types';
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';




//The component holding a menu item and all of its info - requires an object containing a MenuItem as an input argument
export default function ItemCardComponent({ menuItem, children }: { menuItem : MenuItem, children?: ReactNode }) {
  const navigation = useNavigation(); 
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
    customComments
  } = menuItem;

  //Define a function that takes the abv field and determines whether it is > 0 and returns an appropriate ABV string
  const displayABV = (abv: number) => {
    //If abv > 0 return a string with the ABV %.  Otherwise, return an empty string
    return abv > 0 ? `${abv}% ABV` : ''
  }

  //Define the ItemCardComponent and return it as the default export
  return (
    <ListItem containerStyle={styles.item}>
        {/**A simple picture element for holding an image of the food item.*/}
        <Avatar 
          size="xlarge"
          source={{uri: image}} />
        {/**The Content component holds the body of the data in the list item.*/}
        <ListItem.Content>
          <ListItem.Title style={{fontSize: 20}}>{name} {`$${Number(price).toFixed(2)}`}</ListItem.Title>
          <ListItem.Subtitle>{longDesc}</ListItem.Subtitle>
          {/**Extract a useful ABV string from the ABV value using the previously defined displayABV function.*/}
          <ListItem.Subtitle>{displayABV(ABV)}</ListItem.Subtitle>
          {/**Use a convenient button component from react-native-vector-icons to create an add to tray button.*/}
          {/* <MaterialCommunityIcons.Button onPress={() => navigation.navigate('StagingScreen', {MenuItem: menuItem})}
            name="tray-plus"
            size={24} 
            color="white"
            backgroundColor="#a28"
            accessibilityLabel="Add item to tray">
              Add
          </MaterialCommunityIcons.Button> */}
          {children} 
        </ListItem.Content>
    </ListItem>
  );
}

//CSS Styles
const styles = StyleSheet.create({
  item: {
    marginVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: "#a28",
  },
});
