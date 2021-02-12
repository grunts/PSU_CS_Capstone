//following https://briannicholls.home.blog/2020/08/09/adding-redux-to-an-expo-managed-react-native-project/
//This is where we combine all of our reducers.
//As you make them and want them to be useable, import them and put them inside 'combineReducers'.

import { createStore, combineReducers } from "redux";

import servingTrayReducer from "./store/reducers/ServingTray";

const reducer = combineReducers({
  servingTrayReducer,
});

const store = createStore(reducer);

export default store;
