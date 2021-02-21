import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

interface Props {
  cartLength: number;
};

/**
 * Displays button that navigates to the serving tray
 * @param props {object} contains cart length
 */
export default function CheckoutButton(props: Props) {
    const navigation = useNavigation()
    const { cartLength } = props
    return(
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
          {`Go to checkout - ${cartLength} item${cartLength > 1 ? "s" : ""}`}
        </MaterialCommunityIcons.Button>
    )
}
