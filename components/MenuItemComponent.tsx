import React from 'react';
// import { Text as DefaultText, View as DefaultView } from 'react-native';
import { Text, View } from "../components/Themed";
import { StyleSheet, Button, Image } from 'react-native';
import ItemData from "../constants/ItemData";
import { Avatar, ListItem } from 'react-native-elements';

export default function ItemCardComponent({ itemData }:  { itemData: typeof ItemData } ) {
  const {
    name,
    image,
    longDesc,
    shortDesc,
    ABV,
    Allergens,
    price,
  } = itemData

  const displayABV = (abv) => {
    if (abv > 0) {return `${abv}% ABV`}
    return ''
  }

  return (
    <ListItem bottomDivider style={styles.item}>
      <Avatar 
        size="large"
        source={{uri: image}} />
      <ListItem.Content>
        <ListItem.Title>{name} {`$${Number(price).toFixed(2)}`}</ListItem.Title>
        <ListItem.Subtitle>{longDesc}</ListItem.Subtitle>
        <ListItem.Subtitle>{displayABV(ABV)}</ListItem.Subtitle>
        <Text>{'test'}</Text>
            <Button
              onPress={()=>{}}
              title="Add Item"
              color="#a28"
              accessibilityLabel="Add item to tray"
            />
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