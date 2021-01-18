import * as React from 'react';
import { SafeAreaView, View, FlatList, StyleSheet, Text, StatusBar } from 'react-native';
import restaurants from '../mock/restaurant.js';

//import SearchableDropdown component
import SearchableDropdown from 'react-native-searchable-dropdown';

// this is test data. it will soon be hooked up to the resturant
// menu data
const items = [
    //name key is must.It is to show the text in front
    { id: 1, name: 'chicken tenders' },
    { id: 2, name: 'gyro' },
    { id: 3, name: 'sushi' },
    { id: 4, name: 'cheese burger' },
    { id: 5, name: 'falafel' },
    { id: 6, name: 'soup dumplings' },
    { id: 7, name: 'reuben' },
    { id: 8, name: 'mac and cheese' },
    { id: 9, name: 'shepherds pie' },
    { id: 10, name: 'tom yum soup' },
  ];



const SearchBar = () => {
    return (
            <SearchableDropdown
            onTextChange={(text) => console.log(text)}
            //On text change listener on the searchable input
            // TODO: change so that on click navigates to menu page
            // or item
            onItemSelect={(item) => alert(JSON.stringify(item))}

            textInputStyle={{
                //inserted text style
                padding: 12,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#FAF7F6',
            }}
            itemStyle={{
                //single dropdown item style
                padding: 10,
                marginTop: 2,
                backgroundColor: '#FAF9F8',
                borderColor: '#bbb',
                borderWidth: 1,
            }}
            itemTextStyle={{
                //text style of a single dropdown item
                color: '#222',
            }}
            itemsContainerStyle={{
                //items container style you can pass maxHeight
                //to restrict the items dropdown height
                maxHeight: '60%',
            }}

              items={items}
              //mapping of item array
              
              placeholder="Search menu items..."
              //place holder for the search input
              // TODO: cannot see placeholder text on dark mode
              // on ios
              resetValue={false}
              //reset textInput Value with true and false state
              underlineColorAndroid="transparent"
              //To remove the underline from the android input
            />
      );
    };

export default SearchBar;