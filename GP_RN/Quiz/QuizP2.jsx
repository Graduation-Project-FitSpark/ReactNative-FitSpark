import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { QuizContext } from "./QuizContext";

const QuizP2 = ({ navigation }) => {
  const {
    expectation,
    setExpectation,
    allergies,
    setAllergies,
    diet,
    setDiet,
  } = useContext(QuizContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../img/logo2.png")} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.question}>
          1. In how many months do you expect to lose weight or improve your
          breast condition?
        </Text>
        <RadioButton.Group onValueChange={setExpectation} value={expectation}>
          <RadioButton.Item label="1-3 months" value="1-3" />
          <RadioButton.Item label="6-9 months" value="6-9" />
          <RadioButton.Item
            label="More than one year"
            value="moreThanOneYear"
          />
        </RadioButton.Group>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>
          2. Which of these foods are you allergic to or do not prefer to eat?
        </Text>
        <RadioButton.Group onValueChange={setAllergies} value={allergies}>
          <RadioButton.Item label="Legumes" value="legumes" />
          <RadioButton.Item label="Fluids" value="fluids" />
          <RadioButton.Item label="Starches" value="starches" />
          <RadioButton.Item label="Meats" value="meats" />
          <RadioButton.Item label="None" value="none" />
        </RadioButton.Group>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>
          3. Do you follow any of these diets?
        </Text>
        <RadioButton.Group onValueChange={setDiet} value={diet}>
          <RadioButton.Item label="Vegetarian" value="vegetarian" />
          <RadioButton.Item label="Keto" value="keto" />
          <RadioButton.Item label="Vegan" value="vegan" />
          <RadioButton.Item label="None" value="none" />
        </RadioButton.Group>
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("QuizP3")}
      >
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#f9f9f9",
    flexGrow: 1,
  },
  logo: {
    width: 150,
    height: 150,
    alignSelf: "center",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    width: "100%",
    alignSelf: "flex-start",
  },
  question: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
    color: "#333",
  },
  nextButton: {
    backgroundColor: "#003366",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizP2;
