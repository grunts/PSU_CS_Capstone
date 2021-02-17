//following https://www.digitalocean.com/community/tutorials/react-react-native-redux

//an 'action' represents a payload of informaion sent from the application to the Redux store
//actions have a:
//  optional payload - the data sent
//  type - what to do with the data (ex: remove this your cart or add it?)

export const addMenuItem = menuItem =>
({
  type: "ADD_ITEM",
  payload: menuItem,
});

export const removeMenuItem = menuItem =>
({
  type: "REMOVE_ITEM",
  payload: menuItem,
});
