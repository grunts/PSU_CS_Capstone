//following https://www.digitalocean.com/community/tutorials/react-react-native-redux

import { combineReducers } from 'redux';

//define what the chameleon's current and possible colors are 
//it can be more than one color at once, right now it is none... don't think about it too hard
//we create an 'action', ../actions/ChameleonActions.js, so we have a way to add colors to our chameleon
const INITIAL_STATE = 
{
  current: [],
  possible: ['red', 'green', 'blue', 'black', 'white'],
};

const chameleonReducer = (state = INITIAL_STATE, action) =>
{
  switch(action.type)
  {
    case 'ADD_COLOR':
      //make a copy of our state to modify on so we don't have awkward
      //intermediate changes in our real state while we're processing
      const state = {current, possible};
      //pull the color out of the possible colors
      //nothing will be returned if the user requested an impossible color,
      //as intended
      const addedColor = possible.splice(action.payload, 1);
      //add color to current colors
      current.push(addedColor);
      //update the state
      const newState = {current, possible};
      return newState;

    case 'REMOVE_COLOR':
      const state = {current, possible};
      const removedColor = current.splice(action.payload, 1);
      possible.push(removedColor);
      const newState = {current, possible};
      return newState;

    default:
      return state;
  }
}

//exporting the chameleonReducer as a property called chameleon
export default combineReducers
({
  chameleon: chameleonReducer
});
