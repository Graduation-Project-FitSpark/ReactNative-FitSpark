import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import URL from "../enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const Calendar = () => {
  const [isSigned, setIsSigned] = useState(null);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      const fetchingGym = async () => {
        const trainerId = await AsyncStorage.getItem("ID");
        fetch(`${URL}/isTrainerSigned`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ trainerId: trainerId }),
        })
          .then((response) => response.json())
          .then((data) => setIsSigned(data.isSigned))
          .catch((error) => console.error(error));
      };
      fetchingGym();
    }, [])
  );
  const handleNavigation = () => {
    if (isSigned) {
      navigation.navigate("GoToGym");
    } else {
      navigation.navigate("SignToGym");
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.box} onPress={handleNavigation}>
        <ImageBackground
          source={require("../assets/gym.jpg")}
          style={styles.boxImage}
        >
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Let's Go To Gym And Train Up!
            </Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  box: {
    width: "100%",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 125,
    overflow: "hidden",
  },
  boxImage: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    marginBottom: 70,
  },
  descriptionContainer: {
    width: "100%",
    paddingBottom: 20,
    paddingHorizontal: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    fontSize: 25,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 8,
    paddingVertical: 10,
  },
});

export default Calendar;
