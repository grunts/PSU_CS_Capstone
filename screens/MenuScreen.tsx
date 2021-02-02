import * as React from "react";
import { StyleSheet, SectionList } from "react-native";
import { Text, View } from "../components/Themed";
import MenuTitleComponent from "../components/MenuTitleComponent";
import MenuItemComponent from "../components/MenuItemComponent";
import DefaultRestaurant from "../constants/DefaultRestaurant";
import SearchBar from "../components/SearchBar";

export default function MenuScreen({ route }) {
  const { restaurant } = route.params;
  const { menu } = restaurant;
  const categories = extractCategories(menu);
  const renderItem = ({ item }) => (
    <View>
      <MenuItemComponent menuItem={item} />
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
