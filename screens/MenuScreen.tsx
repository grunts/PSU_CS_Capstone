import * as React from "react";
import { StyleSheet, SectionList } from "react-native";
import { Text, View } from "../components/Themed";
import MenuItemComponent from "../components/MenuItemComponent";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import SearchBar from "../components/SearchBar";
import CheckoutButton from "../components/CheckoutButton";
import { MenuItem } from "../types";
import { ServingTrayState } from "../store/reducers/types";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
//Get the pushToken from local storage
// const getData = async () => {
//   try {
//     const jsonValue = await AsyncStorage.getItem('@pushToken')
//     return jsonValue != null ? JSON.parse(jsonValue) : null;
//   } catch(e) {
//     // error reading value
//     console.log(e)
//   }
// }

interface Props {
  route: {
    params: {
      restaurant: { menu: MenuItem[] }
    }
  }
}

interface RootState {
  servingTray: ServingTrayState;
}

export default function MenuScreen({ route }: Props) {
  /** array containing menu items */
  const menu = route.params.restaurant.menu;
  /** tray state object containing an array of menu items */
  const tray = useSelector((state: RootState) => state.servingTray);
  /** array of categories that each contain a title and an array of menu items */
  const categories = extractCategories(menu);

  /**
   * Components to render for flatlist and how it uses the menu item
   * @param props object containing a menu item
   */
  const renderItem = ({ item }: { item: MenuItem }) => (
      <MenuItemComponent menuItem={item}>
        {/**Use a convenient button component from react-native-vector-icons to create an add to tray button.*/}
        <MaterialCommunityIcons.Button
          onPress={() => navigation.navigate('StagingScreen', {MenuItem: item})}
          name="tray-plus"
          size={24}
          color="white"
          backgroundColor="#a28"
          accessibilityLabel="Add item to tray"
        >
          Add
        </MaterialCommunityIcons.Button>
      </MenuItemComponent>
  );

  /** Navigation prop of the parent screen */
  const navigation = useNavigation();
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
        keyExtractor={(item, index) => JSON.stringify(item) + index}
        renderItem={renderItem}
        style={{ paddingTop: 5, height: "100%" }}
        stickySectionHeadersEnabled={false}
        renderSectionHeader={({ section: { title } }) => (
          <Text style={{color: "black", fontWeight: "500", fontSize: 18, paddingLeft: 5}}>{title}</Text>
        )}
        contentContainerStyle={{ paddingBottom: 100, backgroundColor: "white" }}
      />

      {/** 
       * If current tray is not empty, display the checkout button
       */}
      {tray.currentTray.length ? (
        <View
          style={{
            position: "absolute",
            bottom: 45,
            left: 50,
            right: 50,
            alignItems: "center",
            backgroundColor: "transparent",
          }}
        >
          <CheckoutButton cartLength={tray.currentTray.length}></CheckoutButton>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: "white",
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

/**
 * Reducer to separate items by category.
 * If a new category is found, it creates a new category array
 * This orders categories by first appearance in the array.
 * This is also case sensitive.
 * @param accumulator {object} the result of each pass sorting the item into a category
 * @param currentItem {MenuItem} the item to be sorted to a category
 * @returns accumlator after sorting the item
 */
const reducer = (accumulator: MenuItem[][], currentItem: MenuItem) => {
  if (accumulator[currentItem.category]) {
    accumulator[currentItem.category].push(currentItem);
  } else {
    accumulator[currentItem.category] = [currentItem];
  }
  return accumulator;
};

/**
 * 
 * @param menu {MenuItem[]} the array of all menu items to be extracted
 */
const extractCategories = (menu: MenuItem[]) => {
  const categoriesObj = menu.reduce(reducer, []);
  return Object.keys(categoriesObj).map((category) => ({
    title: category,
    data: categoriesObj[category],
  }));
};

//An example of calling this function from a button may look like async () => sendPushNotification()
// async function sendPushNotification() {
//   const expoPushToken = await getData()
//   const message = {
//     to: expoPushToken,
//     sound: 'default',
//     title: 'Original Title',
//     body: 'And here is the body!',
//     data: { someData: 'goes here' },
//   }

//   await fetch('https://exp.host/--/api/v2/push/send', {
//     method: 'POST',
//     headers: {
//       Accept: 'application/json',
//       'Accept-encoding': 'gzip, deflate',
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(message),
//   });
// }
