import React from 'react';
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { Ionicons } from '@expo/vector-icons';

export default function TitleBarComponent({title, numItems, navigator}: {title: String, numItems: Number, navigator: any}) {
    return (
        <View style={styleSheet.inline}>
            <Text style={styleSheet.title}>
                {title}
            </Text>
            <Ionicons.Button
                name="restaurant"
                size={24} 
                color="white"
                style={styleSheet.button}
                accessibilityLabel="Add item to tray"                
                onPress={() => {
                    navigator.navigate("ServingTray");
                }}>
                    {`${numItems} in Tray`}
            </Ionicons.Button>
        </View>
    );
}

let styleSheet: StyleSheet.NamedStyles<any> = {
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        maxWidth: 170
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    name: {
        fontSize: 32,
    },
    inline: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    button: {
        backgroundColor: "#a28",
        justifyContent: 'flex-end'
    }
}

const styles = StyleSheet.create(styleSheet);