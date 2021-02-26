import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";
import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import MenuScreen from "../screens/MenuScreen";
import TabOneScreen from "../screens/TabOneScreen";
import TabTwoScreen from "../screens/TabTwoScreen";
import TabThreeScreen from "../screens/OrderHistory";
import StagingScreen from "../screens/StagingScreen";
import ServingTray from "../screens/ServingTray";
import {
  BottomTabParamList,
  TabOneParamList,
  TabTwoParamList,
  TabThreeParamList,
} from "../types";
import TitleBarComponent from "../components/TitleBarComponent";
import { enableScreens } from "react-native-screens";
import { useSelector } from "react-redux";
import { Text, View, StyleSheet, Dimensions, Platform } from "react-native";
import { useTheme } from "@react-navigation/native";
/**This creates a new Navigator to manage switching between list view and map view using the bottom tabs.
 * We give "BottomTab" a type: "BottomTabParamList" - this identifies which object types are valid to use
 * as components for each Screen of the Navigator.*/
const BottomTab = createBottomTabNavigator<BottomTabParamList>();
enableScreens(true);
//Retrieve the tray using redux

/**Create the BottomTabNavigator and export it.*/
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  const tray = useSelector((state) => state.servingTray);
  const { orderHistory } = tray;
  return (
    /**The BottomTab Navigator will have two screens.  The initially displayed screen will be TabOne.
     * The BottomTab will also have some style properties set - namely it will be colored based on the
     * current color scheme as imported from Colors.*/
    <BottomTab.Navigator
      initialRouteName="Restaurants"
      tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}
    >
      {/**The TabOne Screen will be defined by its own navigation stack: TabOneNavigator.  It will also have
       * a tab bar icon as specified in its options property.  The tab bar icon is defined by a lambda function
       * that creates a JSX element with the specified color.*/}
      <BottomTab.Screen
        name="Restaurants"
        component={TabOneNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="fast-food-outline" color={color} />
          ),
        }}
      />

      {/**The TabTwo Screen will also be defined by its own navigation stack: TabTwoNavigator. It will also
       * have a tab bar icon.*/}
      <BottomTab.Screen
        name="Map"
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="map-outline" color={color} />
          ),
        }}
      />

      <BottomTab.Screen
        name="Order"
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <View>
              <TabBarIcon name="newspaper-outline" color={color} />
              {orderHistory.length ? (
                <View style={styles.container2}>
                  <Text style={{ color: "white", fontWeight: "bold" }}>
                    {orderHistory.length}
                  </Text>
                </View>
              ) : null}
            </View>
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}
/**This creates a TabBarIcon JSX element with the given properties.*/
// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: { name: any; color: string }) {
  return <Ionicons size={30} style={{ marginBottom: -3 }} {...props} />;
}

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
const TabOneStack = createStackNavigator<TabOneParamList>();

/**This function defines the stack navigator for Tab One that is used by the BottomTabNavigator to
 * switch between navigation stacks.*/
function TabOneNavigator({ navigation }: { navigation: any }) {
  const tray = useSelector((state) => state.servingTray);
  return (
    /**The TabOne Navigator has two screens, with TabOneScreen (the List View) being
     * the inital (default) screen.*/
    <TabOneStack.Navigator
      initialRouteName="TabOneScreen"
      screenOptions={{
        headerRight: () => (
          <TitleBarComponent
            title="Restaurants"
            numItems={tray.currentTray.length}
            navigator={navigation}
          />
        ),
      }}
    >
      {/**The List View Screen is defined by the TabOneScreen component.  It has a headerTitle
       * designating it as the List View.*/}
      <TabOneStack.Screen
        name="TabOneScreen"
        component={TabOneScreen}
        options={() => ({
          headerTitle: () =>
            Platform.OS === "ios" ? (
              <Text style={{ fontSize: 20, fontWeight: "600" }}>
                Restaurants
              </Text>
            ) : (
              <Text
                style={{
                  position: "absolute",
                  left: Dimensions.get("window").width / 2 - 75,
                  fontSize: 20,
                  bottom: -10,
                  fontWeight: "bold",
                  color: useTheme().dark ? "white" : "black",
                }}
              >
                Restaurants
              </Text>
            ),
          headerBackTitle: "",
        })}
      />
      {/**The Menu Screen is accessed from the List View.  See TabOneScreen component.  The Menu Screen
       * also has a title, but in this case, the title is based on a lambda function that uses the route object
       * (the route object contains the restaurant object as part of its type definition) to extract the name
       * of the restaurant to be used as the title.  If there is no restaurant name in the route object, then
       * the title gets set to "The Menu"*/}

      <TabOneStack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                color: useTheme().dark ? "white" : "black",
              }}
            >
              {route.params.restaurant.name.length < 17
                ? route.params.restaurant.name
                : route.params.restaurant.name.substring(0, 17) + "..."}
            </Text>
          ),
          headerTitleContainerStyle: {
            alignContent: "center",
            alignSelf: "center",
          },
          headerBackTitle: "Back",
        })}
      />
      <TabOneStack.Screen
        name="StagingScreen"
        component={StagingScreen}
        options={{
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                textAlign: "center",
                color: useTheme().dark ? "white" : "black",
              }}
            >
              Customize Your Order
            </Text>
          ),
          headerBackTitle: "Back",
        }}
      />
      <TabOneStack.Screen
        name="ServingTray"
        component={ServingTray}
        options={{
          headerTitle: () => (
            <Text
              style={
                Platform.OS === "android"
                  ? {
                      position: "absolute",
                      left: Dimensions.get("window").width / 2 - 130,
                      fontSize: 20,
                      bottom: -10,
                      fontWeight: "bold",
                      color: useTheme().dark ? "white" : "black",
                    }
                  : { textAlign: "center", fontSize: 18, fontWeight: "700" }
              }
            >
              Serving Tray
            </Text>
          ),

          headerBackTitle: "Back",
        }}
      />
    </TabOneStack.Navigator>
  );
}

