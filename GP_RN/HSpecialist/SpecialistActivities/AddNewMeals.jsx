import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Button,
} from "react-native";
import URL from "../../enum";
import { Alert } from "react-native";
const apiKey = "d8c55e3ae4fa4d45ba3f548c64c7d71b";

const AddNewMeals = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [mealResults, setMealResults] = useState([]);
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [favorites, setFavorites] = useState([]);

  const fetchMeals = async () => {
    console.log(searchTerm);
    if (searchTerm.trim() === "") return;
    const response = await fetch(
      `https://api.spoonacular.com/recipes/complexSearch?query=${searchTerm}&apiKey=${apiKey}`
    );
    const data = await response.json();
    console.log(mealResults);
    setMealResults(data.results);
  };

  const fetchIngredientsDetails = async (mealId) => {
    try {
      const response = await fetch(
        `https://api.spoonacular.com/recipes/${mealId}/information?includeNutrition=false&apiKey=${apiKey}`
      );
      const data = await response.json();
      const calories = data.nutrition
        ? data.nutrition.calories
        : "Not available";
      const cookingMinutes = Math.floor(Math.random() * (40 - 20 + 1)) + 20;
      const spoonacularScore = Math.floor(Math.random() * (60 - 30 + 1)) + 30;

      console.log("Food Details:");
      console.log("ID_Food:", mealId);
      console.log("Food_Name:", data.title);
      console.log(
        "Details:",
        "This is a delicious meal. Perfect for any occasion."
      );
      console.log("Img:", data.image);
      console.log("min:", cookingMinutes);
      console.log("cal:", spoonacularScore);

      if (data.extendedIngredients && Array.isArray(data.extendedIngredients)) {
        console.log(
          "ingredient_idsl:",
          data.extendedIngredients.map((ingredient) => ingredient.id).join(",")
        );

        const ingredientsList = data.extendedIngredients.map((ingredient) => ({
          ID: ingredient.id,
          name: ingredient.name,
          img: ingredient.image
            ? `https://spoonacular.com/cdn/ingredients_100x100/${ingredient.image}`
            : "https://via.placeholder.com/100?text=No+Image",
        }));

        setIngredients(ingredientsList);
        console.log("Ingredients List:", ingredientsList);
      } else {
        setIngredients([]);
        console.log("No ingredients available.");
      }
    } catch (error) {
      console.error("Error fetching ingredient details:", error);
    }
  };

  const handleMealClick = async (meal) => {
    setSelectedMeal(meal);
    await fetchIngredientsDetails(meal.id);
  };

  const renderIngredients = () => {
    if (!ingredients.length) {
      return <Text>No ingredients available for this meal.</Text>;
    }

    return (
      <FlatList
        data={ingredients}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.ingredientItem}>
            {item.img ? (
              <Image
                source={{ uri: item.img }}
                style={styles.ingredientImage}
              />
            ) : (
              <Text>No Image</Text>
            )}
            <Text style={styles.ingredientName}>{item.name}</Text>
          </View>
        )}
        horizontal={true}
        contentContainerStyle={styles.ingredientsList}
      />
    );
  };

  const renderMealCard = ({ item }) => (
    <View style={styles.cardContainer}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleMealClick(item)}
      >
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.foodName}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.searchBar}
        placeholder="Search for meals"
        value={searchTerm}
        onChangeText={setSearchTerm}
        onSubmitEditing={fetchMeals}
      />
      <FlatList
        data={mealResults}
        keyExtractor={(item) => item.id}
        renderItem={renderMealCard}
        contentContainerStyle={styles.cardList}
      />

      {selectedMeal && (
        <Modal
          visible={!!selectedMeal}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setSelectedMeal(null)}
        >
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Image
                source={{ uri: selectedMeal.image }}
                style={styles.modalImage}
              />
              <Text style={styles.modalTitle}>{selectedMeal.title}</Text>
              <Text style={styles.ingredientsTitle}>Ingredients</Text>
              {renderIngredients()}

              <TouchableOpacity
                style={styles.addMealButton}
                onPress={() => {
                  if (selectedMeal) {
                    const foodDetails = {
                      ID_Food: selectedMeal.id,
                      Food_Name: selectedMeal.title,
                      Details:
                        "This is a delicious meal. Perfect for any occasion.",
                      Img: selectedMeal.image,
                      cal: Math.floor(Math.random() * (60 - 30 + 1)) + 130,
                      min: Math.floor(Math.random() * (40 - 20 + 1)) + 20,
                      ingredient_idsl: ingredients
                        ? ingredients.map((ingredient) => ingredient.ID)
                        : [],
                    };

                    console.log("Food Details:", foodDetails);
                    fetch(`${URL}/insertNewMeal`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                      },
                      body: JSON.stringify({ foodDetails }),
                    })
                      .then((response) => response.json())
                      .then((data) => {
                        console.log("Meal insert response:", data);
                      })
                      .catch((error) => {
                        console.error("Error inserting meal:", error);
                      });

                    if (ingredients) {
                      const ingredientsDetails = ingredients.map(
                        (ingredient) => ({
                          ID: ingredient.ID,
                          name: ingredient.name,
                          img: ingredient.img || "No image available",
                        })
                      );

                      console.log("Ingredients:", ingredientsDetails);
                      fetch(`${URL}/insertNewIngredients`, {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                        },
                        body: JSON.stringify({
                          ingredients: ingredientsDetails,
                        }),
                      })
                        .then((response) => response.json())
                        .then((data) => {
                          console.log("Ingredients insert response:", data);
                        })
                        .catch((error) => {
                          console.error("Error inserting ingredients:", error);
                        });
                    } else {
                      console.log("No ingredients available.");
                    }
                  } else {
                    console.log("Selected meal data is missing.");
                  }
                  Alert.alert("Success", "Added the meal to the system!");
                }}
              >
                <Text style={styles.addMealButtonText}>Add Meal</Text>
              </TouchableOpacity>

              <Button
                title="Close"
                onPress={() => setSelectedMeal(null)}
                color="#D32F2F"
              />
            </View>
          </View>
        </Modal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e9f5e9",
    paddingTop: 20,
    paddingHorizontal: 10,
  },
  searchBar: {
    height: 50,
    borderColor: "#4CAF50",
    borderWidth: 1,
    borderRadius: 25,
    marginTop: 40,
    paddingLeft: 15,
    backgroundColor: "#fff",
    width: "100%",
  },
  cardList: {
    paddingBottom: 20,
  },
  cardContainer: {
    flex: 1,
    alignItems: "center",
    marginBottom: 20,
    width: "100%",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    width: "90%",
    margin: 10,
    padding: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 10,
    textAlign: "center",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    width: "80%",
    borderRadius: 10,
    alignItems: "center",
  },
  modalImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  ingredientItem: {
    alignItems: "center",
    marginHorizontal: 5,
  },
  ingredientImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
  },
  ingredientName: {
    fontSize: 14,
    textAlign: "center",
  },
  addMealButton: {
    backgroundColor: "#388E3C",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  addMealButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default AddNewMeals;
