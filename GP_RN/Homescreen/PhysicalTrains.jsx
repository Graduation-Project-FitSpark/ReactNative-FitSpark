import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const PhysicalTrains = () => {
  const navigation = useNavigation();

  const handleCardioClick = () => {
    navigation.navigate("SelectingPage");
  };

  const handleStrengthClick = () => {
    navigation.navigate("SelectStrengthTrain");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.card} onPress={handleCardioClick}>
        <ImageBackground
          source={require("../assets/cardio.jpg")}
          style={styles.imageBackground}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>Cardio</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                Boost your endurance with cardio exercises.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

      <TouchableOpacity style={styles.card} onPress={handleStrengthClick}>
        <ImageBackground
          source={require("../assets/strength.jpg")}
          style={styles.imageBackground}
        >
          <View style={styles.overlay}>
            <Text style={styles.title}>Strength</Text>
            <View style={styles.descriptionContainer}>
              <Text style={styles.description}>
                Build muscle and power with strength training.
              </Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f4f4f4",
  },
  card: {
    width: "100%",
    height: 250,
    borderRadius: 15,
    overflow: "hidden",
    marginBottom: 20,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
  },
  imageBackground: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  overlay: {
    width: "100%",
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "rgba(0, 0, 0, 0.56)",
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
    alignItems: "left",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    textAlign: "left",
    marginBottom: 5,
    textShadowColor: "rgba(0, 0, 0, 0.7)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 6,
  },
  descriptionContainer: {
    padding: 10,
    borderRadius: 8,
    width: "90%",
    alignItems: "left",
  },
  description: {
    fontSize: 14,
    color: "white",
    textAlign: "left",
  },
});

export default PhysicalTrains;
