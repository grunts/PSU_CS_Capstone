import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import ScrollListComponent from "../components/ListViewScroll";
import { connect, useSelector } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { addMenuItem, removeMenuItem } from "../store/actions/ServingTray.js";

function TabOneScreen({navigation, servingTray}: {navigation: any, servingTray: any}) {
  const { currentTray } = servingTray;
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate('ServingTray')}>Serving Tray {servingTray.currentTray.length}</Text>
      <ScrollListComponent navigator={navigation}/>
    </View>
  );
}
      /*<ScrollListComponent navigator={navigation}/>*/

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
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

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ addMenuItem, removeMenuItem }, dispatch);

const mapStateToProps = (state: any) => {
  const { servingTray } = state;
  return { servingTray };
};

export default connect(mapStateToProps, mapDispatchToProps)(TabOneScreen);
