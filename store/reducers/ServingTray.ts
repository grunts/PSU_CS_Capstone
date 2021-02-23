//following https://www.digitalocean.com/community/tutorials/react-react-native-redux

import { combineReducers } from "redux";
import {
  ServingTrayState,
  ServingTrayActionTypes,
  ADD_ITEM,
  REMOVE_ITEM,
  TRAY_CONFIRMED,
  CLOSE_TAB,
} from "./types";
//define what the chameleon's current and possible colors are
//it can be more than one color at once, right now it is none... don't think about it too hard
//we create an 'action', ../actions/ChameleonActions.js, so we have a way to add colors to our chameleon
const INITIAL_STATE = {
  currentRestaurant: null,
  currentTray: [],
  orderHistory: [],
};

const servingTrayReducer = (
  state: ServingTrayState = INITIAL_STATE,
  action: ServingTrayActionTypes
) => {
  //moved this line here to avoid it dumbly thinking I'm redeclaring the same variables for each
  const { currentTray, currentRestaurant, orderHistory } = state;
  switch (action.type) {
    case ADD_ITEM:
      //Without this step of creating a new object, we make shallow copies
      //and cannot have unique items that are the same order
      const newObj = Object.assign({}, action.payload, {
        customComments: action.comments,
        price: action.payload.price + action.adtlCharges,
        mods: action.mods,
      });
      return {
        ...state,
        currentTray: [...currentTray, newObj],
        currentRestaurant: action.currentRestaurant,
      };

    case REMOVE_ITEM:
      //functional approach to Array.splice()
      let currentRest = currentRestaurant;
      const state_after_remove = currentTray.filter(
        (item, idx) => idx !== action.index
      );
      if (!state_after_remove.length) {
        currentRest = null;
      }
      //This is a position based removal. Makes dealing with duplicate items easy.
      return {
        ...state,
        currentTray: state_after_remove,
        currentRestaurant: currentRest,
      };

    case TRAY_CONFIRMED:
      // const historyChunk = currentTray.map(item =>{
      //   return Object.assign({}, item)
      // })
      // console.log([...orderHistory, historyChunk])
      const toBeHistory = currentTray;
      return {
        ...state,
        orderHistory: orderHistory.concat(toBeHistory),
        currentTray: [],
      };

    case CLOSE_TAB:
      return {...state, orderHistory: [], currentRestaurant: null}

    default:
      return state;
  }
};

//exporting the chameleonReducer as a property called chameleon
export default combineReducers({
  servingTray: servingTrayReducer,
});
