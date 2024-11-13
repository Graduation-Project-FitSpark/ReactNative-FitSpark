import React, { useContext } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from "react-native";
import { RadioButton } from "react-native-paper";
import { QuizContext } from "./QuizContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../enum";
const QuizP6 = ({ navigation }) => {
  const {
    goal,
    bodyType,
    problemArea,
    expectation,
    allergies,
    diet,
    sugarFrequency,
    waterIntake,
    targetWeight,
    additionalGoals,
    pushUps,
    pullUps,
    workoutTime,
    mealPrepTime,
    physicalLimitations,
    supplements,
    sleepPattern,
    setSupplements,
    setSleepPattern,
  } = useContext(QuizContext);

  const handleSubmit = async (event) => {
    let Foods = [];
    let Trains = [];
    let userDetails = {};
    const username = await AsyncStorage.getItem("username");
    try {
      const foodsResponse = await fetch(`${URL}/getFoods`);
      const foodsData = await foodsResponse.json();
      Foods = foodsData.foods;
      const trainsResponse = await fetch(`${URL}/getTrains`);
      const trainsData = await trainsResponse.json();
      Trains = trainsData.trains;
      const userResponse = await fetch(`${URL}/getTrainerDetails`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username }),
      });
      const userData = await userResponse.json();
      userDetails = userData.trainer;

      const trainerId = userDetails.ID_Trainer;
      const openAiPrompt = `
As a fitness trainer, I'm working with a client who has provided answers to several questions related to their fitness and dietary goals. Based on their answers, I would like you to help organize their 'Foods' and 'Trains' into specific recommendations for each day of the week.

### Important:
1. I am sending you three arrays:
    - 'Foods': A list of possible food options with their corresponding IDs.
    - 'Trains': A list of possible workouts and exercises with their corresponding IDs.
    - 'userDetails': The client's detailed information based on their answers to the quiz.
    
2. Based on the 'userDetails', select appropriate items from the 'Foods' and 'Trains' arrays for each day of the week.

3. For the 'Foods' array:
    - Each day of the week (Saturday to Friday) should contain **three** entries for food (one for Breakfast, one for Lunch, one for Dinner).
    - You will need to return the food recommendations in JSON format, with each food being selected by its ID from the 'Foods' array.
    - Along with the food ID, you need to specify the meal time: either 'Breakfast', 'Lunch', or 'Dinner'.

4. For the 'Trains' array:
  - Each day of the week (Saturday to Friday) should contain 2 or 3 separate workout recommendations for each ID_Trainer.
  - Each recommendation should be listed as a separate JSON object with fields: ID_Trainer, ID_Train, and Day_Of_Week.
  - Each entry must be independent, with a unique ID_Train and the associated day.
  
### Output Format:
The result should be returned in the following JSON format:

{
    "Foods": {
        "Saturday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Sunday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Monday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Tuesday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Wednesday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Thursday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ],
        "Friday": [
            {"ID": ..., "Time": "Breakfast"},
            {"ID": ..., "Time": "Lunch"},
            {"ID": ..., "Time": "Dinner"}
        ]
    },
    "Trains": {
        "Saturday": {"ID": ...}, 
        "Sunday": {"ID": ...}, 
        "Monday": {"ID": ...}, 
        "Tuesday": {"ID": ...}, 
        "Wednesday": {"ID": ...}, 
        "Thursday": {"ID": ...}, 
        "Friday": {"ID": ...}
    }
}

### Client Information:
- Foods: ${JSON.stringify(Foods)}
- Trains: ${JSON.stringify(Trains)}
- userDetails: ${JSON.stringify(userDetails)}

Here are the client's answers to the questions:

Q1 - Goal: ${goal}
Q2 - Body Type: ${bodyType}
Q3 - Problem Area: ${problemArea}
Q4 - Expectation (time to achieve goal): ${expectation}
Q5 - Allergies (foods to avoid): ${allergies}
Q6 - Diet (any specific diet): ${diet}
Q7 - Sugar Frequency (how often they eat sugary foods): ${sugarFrequency}
Q8 - Water Intake (daily water intake): ${waterIntake}
Q9 - Target Weight: ${targetWeight}
Q10 - Additional Goals (if any): ${additionalGoals}
Q11 - Push Ups (how many they can do in a round): ${pushUps}
Q12 - Pull Ups (how many they can do in a round): ${pullUps}
Q13 - Workout Time (how much time they are willing to spend on workouts): ${workoutTime}
Q14 - Meal Prep Time (how much time they are ready to spend on meal prep): ${mealPrepTime}
Q15 - Physical Limitations (any past injuries or physical limitations): ${physicalLimitations}
Q16 - Supplements (whether they take any supplements): ${supplements}
Q17 - Sleep Pattern (current sleep pattern): ${sleepPattern}

Please take these answers into account and provide **7 days' worth** of food and workout recommendations using the 'Foods' and 'Trains' arrays.

Ensure that:
- Foods are assigned by their ID with the correct meal time (Breakfast, Lunch, Dinner).
- Trains are selected by their ID from the 'Trains' array.

Don't give me any justification—just provide the JSON result so I can use it in my code.
`;

      const openAiResponse = await fetch(`${URL}/sendQuizResult`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: openAiPrompt }),
      });

      const openAiData = await openAiResponse.json();
      console.log(openAiData);

      await fetch(`${URL}/sendingFinalResponse`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          response: openAiData,
          trainerId: trainerId,
        }),
      });

      console.log("Success Sending and finishing!");
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require("../img/logo2.png")}
        style={styles.logo}
        resizeMode="contain"
      />

      <View style={styles.card}>
        <Text style={styles.question}>1. Do you take any supplements?</Text>
        <RadioButton.Group onValueChange={setSupplements} value={supplements}>
          <RadioButton.Item label="Protein powder" value="proteinPowder" />
          <RadioButton.Item label="Multivitamins" value="multivitamins" />
          <RadioButton.Item label="Creatine" value="creatine" />
          <RadioButton.Item label="None" value="none" />
        </RadioButton.Group>
      </View>

      <View style={styles.card}>
        <Text style={styles.question}>
          2. What is your current sleep pattern like?
        </Text>
        <RadioButton.Group onValueChange={setSleepPattern} value={sleepPattern}>
          <RadioButton.Item label="Less than 6 hours" value="lessThan6Hours" />
          <RadioButton.Item label="6-7 hours" value="6To7Hours" />
          <RadioButton.Item label="7-8 hours" value="7To8Hours" />
          <RadioButton.Item label="More than 8 hours" value="moreThan8Hours" />
        </RadioButton.Group>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  logo: {
    width: 150,
    height: 100,
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
  submitButton: {
    backgroundColor: "#003366",
    paddingVertical: 10,
    paddingHorizontal: 40,
    borderRadius: 8,
    marginTop: 20,
    alignSelf: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizP6;
