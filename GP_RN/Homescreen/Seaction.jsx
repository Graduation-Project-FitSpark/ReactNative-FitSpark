import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
const Seaction = ({ seactionname, price, find }) => {
  const navigation = useNavigation();
  const [sakeItems, setSakeItems] = useState([
    //هلا هون بتمسح كل اشي
    {
      ID_Sale: 1,
      Salee_Name: "Protein",
      Price: 22,
      Quantity: 10,
      Description: "A traditional Japanese rice wine with fruity flavors.",
    },
    {
      ID_Sale: 2,
      Salee_Name: "Pre-Workout",
      Price: 22,
      Quantity: 5,
      Description: "A smooth and rich sake, perfect for pairing with seafood.",
    },
    {
      ID_Sale: 3,
      Salee_Name: "Vitamins&Wellness",
      Price: 18,
      Quantity: 8,
      Description: "A premium sake with floral aroma and a crisp finish.",
    },
    {
      ID_Sale: 4,
      Salee_Name: "Protein",
      Price: 25,
      Quantity: 3,
      Description: "Aged sake with a complex flavor profile and a golden hue.",
    },
  ]);
  useEffect(() => {
    //هون بتاخد كل الموجود في تيبل الشوب  وبتعملها ست
    const newsakeItems = [
      ...sakeItems,
      {
        ID_Sale: 5,
        Salee_Name: "Pre-Workout",
        Price: 100,
        Quantity: 5,
        Description: "mahmoud is better then ahmad , ahmad is hmar ",
      },
    ];

    setSakeItems(newsakeItems);
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
                })
              }
            >
              <View style={styles.tophadercard}>
                <Text style={styles.price}>
                  {" "}
                  <Text style={{ color: "#b2f200", fontWeight: "bold" }}>
                    $
                  </Text>
                  {category.Price}
                </Text>
                <IconIonicons name="heart-outline" size={24} color="gray" />
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
      <Text>No sake found with the name {seactionname}</Text>
    );
  } else {
    const filteredItems = sakeItems.filter((item) => item.Price === price);

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
                <IconIonicons name="heart-outline" size={24} color="gray" />
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
      <Text>No sake found with the name {seactionname}</Text>
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
});

export default Seaction;
