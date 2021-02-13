/*followed https://www.digitalocean.com/community/tutorials/react-react-native-redux */

import React from "react";
import { View, Button, StyleSheet, Text, StatusBar } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addMenuItem, removeMenuItem } from "../store/actions/ServingTray.js";
/*
QUICK REFERENCE:
Access the current state: store.getState(); 
Update state: store.dispatch(action);
Registers listener callbacks: store.subscribe(listener);
Handle unregistering of listeners via the unsubscribe function returned by store.subscribe(listener);.
*/
const test = [
  {
    name: "Chicken",
    image:
      "https://cdn.apartmenttherapy.info/image/upload/f_auto,q_auto:eco,w_730/k%2Farchive%2F0f9d4548ea77f774030c30c2bbb6376418b4cc26",
    shortDesc: "Just some plain chicken.",
    longDesc: "Just some plain chicken, dipped in nothing.",
    price: 9.0,
    Allergens: "chicken",
    category: "Entree",
    mandatoryMods: [],
    nonMandatoryMods: [],
  },
  {
    name: "French Fries",
    image:
      "https://www.weightwatchers.com/images/1033/dynamic/foodandrecipes/2010/07/parmchickenstrips_xl.jpg",
    shortDesc: "Thin pieces of chicken.",
    longDesc: "They're actually also just chicken but in thinner pieces.",
    price: 6.0,
    category: "Side",
    mandatoryMods: [],
    nonMandatoryMods: [],
  },
  {
    name: "Rotisserie Chicken",
    image:
      "https://www.dinneratthezoo.com/wp-content/uploads/2019/06/rotisserie-chicken-3.jpg",
    shortDesc: "A whole rotisserie chicken.",
    longDesc: "A whole entire rotisserie chicken.",
    price: 22.0,
    category: "Entree",
    mandatoryMods: [],
    nonMandatoryMods: [],
  },
  {
    name: "Chick on a Plate",
    image:
      "https://image.shutterstock.com/z/stock-photo-a-live-chicken-on-a-plate-knife-and-fork-concept-do-not-eat-animals-402618625.jpg",
    shortDesc: "A live chick.",
    longDesc:
      "In the middle of your plate with plenty of watermarks, this chick is what keeps customers coming back.",
    price: 4.99,
    category: "Appetizer",
    mandatoryMods: [],
    nonMandatoryMods: [],
  },
  {
    name: "Chicken Hat",
    image:
      "https://images-na.ssl-images-amazon.com/images/I/41xAAr5ue4L._AC_.jpg",
    shortDesc: "An inedible chicken hat.",
    longDesc:
      "Don't try to eat this! Fun for the whole family, this hat looks like a chicken.",
    price: 19.99,
    category: "Merch",
    mandatoryMods: [],
    nonMandatoryMods: [],
  },
];
const ReduxExample = () => {
  const tray = useSelector((state) => state.servingTray);
  const dispatch = useDispatch();
  return (
    <View style={styles.container}>
      <Text style={{ color: "white" }}>Current:</Text>
      {tray.currentTray.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() =>
            dispatch({ type: "REMOVE_ITEM", payload: item, index: index })
          }
          style={{
            alignItems: "center",
            borderWidth: 1,
            borderColor: "white",
            padding: 10,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Text style={{ color: "white" }}>
            {item.name} and {item.idCustom}
          </Text>
        </TouchableOpacity>
      ))}

      <Text style={{ color: "white" }}>
        Add a menu item to the redux store:
      </Text>
      {test.map((item, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => dispatch({ type: "ADD_ITEM", payload: item })}
          style={{
            alignItems: "center",
            borderWidth: 1,
            borderColor: "white",
            padding: 10,
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          <Text style={{ color: "white" }}>{item.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

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
  bindActionCreators({ addMenuItem, removeMenuItem }, dispatch);

const mapStateToProps = (state) => {
  const { servingTray } = state;
  return { servingTray };
};

export default connect(mapStateToProps, mapDispatchToProps)(ReduxExample);
