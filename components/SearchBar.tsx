// import React in our code
import React, { useState } from "react";

// import all the components we are going to use
import { Text, View, FlatList } from "react-native";
import { useTheme } from "@react-navigation/native";
import { SearchBar } from "react-native-elements";
import { FontAwesome5 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";

const DropdownSearch = (props) => {
  const [search, setSearch] = useState("");

  const [filteredDataSource, setFilteredDataSource] = useState([]);

  let updateSearch = (search) => {
    setSearch(search);
    setFilteredDataSource(
      props.dataToBeSearched.filter((item) =>
        item[props.fieldToSearch].toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  const { colors, dark } = useTheme();
  return (
    <>
      <SearchBar
        placeholder="Search..."
        value={search}
        onChangeText={updateSearch}
        lightTheme={dark ? false : true}
        inputStyle={!dark ? { color: "black" } : {}}
      />
      <FlatList
        data={search.length > 2 ? filteredDataSource : null}
        keyExtractor={(item, index) => index.toString()}
        initialNumToRender={1}
        showsVerticalScrollIndicator={false}
        renderItem={props.renderFunction}
        contentContainerStyle={
          search.length > 2 && filteredDataSource.length
            ? { marginBottom: 50 * filteredDataSource.length }
            : {}
        }
      />
      {search.length > 2 && filteredDataSource.length === 0 ? (
        <View
          style={{
            height: 60,
            justifyContent: "center",
            alignItems: "center",
            margin: 5,
            paddingLeft: 5,
            paddingRight: 5,
          }}
        >
          <FontAwesome5 name="meh-blank" size={24} color={colors.text} />
          <Text
            style={{
              color: colors.text,
              textAlign: "center",
              fontWeight: "500",
              paddingTop: 2,
              paddingBottom: 2,
            }}
          >
            Oops! Sorry, we didn't find anything that matched your search.
          </Text>
        </View>
      ) : null}

      {search.length > 2 && filteredDataSource.length ? (
        <View
          style={{
            height: 30,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: `${colors.background}`,
          }}
        >
          <AntDesign name="find" size={24} color={colors.text} />
        </View>
      ) : null}
    </>
  );
};

export default DropdownSearch;
