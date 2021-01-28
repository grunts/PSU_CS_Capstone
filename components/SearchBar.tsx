// import React in our code
import React, {useState, useEffect} from 'react';

// import all the components we are going to use
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  View,
  FlatList
} from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SearchBar } from "react-native-elements";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Colors } from 'react-native/Libraries/NewAppScreen';

// import restaurants from '../mock/restaurant.js';

// this is test data. it will soon be hooked up to the resturant
// menu data
// const items = [
//     //name key is must.It is to show the text in front
//     { id: 1, name: 'chicken tenders' },
//     { id: 2, name: 'gyro' },
//     { id: 3, name: 'sushi' },
//     { id: 4, name: 'cheese burger' },
//     { id: 5, name: 'falafel' },
//     { id: 6, name: 'soup dumplings' },
//     { id: 7, name: 'reuben' },
//     { id: 8, name: 'mac and cheese' },
//     { id: 9, name: 'shepherds pie' },
//     { id: 10, name: 'tom yum soup' },
//   ];


const DropdownSearch = (props) => {
    const [search, setSearch] = useState('');
    
    const [masterDataSource, setMasterDataSource] = useState(props.dataToBeSearched);
    const [filteredDataSource, setFilteredDataSource] = useState(null);

    let updateSearch = (search) => {
      setSearch(search)
      setFilteredDataSource(props.dataToBeSearched.filter((item) => item[props.fieldToSearch].toLowerCase().includes(search.toLowerCase())))
    }

    const { colors } = useTheme();
    console.log("color is" + colors.text)

    // const renderItem = ({ item }) => {
    //     return (
    //         <TouchableOpacity
    //           style={{
    //             margin: 15,
    //             borderWidth: StyleSheet.hairlineWidth,
    //             padding: 10,
    //             borderRadius: 10,
    //             borderColor: colors.text,
    //           }}
    //           onPress={() => getItem(item)}>
    //           <Text style={{ color: colors.text, fontWeight: '700' }}>
    //             {item.name}
    //           </Text>
    //         </TouchableOpacity>
    //       );
    //     };
      
        const getItem = (item) => {
          alert(item.extra);
        };

        return (
            <>
            {/* <View style={{ flex: 1, backgroundColor: 'white' }}> */}
            {/* <View
                style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                padding: 30,
                }}>
                <TextInput
                style={[
                    {
                    flex: 1,
                    backgroundColor: '#fff',
                    borderRadius: 10,
                    shadowColor: '#888888',
                    shadowOffset: { width: 0, height: 1 },
                    shadowOpacity: 0.8,
                    shadowRadius: 2,
                    elevation: 3,
                    padding: 10,
                    },
                ]}
                placeholder="Search..."
                placeholderTextColor="#000"
                onChangeText={(text) => setSearch(text)}
                value={search}
                />
            </View> */}
            <SearchBar 
              placeholder = "Search..."
              value={search}
              onChangeText={updateSearch}
               />
            {/* <View> */}
                <FlatList
                data={search.length > 2 ? filteredDataSource : null}
                keyExtractor={(item, index) => index.toString()}
                initialNumToRender={1}
                showsVerticalScrollIndicator={false}
                renderItem={props.renderFunction}
                // style={{ height: '30%' }}
                />
            {/* </View> */}
            {/* </View> */}
            {
              search.length > 2 && (filteredDataSource && filteredDataSource.length === 0) ?
              <View style = {{height: 60, justifyContent: 'center', alignItems: 'center', margin: 5, paddingLeft: 5, paddingRight: 5}}>
                <FontAwesome5 name="meh-blank" size={24} color={colors.text} />
                <Text style={{color: colors.text, textAlign: 'center', fontWeight: '500', paddingTop: 2, paddingBottom: 2}}>Oops! Sorry, we didn't find anything that matched your search.</Text>
                </View> :
              null
            }
        </> 
        );
}

export default DropdownSearch;