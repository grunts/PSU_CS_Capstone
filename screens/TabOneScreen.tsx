import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import ScrollListComponent from "../components/ListViewScroll";
import { useSelector, useDispatch } from "react-redux";
import CheckoutButton from "../components/CheckoutButton";

export default function TabOneScreen({ navigation }: { navigation: any }) {
  const tray = useSelector((state) => state.servingTray);
  return (
    <>
      <View style={styles.container}>
        <ScrollListComponent navigator={navigation} />
      </View>
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
/*<ScrollListComponent navigator={navigation}/>*/

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
