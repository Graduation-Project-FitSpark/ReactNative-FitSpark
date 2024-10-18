import React, { useState, useContext } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { MyContext } from "../MyProvider";

function Iteamshop({ route, navigation }) {
  const { ID_Sale, Salee_Name, Price, Quantity, Description } = route.params;
  const [selectedValue, setSelectedValue] = useState("Small");
  const [QuantityValue, setQuantityValue] = useState(1);

  const { sharedValue, setSharedValue } = useContext(MyContext);
  const addToBag = () => {
    const newItem = [
      ...(Array.isArray(sharedValue) ? sharedValue : []),
      {
        ID_Sale: ID_Sale,
        Salee_Name: Salee_Name,
        Price: Price,
        Quantity: QuantityValue,
        Size: selectedValue,
        Description: Description,
      },
    ];

    setSharedValue(newItem);

    alert("Item added to the bag!");
  };

  return (
    <View style={styles.cotener}>
      <View style={styles.hader}>
        <TouchableOpacity
          style={styles.backicon}
          onPress={() => navigation.goBack()}
        >
          <IconIonicons name="chevron-back-outline" size={20} color="white" />
        </TouchableOpacity>
        <View>
          <Text style={styles.title}>{Salee_Name}</Text>
        </View>
        <IconIonicons
          name="cart-outline"
          size={30}
          color="gray"
          style={styles.iconcart}
          onPress={() => {
            navigation.navigate("Cart");
          }}
        />
      </View>

      <View style={styles.infosection}>
        <View>
          <Text style={styles.nameofiteam}>A premium sake with floral</Text>
        </View>
        <View style={styles.iteamimg}>
          <Image
            source={{
              uri: "https://p7.hiclipart.com/preview/548/366/440/dietary-supplement-whey-protein-isolate-optimum-nutrition-gold-standard-100-whey-protein-thumbnail.jpg",
            }}
            style={styles.image}
          />
        </View>
      </View>

      <View style={styles.detailsSection}>
        <Text style={styles.descriptionTitle}>Description</Text>
        <Text style={styles.description}>{Description}</Text>

        <Text style={styles.retailPrice}>
          <IconIonicons
            name="chevron-forward-outline"
            size={16}
            color="#b2f200"
          />
          Retail Price <Text style={styles.priceValue}>${Price}</Text>
        </Text>
        <Text style={styles.resellPrice}>
          <IconIonicons
            name="chevron-forward-outline"
            size={16}
            color="#b2f200"
          />
          Est. Resell Price <Text style={styles.priceValue}>${Price - 10}</Text>
        </Text>

        <View style={styles.selectionSection}>
          <View style={styles.container}>
            <Text style={styles.selection}>Size: </Text>
            <Picker
              selectedValue={selectedValue}
              onValueChange={(itemValue) => setSelectedValue(itemValue)}
              style={styles.picker}
            >
              <Picker.Item label="Large" value="Large" />
              <Picker.Item label="Medium" value="Medium" />
              <Picker.Item label="Small" value="Small" />
            </Picker>
          </View>

          <View style={styles.Quantitystyle}>
            <IconIonicons
              name="add-circle-outline"
              size={30}
              color="#fff"
              style={styles.addButton}
              onPress={() => setQuantityValue(QuantityValue + 1)}
            />
            <Text style={styles.selection}> {QuantityValue}</Text>
            <IconIonicons
              name="remove-circle-outline"
              size={30}
              color="#fff"
              style={styles.addButton}
              onPress={() => {
                QuantityValue > 1 && setQuantityValue(QuantityValue - 1);
              }}
            />
          </View>
        </View>

        <TouchableOpacity style={styles.addToBagButton} onPress={addToBag}>
          <Text style={styles.buttonText}>Add To Bag</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cotener: {
    backgroundColor: "#fdfff2",
    height: "100%",
  },
  hader: {
    marginTop: 50,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 25,
  },
  backicon: {
    width: 35,
    height: 35,
    backgroundColor: "#b2f200",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  iconcart: {
    marginTop: 5,
  },
  infosection: {
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontFamily: "Verdana",
    marginTop: 5,
  },
  nameofiteam: {
    fontSize: 25,
  },
  iteamimg: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  image: {
    width: 150,
    height: 150,
    resizeMode: "cover",
  },
  detailsSection: {
    backgroundColor: "#fff",
    borderRadius: 30,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 20,
    height: "100%",
    marginTop: 20,
  },
  descriptionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 20,
    height: 60,
  },
  retailPrice: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  resellPrice: {
    fontSize: 16,
    color: "#333",
    marginBottom: 20,
  },
  priceValue: {
    fontWeight: "bold",
    color: "#000",
  },
  addToBagButton: {
    backgroundColor: "#b2f200",
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  selectionSection: {
    backgroundColor: "#fdfff2",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 20,
    borderRadius: 30,
    paddingHorizontal: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 1,
    height: 80,
    alignItems: "center",
    width: "100%",
  },
  selection: {
    fontSize: 20,
    color: "#000",
    marginRight: 5,
  },
  container: {
    flexDirection: "row",
    alignItems: "center",
    width: "50%",
  },
  picker: {
    height: 40,
    width: 30,
  },
  Quantitystyle: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
    width: "50%",
  },
  addButton: {
    fontWeight: "bold",
    backgroundColor: "#b2f200",
    borderRadius: 10,
  },
});

export default Iteamshop;
