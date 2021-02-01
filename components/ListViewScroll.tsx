import React from "react";
import { SafeAreaView, FlatList, StyleSheet, StatusBar } from "react-native";
import restaurants from "../mock/restaurant.js";
import { Avatar, ListItem } from "react-native-elements";
import SearchBar from "./SearchBar";
import { useTheme } from "@react-navigation/native";


const App = ({navigator} : {navigator: any}) => {
  const renderItem = ({ item }) => (
  <ListItem bottomDivider onPress={() => navigator.navigate('MenuScreen', {restaurant: item})}>
      <Avatar 
        size="large"
        source={{uri: item.picURL}} />
      <ListItem.Content>
        <ListItem.Title>{item.name}</ListItem.Title>
        <ListItem.Subtitle>
          {item.address.street}, {item.address.city}, {item.address.state},{" "}
          {item.address.zip}
        </ListItem.Subtitle>
      </ListItem.Content>
    </ListItem>
  );

  return (
    <SafeAreaView style={styles.container}>
      <SearchBar
        renderFunction={renderItem}
        dataToBeSearched={restaurants}
        fieldToSearch={"name"}
      />
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={(item) => item.description}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
    height: "20%",
  },
  container2: {
    flex: 4,
    marginTop: StatusBar.currentHeight || 0,
    height: "20%",
  },
  item: {
    backgroundColor: "#f9c2ff",
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  name: {
    fontSize: 32,
  },
});

export default App;
