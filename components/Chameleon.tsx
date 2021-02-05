/*followed https://www.digitalocean.com/community/tutorials/react-react-native-redux*/

import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

/*
IMPORTANT: Provider will need to wrap the entire App for consitent state
across the app. I don't know how to do this for React Native yet. -Jasmine
*/
import { Provider, connect } from 'react-redux';
import { createStore, bindActionCreators } from 'redux';
import chameleonReducer from '../store/reducers/ChameleonReducer'
const store = createStore(chameleonReducer);

/*
QUICK REFERENCE:
Access the current state: store.getState();
Update state: store.dispatch(action);
Registers listener callbacks: store.subscribe(listener);
Handle unregistering of listeners via the unsubscribe function returned by store.subscribe(listener);.
*/

class Chameleon extends React.Component
{
  render(){
    return(
      <View style={styles.container}>

        <Text>Current:</Text>
        {this.props.chameleon.current.map((color, index) => (
            <Button key={color} 
                    title={color}
                    onPress={() => this.props.removeColor(index)}/>))}

        <Text>Possible:</Text>
        {this.props.chameleon.possible.map((color, index) => (
            <Button key={color} 
                    title={color}
                    onPress={() => this.props.addColor(index)}/>))}

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
});

/*
state: the part of components that adjust dynamically, like the number of freinds a user has on heir friends list at any gien time
store: persisent data syntactically defined by us, stored on the device, and modified by the user, such as what toppings are on a cake; we say what topping they can choose, they pick some, and the device remembers between screens.
Part of the point of Redux is mapping state and store, so that when the store changes, components on-screen will change in real time. That's what these functions help to do.
*/

const mapDispatchToProps = dispatch => (
  bindActionCreators({addColor, removeColor}, dispatch}))
);

const mapStateToProps = (state) =>
{
  const {chameleon} = state;
  return {chameleon};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chameleon);
