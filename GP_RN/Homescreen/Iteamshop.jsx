import React, { useState, useContext, useEffect } from "react";
import { View, StyleSheet, Text, Image, TouchableOpacity } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { MyContext } from "../MyProvider";

function Iteamshop({ route, navigation }) {
  const {
    ID_Sale,
    Salee_Name,
    Price,
    Quantity,
    Description,
    Product_Name,
    Size,
    Img,
  } = route.params;
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
        Size: Size,
        Description: Description,
        Product_Name: Product_Name,
      },
    ];

    setSharedValue(newItem);

    alert("Item added to the bag!");
  };

  const addQuantityValue = () => {
    if (QuantityValue + 1 > Quantity) {
      alert(`Available in stock only ${Quantity}`);
    } else {
      setQuantityValue(QuantityValue + 1);
    }
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
          <Text style={styles.nameofiteam}>{Product_Name}</Text>
        </View>
        <View style={styles.iteamimg}>
          <Image
            source={{
              uri: `${Img}`,
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
            <Text style={styles.selection}>{Size}</Text>
          </View>
          <View>
            <View style={styles.Quantitystyle}>
              <IconIonicons
                name="add-circle-outline"
                size={30}
                color="#fff"
                style={styles.addButton}
                onPress={() => addQuantityValue()}
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
            <Text style={styles.leftQuantity}>Only left {Quantity}!</Text>
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

    gap: 10,
    width: "50%",
  },
  leftQuantity: {
    fontSize: 13,
    color: "#DC5664",
    marginLeft: 20,
    marginBottom: -20,
  },
  addButton: {
    fontWeight: "bold",
    backgroundColor: "#b2f200",
    borderRadius: 10,
  },
});

export default Iteamshop;
