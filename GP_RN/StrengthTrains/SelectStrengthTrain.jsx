import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

const SelectStrengthTrain = () => {
  const navigation = useNavigation();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.titleText}>
        Please select your strength training exercise!
      </Text>

      <TouchableOpacity
        style={styles.imageButton}
        onPress={() => navigation.navigate("PushUps")}
      >
        <Image
          source={require("../img/PushUps.jpeg")}
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
          source={require("../img/ChinUps.jpeg")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>Chin-Ups</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.imageButton}
        onPress={() => navigation.navigate("DualArmCurl")}
      >
        <Image
          source={require("../assets/DualArmCurl.jpg")}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.textContainer}>
          <Text style={styles.buttonText}>Dual-Arm-Curl</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
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
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    justifyContent: "flex-end",
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
