import React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import { Avatar, ListItem } from 'react-native-elements';

/*
IMPORTANT: Provider will need to wrap the entire App for consitent state
across the app. I don't know how to do this for React Native yet. -Jasmine
*/
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import chameleonReducer from '../store/reducers/ChameleonReducer'
const store = createStore(chameleonReducer);

/*
QUICK REFERENCE:
Access the current state: store.getState();
Update state: store.dispatch(action);
Registers listener callbacks: store.subscribe(listener);
Handle unregistering of listeners via the unsubscribe function returned by store.subscribe(listener);.
*/

/*
TODO: Component to display current colors
*/

/*
TODO: Component to display possible colors
*/

/*
TODO: Component to add to current colors
*/
