import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import ScrollListComponent from "../components/ListViewScroll";
import { useSelector, useDispatch } from "react-redux";
import CheckoutButton from "../components/CheckoutButton";
import { ServingTrayState } from "../store/reducers/types";


interface RootState {
  servingTray: ServingTrayState;
}

export default function TabOneScreen() {
  const tray: ServingTrayState = useSelector((state: RootState) => state.servingTray);
  return (
    <>
      <ScrollListComponent/>
      {tray.currentTray.length ? (
        <View
          style={{
            position: "absolute",
            bottom: 15,
            left: 50,
            right: 50,
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <CheckoutButton cartLength={tray.currentTray.length}></CheckoutButton>
        </View>
      ) : null}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "white"
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 10,
    width: "80%",
  },
});
