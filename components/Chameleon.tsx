import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';

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

const App = () => {
  /*
  TODO: Component to display current colors
  */

  /*
  TODO: Component to display possible colors
  */

  /*
  TODO: Component to add to current colors
  */
    <SafeAreaView style={styles.container}>
      <Text>TODO</Text>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});
