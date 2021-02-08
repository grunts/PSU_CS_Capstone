import React from 'react';
import { StyleSheet } from "react-native";
import { Text, View } from "./Themed";
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TitleBarComponent({title}: {title: String}) {
    return (
        <View style={styleSheet.inline}>
            <Text>
                {title}
            </Text>
            <MaterialCommunityIcons.Button
                name="tray-plus"
                size={24} 
                color="white"
                style={styleSheet.button}
                accessibilityLabel="Add item to tray">
                    Serving Tray
            </MaterialCommunityIcons.Button>
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