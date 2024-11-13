import React, { useState, useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { QuizContext } from "./QuizContext";

const QuizP1 = ({ navigation }) => {
  const { goal, setGoal, bodyType, setBodyType, problemArea, setProblemArea } =
    useContext(QuizContext);

  const handleNext = () => {
    if (!goal || !bodyType || !problemArea) {
      Alert.alert("Please answer all questions before proceeding.");
      return;
    }

    console.log("Goal:", goal);
    console.log("Body Type:", bodyType);
    console.log("Problem Area:", problemArea);

    navigation.navigate("QuizP2");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../img/logo2.png")} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.question}>1. Choose your goal:</Text>
        <RadioButton.Group
          onValueChange={(value) => setGoal(value)}
          value={goal}
        >
          <RadioButton.Item label="Lose weight" value="Lose weight" />
          <RadioButton.Item label="Get shredded" value="Get shredded" />
          <RadioButton.Item label="Gain muscle mass" value="Gain muscle mass" />
        </RadioButton.Group>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>2. Choose the body you want:</Text>
        <RadioButton.Group
          onValueChange={(value) => setBodyType(value)}
          value={bodyType}
        >
          <RadioButton.Item label="Slim body" value="Slim body" />
          <RadioButton.Item label="Hero body" value="Hero body" />
          <RadioButton.Item label="Bodybuilder" value="Bodybuilder" />
        </RadioButton.Group>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>3. Select problem areas:</Text>
        <RadioButton.Group
          onValueChange={(value) => setProblemArea(value)}
          value={problemArea}
        >
          <RadioButton.Item label="Slim arms" value="Slim arms" />
          <RadioButton.Item label="Weak chest" value="Weak chest" />
          <RadioButton.Item label="Slim legs" value="Slim legs" />
          <RadioButton.Item label="Beer belly" value="Beer belly" />
        </RadioButton.Group>
      </View>

      <TouchableOpacity onPress={handleNext} style={styles.nextButton}>
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
    marginBottom: 20,
    alignSelf: "center",
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

export default QuizP1;
