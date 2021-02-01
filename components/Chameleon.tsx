/*followed https://www.digitalocean.com/community/tutorials/react-react-native-redux*/

import React from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';

/*
IMPORTANT: Provider will need to wrap the entire App for consitent state
across the app. I don't know how to do this for React Native yet. -Jasmine
*/
import { Provider, connect } from 'react-redux';
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

class Chameleon extends React.Component
{
  render(){
    return(
      <View style={styles.container}>

        <Text>Current:</Text>
        {this.props.chameleon.current.map((chameleon, index) => (
            <Button key={chameleon} 
                    title={chameleon}
                    onPress={() => this.props.removeColor(index)}/>))}

        <Text>Possible:</Text>
        {this.props.chameleon.possible.map((chameleon, index) => (
            <Button key={chameleon} 
                    title={chameleon}
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

const mapDispatchToProps = dispatch => (
  bindActionCreators({addColor, removeColor}, dispatch}))
);

const mapStateToProps = (state) =>
{
  const {chameleon} = state;
  return {chameleon};
}

export default connect(mapStateToProps, mapDispatchToProps)(Chameleon);
