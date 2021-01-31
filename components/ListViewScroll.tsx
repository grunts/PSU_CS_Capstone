import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import restaurants from '../mock/restaurant.js';
import { Avatar, ListItem } from 'react-native-elements';


//The list view component - requires the current navigator as an input argument
const App = ({navigator} : {navigator: any}) => {
  
  //Inline component function describing how to render a piece of data from the list when item-containing object is provided as argument
  const renderItem = ({ item }) => (
    //List item component to hold item data with an onPress listener that navigates to the MenuScreen in this navigation stack
    <ListItem bottomDivider onPress={() => navigator.navigate('MenuScreen', {restaurant: item})}>
      <Avatar 
        size="large"
        //Pulls the url from the item's picURL field
        source={{uri: item.picURL}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>{item.address.street}, {item.address.city}, {item.address.state}, {item.address.zip}</ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  //The component that the default export actually returns - a FlatList of ListItems in a SafeAreaView
  return (
    <SafeAreaView style={styles.container}>
      {/*FlatList calls a defined renderItem function and passes it the restaurant for each item in the list*/}
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={item => item.description} />
    </SafeAreaView>
  );
}

//CSS styles for the elements in this component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
});

export default App;
