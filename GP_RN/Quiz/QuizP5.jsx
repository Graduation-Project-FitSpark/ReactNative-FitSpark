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

const QuizP5 = ({ navigation }) => {
  const {
    workoutTime,
    setWorkoutTime,
    mealPrepTime,
    setMealPrepTime,
    physicalLimitations,
    setPhysicalLimitations,
  } = useContext(QuizContext);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../img/logo2.png")} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.question}>
          1. How much time are you willing to spend on a workout?
        </Text>
        <RadioButton.Group onValueChange={setWorkoutTime} value={workoutTime}>
          <RadioButton.Item label="30 minutes" value="30Min" />
          <RadioButton.Item label="45 minutes" value="45Min" />
          <RadioButton.Item label="1 hour" value="1Hour" />
          <RadioButton.Item label="More than 1 hour" value="moreThan1Hour" />
        </RadioButton.Group>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>
          2. How much time are you ready to spend per meal prep?
        </Text>
        <RadioButton.Group onValueChange={setMealPrepTime} value={mealPrepTime}>
          <RadioButton.Item
            label="Less than 30 minutes"
            value="lessThan30Min"
          />
          <RadioButton.Item label="30-60 minutes" value="30To60Min" />
          <RadioButton.Item
            label="More than 1 hour"
            value="moreThan1HourMealPrep"
          />
          <RadioButton.Item label="Just ordering meals" value="orderMeals" />
        </RadioButton.Group>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>
          3. Do you have any past injuries or physical limitations?
        </Text>
        <RadioButton.Group
          onValueChange={setPhysicalLimitations}
          value={physicalLimitations}
        >
          <RadioButton.Item label="Yes" value="yes" />
          <RadioButton.Item label="No" value="no" />
        </RadioButton.Group>
      </View>

      <TouchableOpacity
        style={styles.nextButton}
        onPress={() => navigation.navigate("QuizP6")}
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

export default QuizP5;
