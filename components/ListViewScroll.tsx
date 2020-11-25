
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
//our issue is here:
import restaurants from '../mock/restaurant.js';
//const restaurants = require("../mock/restaurant.js");

const Item = ({ name }) => (
  <View style={styles.item}>
    <Text style={styles.name}>{name}</Text>
  </View>
);

const App = () => {
  const renderItem = ({ item }) => (
    <Item name={item.name} />
  );

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        data={restaurants}
        renderItem={renderItem}
        keyExtractor={item => item.description}
      />
    </SafeAreaView>
  );
}

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