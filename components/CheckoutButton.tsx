import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

/** Contains cart length */
interface Props {
  /** Length of cart array */
  cartLength: number;
};

/**
 * Displays button that navigates to the serving tray
 * @param {object} props contains cart length
 * @param {number} props.cartLength length of cart array
 */
export default function CheckoutButton(props: Props) {
    const navigation = useNavigation()
    /** Length of cart array */
    const length = props.cartLength
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
          {`Go to checkout - ${length} item${length > 1 ? "s" : ""}`}
        </MaterialCommunityIcons.Button>
    )
}
