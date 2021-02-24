import React from 'react';
import { StyleSheet } from "react-native";
import { Text } from "../components/Themed";

export default function MenuTitleComponent({title}: {title: String}) {
    return (
        <Text style={[styles.title, styles.container]}>{title}</Text>
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
    }    
}

const styles = StyleSheet.create(styleSheet);