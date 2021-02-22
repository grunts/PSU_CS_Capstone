//following https://www.digitalocean.com/community/tutorials/react-react-native-redux

import { combineReducers } from "redux";
import {
  ServingTrayState,
  ServingTrayActionTypes,
  ADD_ITEM,
  REMOVE_ITEM,
} from "./types";
//define what the chameleon's current and possible colors are
//it can be more than one color at once, right now it is none... don't think about it too hard
//we create an 'action', ../actions/ChameleonActions.js, so we have a way to add colors to our chameleon
const INITIAL_STATE = {
  currentTray: [],
};

const servingTrayReducer = (
  state: ServingTrayState = INITIAL_STATE,
  action: ServingTrayActionTypes
) => {
  //moved this line here to avoid it dumbly thinking I'm redeclaring the same variables for each
  const { currentTray } = state;
  switch (action.type) {
    case ADD_ITEM:
      //Without this step of creating a new object, we make shallow copies
      //and cannot have unique items that are the same order
      const newObj = Object.assign({}, action.payload, {
        customComments: action.comments,
        price: action.payload.price + action.adtlCharges,
        mods: action.mods
      });
      return { currentTray: [...currentTray, newObj] };

    case REMOVE_ITEM:
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
