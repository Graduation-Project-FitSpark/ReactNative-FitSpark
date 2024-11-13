import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { QuizContext } from "./QuizContext";

const QuizP3 = ({ navigation }) => {
  const {
    sugarFrequency,
    setSugarFrequency,
    waterIntake,
    setWaterIntake,
    targetWeight,
    setTargetWeight,
  } = useContext(QuizContext);

  const isValidWeight = (weight) => {
    return !isNaN(weight) && weight.trim() !== "";
  };

  const isFormValid = () => {
    return sugarFrequency && waterIntake && isValidWeight(targetWeight);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../img/logo2.png")} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.question}>
          1. How often do you eat sugary foods?
        </Text>
        <RadioButton.Group
          onValueChange={setSugarFrequency}
          value={sugarFrequency}
        >
          <RadioButton.Item label="Never" value="never" />
          <RadioButton.Item label="1-2 times a week" value="1-2" />
          <RadioButton.Item label="Every day" value="everyDay" />
          <RadioButton.Item label="Multiple times a day" value="multiple" />
        </RadioButton.Group>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>
          2. How much water do you drink daily?
        </Text>
        <RadioButton.Group onValueChange={setWaterIntake} value={waterIntake}>
          <RadioButton.Item label="Less than 1 liter" value="lessThan1L" />
          <RadioButton.Item label="1-2 liters" value="1-2L" />
          <RadioButton.Item label="2-3 liters" value="2-3L" />
          <RadioButton.Item label="More than 3 liters" value="moreThan3L" />
        </RadioButton.Group>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>
          3. What is your target weight number?
        </Text>
        <TextInput
          style={styles.input}
          placeholder="Enter target weight here"
          keyboardType="numeric"
          value={targetWeight}
          onChangeText={setTargetWeight}
        />
      </View>

      <TouchableOpacity
        style={[styles.nextButton, !isFormValid() && styles.disabledButton]}
        onPress={() => isFormValid() && navigation.navigate("QuizP4")}
        disabled={!isFormValid()}
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
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    width: "100%",
    paddingHorizontal: 10,
    marginBottom: 20,
    borderRadius: 5,
  },
  nextButton: {
    backgroundColor: "#003366",  
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  disabledButton: {
    backgroundColor: "lightgray",
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizP3;
