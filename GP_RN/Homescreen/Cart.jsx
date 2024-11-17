import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { MyContext } from "../MyProvider";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
function Cart({ navigation }) {
  const { sharedValue } = useContext(MyContext);
  const [Items, setItems] = useState([]);

  useEffect(() => {
    console.log("sharedValue:");
    console.log(sharedValue);

    if (!Array.isArray(sharedValue) && Object.keys(sharedValue).length === 0) {
      console.log("sharedValue is an empty object");
    } else {
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
    }
  }, []);

  const updateQuantity = (newQuantity, state) => {
    state === 1
      ? setItems((prevSakeItems) =>
          prevSakeItems.map((item) =>
            item.ID_Sale === newQuantity
              ? { ...item, Quantity: item.Quantity + 1 }
              : item
          )
        )
      : setItems((prevSakeItems) =>
          prevSakeItems.map((item) =>
            item.ID_Sale === newQuantity
              ? {
                  ...item,
                  Quantity:
                    item.Quantity > 1 ? item.Quantity - 1 : item.Quantity,
                }
              : item
          )
        );
  };

  const updateSize = (newSize, value) => {
    setItems((prevSakeItems) =>
      prevSakeItems.map((item) =>
        item.ID_Sale === newSize ? { ...item, Size: value } : item
      )
    );
  };
  return (
    <View style={styles.outercontenr}>
      <View style={styles.inercontenr}>
        <View style={styles.hader}>
          <TouchableOpacity
            style={styles.backicon}
            onPress={() => navigation.goBack()}
          >
            <IconIonicons name="chevron-back-outline" size={20} color="#fff" />
          </TouchableOpacity>
          <Text style={styles.texthader}>My Bag</Text>
        </View>
        <View style={styles.iteam}>
          <ScrollView>
            {Items && Items.length > 0 ? (
              Items.map((item, index) => (
                <View key={index} style={styles.iteamselect}>
                  <View style={styles.infoiteam}>
                    <Text style={{ fontSize: 20 }}> {item.Salee_Name}</Text>
                    <Text> ${item.Price}</Text>
                    <View style={styles.QuantitySize}>
                      <View style={styles.Quantitystyle}>
                        <IconIonicons
                          name="add-circle-outline"
                          size={20}
                          color="#fff"
                          style={styles.addButton}
                          onPress={() => updateQuantity(item.ID_Sale, 1)}
                        />
                        <Text> {item.Quantity}</Text>
                        <IconIonicons
                          name="remove-circle-outline"
                          size={20}
                          color="#fff"
                          style={styles.addButton}
                          onPress={() => updateQuantity(item.ID_Sale, 0)}
                        />
                      </View>
                      <Text> |</Text>

                      <View style={styles.container}>
                        <Text>{item.Size}</Text>
                        <Picker
                          selectedValue={item.Size}
                          onValueChange={(itemValue) =>
                            updateSize(item.ID_Sale, itemValue)
                          }
                          style={styles.picker}
                        >
                          <Picker.Item label="Large" value="Large" />
                          <Picker.Item label="Medium" value="Medium" />
                          <Picker.Item label="Small" value="Small" />
                        </Picker>
                      </View>
                    </View>
                  </View>
                  <View>
                    <Image
                      source={{
                        uri: "https://p7.hiclipart.com/preview/548/366/440/dietary-supplement-whey-protein-isolate-optimum-nutrition-gold-standard-100-whey-protein-thumbnail.jpg",
                      }}
                      style={styles.image}
                    />
                  </View>
                </View>
              ))
            ) : (
              <Text>No items in the cart</Text>
            )}
          </ScrollView>
        </View>
        <View style={styles.submintbuttoncontener}>
          <TouchableOpacity
            style={styles.submintbutton}
            onPress={() => navigation.goBack()}
          >
            <Text style={{ color: "#fff", fontWeight: "bold", fontSize: 18 }}>
              Checkout
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outercontenr: {
    backgroundColor: "#fdfff2",
    height: "100%",
  },
  inercontenr: {
    paddingTop: 50,
    padding: 10,
    gap: 10,
  },
  hader: {
    flexDirection: "row",
    height: "7%",
  },
  texthader: {
    fontSize: 30,
    fontFamily: "Verdana",
  },
  iteamselect: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#fff",
    height: 100,
    marginBottom: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 2,
    padding: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  backicon: {
    width: 35,
    height: 35,
    backgroundColor: "#b2f200",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 5,
    marginRight: 20,
  },
  submintbutton: {
    width: 200,
    height: 50,
    backgroundColor: "#b2f200",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  submintbuttoncontener: {
    position: "absolute",
    bottom: 10,
    left: 0,
    right: 0,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 50,
    elevation: 2,
  },
  iteam: {
    height: "90%",
    width: "100%",
  },
  image: {
    width: 100,
    height: 80,
    resizeMode: "cover",
  },
  QuantitySize: {
    flexDirection: "row",
    alignItems: "center",
    gap: 15,
    marginTop: -10,
  },
  addButton: {
    fontWeight: "bold",
    backgroundColor: "#b2f200",
    borderRadius: 10,
  },
  Quantitystyle: {
    flexDirection: "row",
    gap: 10,
    alignItems: "center",
  },
  infoiteam: {
    width: "60%",
    gap: 3,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "35%",
  },
  picker: {
    width: 40,
    height: 30,
    borderWidth: 1,
    borderColor: "#ddd",
  },
});

export default Cart;
