import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import URL from "../enum";
import axios from "axios";
const Seaction = ({ seactionname, name, find }) => {
  const navigation = useNavigation();
  const [sakeItems, setSakeItems] = useState([]);
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axios.get(`${URL}/getAllSales`);
        setSakeItems(response.data.sales);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchSales();
  }, []);

  if (find == 1) {
    const filteredItems = sakeItems.filter(
      (item) => item.Salee_Name === seactionname
    );

    let elements = [];
    for (let j = 0; j < filteredItems.length; j += 2) {
      const batch = filteredItems.slice(j, j + 2);

      elements.push(
        <View key={j} style={styles.rowContainer}>
          {batch.map((category) => (
            <TouchableOpacity
              key={category.ID_Sale}
              style={styles.iteamcontainer}
              onPress={() =>
                navigation.navigate("Iteamshop", {
                  ID_Sale: category.ID_Sale,
                  Salee_Name: category.Salee_Name,
                  Price: category.Price,
                  Quantity: category.Quantity,
                  Description: category.Description,
                  Product_Name: category.Product_Name,
                  Size: category.Size,
                  Img: category.Img,
                })
              }
            >
              <View style={styles.tophadercard}>
                <Text style={styles.price}>
                  <Text style={{ color: "#b2f200", fontWeight: "bold" }}>
                    $
                  </Text>
                  {category.Price}
                </Text>
                <Text style={styles.samltitle}>{category.Product_Name}</Text>
              </View>
              <View style={styles.imgcontner}>
                <Image
                  source={{
                    uri: category.Img,
                  }}
                  style={styles.image}
                />
              </View>
              <Text style={styles.title}>{category.Salee_Name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return elements.length > 0 ? (
      elements
    ) : (
      <Image
        source={require("../img/outofstock.png")}
        style={styles.imgoutofstock}
      />
    );
  } else {
    const filteredItems = sakeItems.filter((item) => item.Salee_Name === name);

    let elements = [];
    for (let i = 0; i < filteredItems.length; i += 2) {
      const batch = filteredItems.slice(i, i + 2);

      elements.push(
        <View key={i} style={styles.rowContainer}>
          {batch.map((category) => (
            <TouchableOpacity
              key={category.ID_Sale}
              style={styles.iteamcontainer}
              onPress={() =>
                navigation.navigate("Iteamshop", {
                  ID_Sale: category.ID_Sale,
                  Salee_Name: category.Salee_Name,
                  Price: category.Price,
                  Quantity: category.Quantity,
                  Description: category.Description,
                  Product_Name: category.Product_Name,
                  Size: category.Size,
                  Img: category.Img,
                })
              }
            >
              <View style={styles.tophadercard}>
                <Text style={styles.price}>
                  <Text style={{ color: "#b2f200", fontWeight: "bold" }}>
                    $
                  </Text>
                  {category.Price}
                </Text>
                <Text style={styles.samltitle}>{category.Product_Name}</Text>
              </View>
              <View style={styles.imgcontner}>
                <Image
                  source={{
                    uri: "https://p7.hiclipart.com/preview/548/366/440/dietary-supplement-whey-protein-isolate-optimum-nutrition-gold-standard-100-whey-protein-thumbnail.jpg",
                  }}
                  style={styles.image}
                />
              </View>
              <Text style={styles.title}>{category.Salee_Name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }

    return elements.length > 0 ? (
      elements
    ) : (
      <Image
        source={require("../img/outofstock.png")}
        style={styles.imgoutofstock}
      />
    );
  }
};

const styles = StyleSheet.create({
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
    width: "100%",
  },
  tophadercard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  imgcontner: {
    width: "100%",
    alignItems: "center",
    padding: 5,
  },
  title: {
    marginTop: 5,
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
  samltitle: {
    marginTop: 5,
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },
  iteamcontainer: {
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    width: "45%",
    height: "95%",
    padding: 5,
  },
  image: {
    width: 100,
    height: 100,
    resizeMode: "cover",
  },
  price: {
    fontWeight: "bold",
    fontSize: 15,
  },
  imgoutofstock: {
    width: "100%",
    height: "50%",
    resizeMode: "contain",
    opacity: 0.5,
  },
});

export default Seaction;
