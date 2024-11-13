import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SelectStrengthTrain = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Please select your strength training exercise!
      </Text>

      <TouchableOpacity
        style={styles.imageButton}
        onPress={() => navigation.navigate("PushUps")}
      >
        <Image
          source={require("../img/PushUps.jpeg")} // Update path as needed
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>Push-Ups</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imageButton}
        onPress={() => navigation.navigate("ChinUps")}
      >
        <Image
          source={require("../img/ChinUps.jpeg")} // Update path as needed
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>Chin-Ups</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
  },
  titleText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 40,
    textAlign: "center",
  },
  imageButton: {
    width: "90%",
    height: 200,
    marginVertical: 20,
    position: "relative",
    borderRadius: 15,
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
  },
  textContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.4)", // Full overlay with shadow effect
    justifyContent: "flex-end", // Align the text at the bottom
    padding: 10,
  },
  buttonText: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10,
  },
});

export default SelectStrengthTrain;