/**The stack navigator for tab two.*/
const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator({ navigation }: { navigation: any }) {
  const tray = useSelector((state) => state.servingTray);
  return (
    <TabTwoStack.Navigator
      initialRouteName="TabTwoScreen"
      screenOptions={{
        headerRight: () => (
          <TitleBarComponent
            title="Restaurants"
            numItems={tray.currentTray.length}
            navigator={navigation}
          />
        ),
      }}
    >
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{
          headerTitle: () => (
            <Text
              style={
                Platform.OS === "android"
                  ? {
                      position: "absolute",
                      left: Dimensions.get("window").width / 2 - 32,
                      fontSize: 20,
                      bottom: -10,
                      fontWeight: "bold",
                    }
                  : { textAlign: "center", fontSize: 18, fontWeight: "500" }
              }
            >
              Map
            </Text>
          ),
        }}
      />
      <TabOneStack.Screen
        name="MenuScreen"
        component={MenuScreen}
        options={({ route }) => ({
          headerTitle: () => (
            <Text
              style={{
                fontSize: 18,
                fontWeight: "bold",
                color: useTheme().dark ? "white" : "black",
              }}
            >
              {route.params.restaurant.name.length < 17
                ? route.params.restaurant.name
                : route.params.restaurant.name.substring(0, 17) + "..."}
            </Text>
          ),
          headerBackTitle: "Back",
          headerTitleContainerStyle: { left: 0 },
        })}
      />
      <TabOneStack.Screen
        name="ServingTray"
        component={ServingTray}
        options={{
          headerTitle: () => (
            <Text
              style={
                Platform.OS === "android"
                  ? {
                      position: "absolute",
                      left: Dimensions.get("window").width / 2 - 130,
                      fontSize: 20,
                      bottom: -10,
                      fontWeight: "bold",
                      color: useTheme().dark ? "white" : "black",
                    }
                  : { textAlign: "center", fontSize: 18, fontWeight: "700" }
              }
            >
              Serving Tray
            </Text>
          ),

          headerBackTitle: "Back",
        }}
      />
    </TabTwoStack.Navigator>
  );
}

const TabThreeStack = createStackNavigator<TabThreeParamList>();
function TabThreeNavigator({ navigation }: { navigation: any }) {
  const tray = useSelector((state) => state.servingTray);
  return (
    <TabThreeStack.Navigator
      initialRouteName="TabThreeScreen"
      screenOptions={{
        headerRight: () => (
          <TitleBarComponent
            title="Restaurants"
            numItems={tray.currentTray.length}
            navigator={navigation}
          />
        ),
      }}
    >
      <TabThreeStack.Screen
        name="TabThreeScreen"
        component={TabThreeScreen}
        options={{
          headerTitle: () => (
            <Text
              style={
                Platform.OS === "android"
                  ? {
                      position: "absolute",
                      left: Dimensions.get("window").width / 2 - 65,
                      fontSize: 20,
                      bottom: -10,
                      fontWeight: "bold",
                      color: useTheme().dark ? "white" : "black",
                    }
                  : { textAlign: "center", fontSize: 18, fontWeight: "700" }
              }
            >
              Your Order
            </Text>
          ),
          headerBackTitle: "Back",
        }}
      />
    </TabThreeStack.Navigator>
  );
}

const styles = StyleSheet.create({
  container2: {
    position: "absolute",
    height: 18,
    width: 18,
    borderRadius: 9,
    backgroundColor: "#a28",
    opacity: 0.7,
    right: 19,
    bottom: -4,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2000,
  },
  androidHeader: {
    position: "absolute",
    left: Dimensions.get("window").width / 2 - 32,
    fontSize: 20,
    bottom: -10,
    fontWeight: "bold",
  },
});
/* abandon and delete this comment if there's not enough time to implement
const AllTabs = StackNavigator(
{
  tabOne: { screen: TabOneScreen },
  menu : {screen: MenuScreen },
  servingTray : { screen: ServingTray },
  tabTwo : { screen: TabTwoScreen}
}
*/
