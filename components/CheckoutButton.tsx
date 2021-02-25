import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function CheckoutButton(props) {
  const navigation = useNavigation();
  const length = props.cartLength;
  return (
    <MaterialCommunityIcons.Button
      onPress={() => {
        navigation.navigate("ServingTray");
      }}
      name="food-fork-drink"
      size={28}
      color="white"
      backgroundColor="#a28"
      accessibilityLabel="Confirm add item"
    >
      {`Go to Serving Tray - ${length} item${length > 1 ? "s" : ""}`}
    </MaterialCommunityIcons.Button>
  );
}
