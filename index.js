//following https://briannicholls.home.blog/2020/08/09/adding-redux-to-an-expo-managed-react-native-project/
//This is the overrided starting point for the App.
//It only exists so we can wrap the App in a Provider element to get redux to sync across the entire app

import React from 'react';
import App from './App';

import store from './store.js';

import { Provider } from 'react-redux';
import { registerRootComponent } from 'expo';

const NewRootComponent = () =>
{
  return (<Provider store={store}><App/></Provider>);
}

export default registerRootComponent(NewRootComponent);
