import React from 'react';
//import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Button, Card, Title, Paragraph } from 'react-native-paper';
//const restaurants = require("../mock/restaurant.js");

const ListComponent = () => (
    <Card>
      <Card.Title title="Card Title" subtitle="Card Subtitle" />
      <Card.Content>
        <Title>Card title</Title>
        <Paragraph>Card content</Paragraph>
      </Card.Content>
      {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
    </Card>
  );

  export default ListComponent;