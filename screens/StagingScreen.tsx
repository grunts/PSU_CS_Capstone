import * as React from "react";
import { StyleSheet } from "react-native";
import { Text, View } from "../components/Themed";
import { MenuItem } from '../types';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Image } from 'react-native'
import { Card, Input } from 'react-native-elements'
import InputSpinner from "react-native-input-spinner";
import { TextInput } from 'react-native';

import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { addMenuItem, removeMenuItem } from "../store/actions/ServingTray.js";
import { useNavigation } from '@react-navigation/native';

export default function StagingScreen({route}) {
    const [quantity, setQuantity] = React.useState(1);
    const myMenuItem = route.params.MenuItem;

    const navigation = useNavigation();
    const tray = useSelector((state) => state.servingTray);
    const dispatch = useDispatch();

    const {
      name,
      image,
      longDesc,
      shortDesc,
      ABV,
      Allergens,
      price,
      mandatoryMods,
    } = myMenuItem;

    const [comments, setComments] = React.useState("");
    let updateComments = (comments) => {
      setComments(comments);
      
    };

    return (

        <View style={styles.container}>
          <Card containerStyle={{width: '95%'}}>
            <Card.Image source={{uri: image}}>
            
            </Card.Image>
            <Card.Title>{name}                       ${Number(price).toFixed(2)}</Card.Title>
            {/* Need to find a way to display the two text items properly instead of having spaces in between them */}
            <Text style={{marginBottom: 10}}>
                {longDesc}
            </Text>

          </Card>
          <Card containerStyle={{height: '15%', paddingBottom: '-10%'}}>
            {/* The display for the input spinner is behaving strangely */}
          <InputSpinner
            style = {styles.spinner}
            width = {150}
            max={10}
            min={1}
            step={1}
            colorMax={"#f04048"}
            colorMin={"#f04048"}
            colorLeft={"#a28"}
            colorRight={"#a28"}
            colorPress={"#dc4ecf"}
            value={quantity}
            onChange={(num:number) => {
              setQuantity(num);
            }}
          />
          </Card>
          <Card containerStyle={{width: '95%'}}>
            <TextInput
              placeholder='Notes for the chef...'
              onChangeText={updateComments}
            />
          </Card>
          
          <Card containerStyle={{width: '95%'}}>
            <MaterialCommunityIcons.Button 
              onPress={() =>   {
                for(let i = 0; i < quantity; ++i){
                  myMenuItem["customComments"] = comments;
                  console.log(myMenuItem)
                  dispatch({ type: "ADD_ITEM", payload: myMenuItem })
                }
                navigation.goBack()}
              }

              name="tray-plus"
              size={28} 
              color="white"
              backgroundColor="#a28"
              accessibilityLabel="Confirm add item">
                {`Confirm order                                 $${Number(quantity * price).toFixed(2)}`}
                {/* Need to find a way to display the two text items properly instead of having spaces in between them */}
            </MaterialCommunityIcons.Button>
          </Card>
        </View>    
    )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: '70%',
    justifyContent: "center",
    alignItems: 'center',

  },
  bottomcontainer: {
    width: '105%',
    height: 100,
    justifyContent: 'center',

    position: 'absolute',
    bottom: 0, 
  },
  buttonContainer: {

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
  spinner: {
    // margin: 15,
    padding: 0,
  }
});