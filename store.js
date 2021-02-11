//following https://briannicholls.home.blog/2020/08/09/adding-redux-to-an-expo-managed-react-native-project/
//This is where we combine all of our reducers.
//As you make them and want them to be useable, import them and put them inside 'combineReducers'.

import { createStore, combineReducers } from 'redux';

import chameleonReducer from './store/reducers/Chameleon'

const reducer = combineReducers({
  chameleonReducer,
  
  });

const store = createStore(reducer);

export default store;
