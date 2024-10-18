import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { MyContext } from "../MyProvider";
import IconIonicons from "react-native-vector-icons/Ionicons";

function Cart({ navigation }) {
  const { sharedValue } = useContext(MyContext);
  const [Items, setItems] = useState([]);

  useEffect(() => {
    console.log("sharedValue:");
    console.log(sharedValue);

    const newItem = Array.isArray(sharedValue)
      ? [...sharedValue]
      : [
          {
            ID_Sale: sharedValue.id,
            Salee_Name: sharedValue.name,
            Price: sharedValue.price,
            Quantity: sharedValue.quantity,
            Size: sharedValue.size,
            Description: sharedValue.description,
          },
        ];

    console.log("Items:");
    console.log(newItem);

    setItems(newItem);
  }, []);

  return (
    <View>
      <TouchableOpacity
        style={styles.backicon}
        onPress={() => navigation.goBack()}
      >
        <IconIonicons name="chevron-back-outline" size={20} color="white" />
      </TouchableOpacity>
      <ScrollView>
        {Items && Items.length > 0 ? (
          Items.map((item, index) => (
            <View key={index}>
              <Text>id: {item.ID_Sale}</Text>
              <Text>Item: {item.Salee_Name}</Text>
              <Text>Price: ${item.Price}</Text>
              <Text>Quantity: {item.Quantity}</Text>
              <Text>Size: {item.Size}</Text>
              <Text>Description: {item.Description}</Text>
            </View>
          ))
        ) : (
          <Text>No items in the cart</Text>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  backicon: {
    padding: 100,
  },
});

export default Cart;
