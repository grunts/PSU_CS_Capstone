//following https://www.digitalocean.com/community/tutorials/react-react-native-redux

import { combineReducers } from "redux";

//define what the chameleon's current and possible colors are
//it can be more than one color at once, right now it is none... don't think about it too hard
//we create an 'action', ../actions/ChameleonActions.js, so we have a way to add colors to our chameleon
const INITIAL_STATE = {
  currentTray: [],
};

const servingTrayReducer = (state = INITIAL_STATE, action) => {
  //moved this line here to avoid it dumbly thinking I'm redeclaring the same variables for each
  const { currentTray } = state;
  switch (action.type) {
    case "ADD_ITEM":
      //make a copy of our state to modify on so we don't have awkward
      //intermediate changes in our real state while we're processing
      //const {current, possible} = state_;
      //pull the color out of the possible colors
      //nothing will be returned if the user requested an impossible color,
      //as intended

      //Create a whole new array based on the contents of the previous state with our new addition.
      return { currentTray: [...currentTray, action.payload] };

    case "REMOVE_ITEM":
      //functional approach to Array.splice()
      const state_after_remove = currentTray.filter(
        (item, idx) => idx !== action.index
      );

      //This is a position based removal. Makes dealing with duplicate items easy.
      return { currentTray: state_after_remove };

    default:
      return state;
  }
};

//exporting the chameleonReducer as a property called chameleon
export default combineReducers({
  servingTray: servingTrayReducer,
});
