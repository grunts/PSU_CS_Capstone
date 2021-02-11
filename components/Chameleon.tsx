/*followed https://www.digitalocean.com/community/tutorials/react-react-native-redux */

import React from "react";
import { View, Button, StyleSheet, Text, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addColor, removeColor } from "../store/actions/Chameleon.js";

/*
QUICK REFERENCE:
Access the current state: store.getState(); 
Update state: store.dispatch(action);
Registers listener callbacks: store.subscribe(listener);
Handle unregistering of listeners via the unsubscribe function returned by store.subscribe(listener);.
*/

class Chameleon extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text style={{ color: "white" }}>Current:</Text>
        {this.props.chameleon.current.map((color, index) => (
          <TouchableOpacity
            key={color}
            onPress={() => this.props.removeColor(index)}
            style={{alignItems: "center", borderWidth: 1, borderColor: "white", padding: 10, marginLeft: 20, marginRight: 20}}
          >
            <Text style={{ color: "white" }}>{color}</Text>
          </TouchableOpacity>
        ))}

        <Text style={{ color: "white" }}>Possible:</Text>
        {this.props.chameleon.possible.map((color, index) => (
          <TouchableOpacity
            key={color}
            onPress={() => this.props.addColor(index)}
            style={{alignItems: "center", borderWidth: 1, borderColor: "white", padding: 10, marginLeft: 20, marginRight: 20}}
          >
            <Text style={{ color: "white" }}>{color}</Text>
          </TouchableOpacity>
        ))}
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

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ addColor, removeColor }, dispatch);

const mapStateToProps = (state) => {
  const { chameleon } = state;
  return { chameleon };
};

export default connect(mapStateToProps, mapDispatchToProps)(Chameleon);
