//following https://www.digitalocean.com/community/tutorials/react-react-native-redux

//an 'action' represents a payload of informaion sent from the application to the Redux store
//actions have a:
//  optional payload - the data sent
//  type - what to do with the data (ex: remove this your cart or add it?)

export const addColor = colorIndex =>
({
  type: "ADD_COLOR",
  payload: colorIndex,
});

export const removeColor = colorIndex =>
({
  type: "REMOVE_COLOR",
  payload: colorIndex,
});
