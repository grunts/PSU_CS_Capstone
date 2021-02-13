import { Ionicons } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import * as React from 'react';
import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import MenuScreen from '../screens/MenuScreen';
import TabOneScreen from '../screens/TabOneScreen';
import TabTwoScreen from '../screens/TabTwoScreen';
import { BottomTabParamList, TabOneParamList, TabTwoParamList } from '../types';

/**This creates a new Navigator to manage switching between list view and map view using the bottom tabs.
 * We give "BottomTab" a type: "BottomTabParamList" - this identifies which object types are valid to use
 * as components for each Screen of the Navigator.*/
const BottomTab = createBottomTabNavigator<BottomTabParamList>();


/**Create the BottomTabNavigator and export it.*/
export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  return (
    /**The BottomTab Navigator will have two screens.  The initially displayed screen will be TabOne. 
     * The BottomTab will also have some style properties set - namely it will be colored based on the
     * current color scheme as imported from Colors.*/
    <BottomTab.Navigator initialRouteName="Restaurants" tabBarOptions={{ activeTintColor: Colors[colorScheme].tint }}>
      
      {/**The TabOne Screen will be defined by its own navigation stack: TabOneNavigator.  It will also have
       * a tab bar icon as specified in its options property.  The tab bar icon is defined by a lambda function
       * that creates a JSX element with the specified color.*/}
      <BottomTab.Screen
        name="Restaurants"
        component={TabOneNavigator}
        options={{ tabBarIcon: ({ color }) => <TabBarIcon name="fast-food-outline" color={color} /> }}/>

      {/**The TabTwo Screen will also be defined by its own navigation stack: TabTwoNavigator. It will also
       * have a tab bar icon.*/}
      <BottomTab.Screen
        name="Map"
        component={TabTwoNavigator}
        options={{ tabBarIcon: ({ color }) => <TabBarIcon name="map-outline" color={color} /> }}/>

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
function TabOneNavigator() {
  return (
    /**The TabOne Navigator has two screens, with TabOneScreen (the List View) being 
     * the inital (default) screen.*/
    <TabOneStack.Navigator initialRouteName="TabOneScreen">
      {/**The List View Screen is defined by the TabOneScreen component.  It has a headerTitle 
        * designating it as the List View.*/}
      <TabOneStack.Screen name="TabOneScreen" component={TabOneScreen} options={{ headerTitle: 'Restaurants ' }}/>
      {/**The Menu Screen is accessed from the List View.  See TabOneScreen component.  The Menu Screen
        * also has a title, but in this case, the title is based on a lambda function that uses the route object
        * (the route object contains the restaurant object as part of its type definition) to extract the name
        * of the restaurant to be used as the title.  If there is no restaurant name in the route object, then
        * the title gets set to "The Menu"*/}
      <TabOneStack.Screen name="MenuScreen" component={MenuScreen} options={({ route }) => ({ title: route?.params?.restaurant?.name} ?? 'The Menu')}/>
    </TabOneStack.Navigator>
  );
}


/**The stack navigator for tab two.*/
const TabTwoStack = createStackNavigator<TabTwoParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="TabTwoScreen"
        component={TabTwoScreen}
        options={{ headerTitle: 'Map View' }}
      />
    </TabTwoStack.Navigator>
  );
}