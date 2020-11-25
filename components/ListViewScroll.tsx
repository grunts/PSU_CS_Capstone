
import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
//our issue is here:
//import restaurants from '../mock/restaurant.js';
//const restaurants = require("../mock/restaurant.js");
/*
const restaurants = [
  {
    description: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
    name: 'First Item',
  },
  {
    description: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
    name: 'Second Item',
  },
  {
    description: '58694a0f-3da1-471f-bd96-145571e29d72',
    name: 'Third Item',
  },
];*/

const restaurants = [
  {
    name: "Yum Yum",
    description: "So good tbh",
    address: {
      street: "1234 the street",
      city: "Portland",
      state: "OR",
      zip: 97214,
    },
    location: {
      longitude: 107.12414,
      latitude: 205.21515,
    },
    menu: [
      {
        name: "food name",
        description: "food desc",
        price: 20.5,
        picURL: "someurl",
      },
      {
        name: "food name 2",
        description: "food desc 2",
        price: 20.52,
      },
    ],
    picURL: "link-to-restaurant photo",
  },
  {
    name: "Other place",
    description: "Not so good tbh",
    address: {
      street: "1234 the street",
      city: "Portland",
      state: "OR",
      zip: 97214,
    },
    location: {
      longitude: 101.12444,
      latitude: 198.15672,
    },
    menu: [
      {
        name: "food name",
        description: "food desc",
        price: 20.5,
        picURL: "someurl",
      },
      {
        name: "food name 2",
        description: "food desc 2",
        price: 20.52,
      },
    ],
    picURL: "link-to-restaurant photo",
  },
  {
    name: "Other place",
    description: "Not so good tbh",
    address: {
      street: "1234 the street",
      city: "Portland",
      state: "OR",
      zip: 97214,
    },
    location: {
      longitude: 101.12444,
      latitude: 198.15672,
    },
    menu: [
      {
        name: "food name",
        description: "food desc",
        price: 20.5,
        picURL: "someurl",
      },
      {
        name: "food name 2",
        description: "food desc 2",
        price: 20.52,
      },
    ],
    picURL: "link-to-restaurant photo",
  },
  {
    name: "Other place",
    description: "Not so good tbh",
    address: {
      street: "1234 the street",
      city: "Portland",
      state: "OR",
      zip: 97214,
    },
    location: {
      longitude: 101.12444,
      latitude: 198.15672,
    },
    menu: [
      {
        name: "food name",
        description: "food desc",
        price: 20.5,
        picURL: "someurl",
      },
      {
        name: "food name 2",
        description: "food desc 2",
        price: 20.52,
      },
    ],
    picURL: "link-to-restaurant photo",
  },
];

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