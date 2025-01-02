import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import Seaction from "./Seaction.jsx";
import { useNavigation } from "@react-navigation/native";
function Shop() {
  const [text, onChangeText] = React.useState("");
  const [selectedCategory, setSelectedCategory] = React.useState("Protein");
  const [selectedanme, setSelectedname] = React.useState(15);
  const [shouldFind, setShouldFind] = React.useState(1);
  const [sherchtext, setsherchtext] = React.useState("");
  const navigation = useNavigation();
  const [categories, setCategories] = useState([
    "Protein",
    "Pre workout",
    "Vitamins",
    "Equipment",
    "Protein bar",
  ]);
  _handleSubmitEditing = (text) => {
    setSelectedname(text.charAt(0).toUpperCase() + text.slice(1));
    setShouldFind(0);
  };

  return (
    <View style={styles.Container}>
      <View style={styles.inerContainer}>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.input}
            value={text}
            onChangeText={(text) => {
              onChangeText(text);
              setsherchtext(text);
            }}
            placeholder="Find shoes"
            placeholderTextColor="#999"
            onSubmitEditing={() => this._handleSubmitEditing(sherchtext)}
          />
          <View style={styles.iconContainer}>
            <IconIonicons
              name="search-outline"
              size={20}
              color="#fff"
              onPress={() => this._handleSubmitEditing(sherchtext)}
            />
          </View>
        </View>
        <View style={styles.categoriescart}>
          <Text style={styles.categories}>Categories</Text>
          <IconIonicons
            name="cart-outline"
            size={30}
            color="gray"
            style={styles.iconcart}
            onPress={() => navigation.navigate("Cart")}
          />
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoriesContainer}
        >
          {categories.map((category, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectedCategory(category);
                setShouldFind(1);
              }}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === category && styles.categoryTextSelected,
                ]}
              >
                {category}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <Seaction
          seactionname={selectedCategory}
          name={selectedanme}
          find={shouldFind}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Container: {
    backgroundColor: "#fdfff2",
    paddingHorizontal: 16,
    height: "100%",

    flexDirection: "column",
  },
  inerContainer: {
    marginTop: 50,
  },
  categoriescart: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  iconcart: {
    marginTop: 25,
  },

  input: {
    height: 40,
    width: "88%",
    paddingHorizontal: 10,
    color: "#333",
    marginLeft: 5,
  },
  searchContainer: {
    backgroundColor: "#fff",
    flexDirection: "row",
    borderRadius: 15,
    height: 45,
    marginVertical: 12,
    padding: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
    marginRight: 10,
    marginLeft: 10,
  },
  categories: {
    fontSize: 35,
    fontWeight: "bold",
    color: "#333",
    marginTop: 15,
    marginBottom: 20,
    marginLeft: 10,
  },
  iconContainer: {
    width: "10%",
    backgroundColor: "#b2f200",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  categoriesContainer: {
    flexDirection: "row",
    marginBottom: 16,
  },
  categoryText: {
    marginHorizontal: 10,
    fontSize: 16,
    color: "#999",
  },
  categoryTextSelected: {
    color: "#000",
    fontWeight: "bold",
  },
  productCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 10,
    marginBottom: 16,
    width: "47%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
    position: "relative",
  },
  productImage: {
    width: "100%",
    height: 100,
    borderRadius: 10,
    marginBottom: 10,
  },
  productPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#34a853",
  },
  productName: {
    fontSize: 14,
    color: "#333",
    marginBottom: 5,
  },
  heartIcon: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});

export default Shop;
