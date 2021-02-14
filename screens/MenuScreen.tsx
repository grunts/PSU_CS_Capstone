import * as React from "react";
import { StyleSheet, SectionList } from "react-native";
import { Text, View } from "../components/Themed";
import MenuTitleComponent from "../components/MenuTitleComponent";
import MenuItemComponent from "../components/MenuItemComponent";
import DefaultRestaurant from "../constants/DefaultRestaurant";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import SearchBar from "../components/SearchBar";
import { connect, useDispatch } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { addMenuItem, removeMenuItem } from "../store/actions/ServingTray.js";

function MenuScreen({ route }) {
  const { restaurant } = route.params;
  const { menu } = restaurant;
  const categories = extractCategories(menu);
  const dispatch = useDispatch();

  const renderItem = ({ item }) => (
    <View>
      <MenuItemComponent menuItem={item}>
          {/**Use a convenient button component from react-native-vector-icons to create an add to tray button.*/}
          <MaterialCommunityIcons.Button
            onPress={() => dispatch({ type: "ADD_ITEM", payload: item })}
            name="tray-plus"
            size={24} 
            color="white"
            backgroundColor="#a28"
            accessibilityLabel="Add item to tray">
              Add
          </MaterialCommunityIcons.Button>
      </MenuItemComponent>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* <MenuTitleComponent
        title={restaurant.name ?? DefaultRestaurant.name}
      ></MenuTitleComponent> */}
      {/*<MenuItemComponent menuItem={restaurant.menu[0]} />*/}
      <SearchBar
        renderFunction={renderItem}
        dataToBeSearched={menu}
        fieldToSearch={"name"}
      />
      <SectionList
        sections={categories}
        keyExtractor={(item, index) => item + index}
        renderItem={renderItem}
        style={{paddingTop: 5, height: "100%"}}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => <Text style={{fontWeight: "500", fontSize: 15}}>{title}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    //flex: 1,
    justifyContent: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
});

const reducer = (accumulator, currentItem) => {
  if (accumulator[currentItem.category]) {
    accumulator[currentItem.category].push(currentItem);
  } else {
    accumulator[currentItem.category] = [currentItem];
  }
  return accumulator;
};

const extractCategories = (menu: any) => {
  const categoriesObj = menu.reduce(reducer, {});
  return Object.keys(categoriesObj).map((category) => ({
    title: category,
    data: categoriesObj[category],
  }));
};

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ addMenuItem, removeMenuItem }, dispatch);

const mapStateToProps = (state: any) => {
  const { servingTray } = state;
  return { servingTray };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuScreen);
