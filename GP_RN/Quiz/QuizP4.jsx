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

const QuizP4 = ({ navigation }) => {
  const {
    additionalGoals,
    setAdditionalGoals,
    pushUps,
    setPushUps,
    pullUps,
    setPullUps,
  } = useContext(QuizContext);

  const isFormValid = () => {
    return additionalGoals && pushUps && pullUps;
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image source={require("../img/logo2.png")} style={styles.logo} />

      <View style={styles.card}>
        <Text style={styles.question}>
          1. Is there another additional goal?
        </Text>
        <RadioButton.Group
          onValueChange={setAdditionalGoals}
          value={additionalGoals}
        >
          <RadioButton.Item label="Improve sleep" value="improveSleep" />
          <RadioButton.Item label="Form a physical habit" value="formHabit" />
          <RadioButton.Item label="Self-discipline" value="selfDiscipline" />
          <RadioButton.Item label="Feel healthier" value="feelHealthier" />
          <RadioButton.Item label="None" value="none" />
        </RadioButton.Group>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>
          2. How many push-ups can you do in a round?
        </Text>
        <RadioButton.Group onValueChange={setPushUps} value={pushUps}>
          <RadioButton.Item label="Less than 10" value="lessThan10" />
          <RadioButton.Item label="10-20" value="10-20" />
          <RadioButton.Item label="20-30" value="20-30" />
          <RadioButton.Item label="More than 30" value="moreThan30" />
        </RadioButton.Group>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>
          3. How many pull-ups can you do in a round?
        </Text>
        <RadioButton.Group onValueChange={setPullUps} value={pullUps}>
          <RadioButton.Item label="Nothing" value="nothing" />
          <RadioButton.Item label="Less than 5" value="lessThan5" />
          <RadioButton.Item label="5-10" value="5-10" />
          <RadioButton.Item label="More than 10" value="moreThan10" />
        </RadioButton.Group>
      </View>

      <TouchableOpacity
        style={[styles.nextButton, !isFormValid() && styles.disabledButton]}
        onPress={() => isFormValid() && navigation.navigate("QuizP5")}
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

export default QuizP4;
