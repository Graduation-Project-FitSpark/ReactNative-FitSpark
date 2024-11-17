import React, { useState } from "react";
import {
  ScrollView,
  TouchableOpacity,
  Image,
  Text,
  StyleSheet,
  View,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
export default function RecipeCard({ route }) {
  const navigation = useNavigation();
  const { id, name, details, img, min, cal } = route.params;

  const [ingredients, setingredients] = useState([
    // هلا هاي عشان شو مكونات هاي الوجبة الي اختارها اليوزر صح انها مش موجودة بال داتا بيس بس لم توصلها راجعني
    {
      id: "1",
      name: "Bun",
      image: "https://cdn-icons-png.flaticon.com/512/3075/3075977.png",
    },
    {
      id: "2",
      name: "Lettuce",
      image: "https://cdn-icons-png.flaticon.com/512/1515/1515746.png",
    },
    {
      id: "3",
      name: "Tomato",
      image: "https://cdn-icons-png.flaticon.com/512/1046/1046750.png",
    },
    {
      id: "4",
      name: "Cheese",
      image: "https://cdn-icons-png.flaticon.com/512/1998/1998670.png",
    },
    {
      id: "5",
      name: "Beef Patty",
      image: "https://cdn-icons-png.flaticon.com/512/3075/3075978.png",
    },
    {
      id: "6",
      name: "Onion",
      image: "https://cdn-icons-png.flaticon.com/512/4156/4156144.png",
    },
    {
      id: "7",
      name: "Pickles",
      image: "https://cdn-icons-png.flaticon.com/512/3061/3061345.png",
    },
    {
      id: "8",
      name: "Ketchup",
      image: "https://cdn-icons-png.flaticon.com/512/3050/3050227.png",
    },
    {
      id: "9",
      name: "Mustard",
      image: "https://cdn-icons-png.flaticon.com/512/3050/3050254.png",
    },
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.prfofood}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <IconIonicons name="chevron-back-outline" size={30} color="#fff" />
        </TouchableOpacity>
        <View style={styles.imgcontainer}>
          <Image
            source={{
              uri: "https://png.pngtree.com/png-clipart/20221001/ourmid/pngtree-fast-food-big-ham-burger-png-image_6244235.png",
            }}
            style={styles.image}
          />
        </View>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.subtitle}>by Harrison</Text>
        <Text style={styles.description}>{details}</Text>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <FontAwesome name="clock-o" size={18} color="#333" />
            <Text style={styles.statText}>{min} Min</Text>
          </View>
          <View style={styles.statItem}>
            <FontAwesome name="fire" size={18} color="#333" />
            <Text style={styles.statText}>{cal} Cal</Text>
          </View>
          <View style={styles.statItem}>
            <FontAwesome name="list-ul" size={18} color="#333" />
            <Text style={styles.statText}>05 Ing</Text>
          </View>
        </View>
        <View style={styles.ingredients}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          >
            {ingredients.map((item) => (
              <View key={item.id} style={styles.ingredientContainer}>
                <Image source={{ uri: item.image }} style={styles.image2} />
                <Text style={styles.ingredientText}>{item.name}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFA07A",
    height: "100%",

    alignItems: "center",
  },
  image: {
    width: 350,
    height: 350,
  },
  prfofood: {
    marginTop: 20,
    width: "100%",
    padding: 10,
  },
  imgcontainer: {
    width: "100%",
    alignItems: "center",
  },
  infoContainer: {
    padding: 15,
    width: "100%",
    height: "100%",
    backgroundColor: "#fff",
    borderTopRightRadius: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subtitle: {
    fontSize: 16,
    color: "gray",
    marginBottom: 10,
    marginTop: 5,
  },
  description: {
    fontSize: 14,
    color: "#555",
    marginBottom: 20,
    height: 70,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
    marginTop: 20,
  },
  statItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  statText: {
    marginLeft: 5,
    fontSize: 16,
    color: "#333",
  },
  likes: {
    fontSize: 16,
    color: "gray",
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#FF6347",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },

  ingredientContainer: {
    alignItems: "center",
    marginHorizontal: 10,
  },
  image2: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 5,
  },
  ingredientText: {
    fontSize: 16,
  },
  ingredients: {
    width: "100%",
    marginTop: 20,
  },
});
