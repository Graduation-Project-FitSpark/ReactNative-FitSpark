import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import URL from "../enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useFocusEffect } from "@react-navigation/native";

const Calendar = () => {
  const [isSigned, setIsSigned] = useState(null);
  const navigation = useNavigation();
  const [trainerID, setTrainerId] = useState();
  useFocusEffect(
    React.useCallback(() => {
      const fetchingGym = async () => {
        const trainerId = await AsyncStorage.getItem("ID");
        setTrainerId(trainerId);
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
      <TouchableOpacity
        style={styles.box}
        onPress={async () => {
          try {
            const coachResponse = await axios.post(
              `${URL}/checkCoachResponse`,
              {
                trainerId: trainerID,
              }
            );
            console.log(trainerID);
            if (coachResponse.data.Accepted === "P") {
              Alert.alert(
                "Warning",
                "You can't talk to your Coach right now untill he accept!"
              );
            } else {
              navigation.navigate("ChatTrainerCoach");
            }
          } catch (err) {
            console.error("Error checking status:", err);
          }
        }}
      >
        <ImageBackground
          source={require("../assets/chatCoach.jpg")}
          style={styles.boxImage}
        >
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>Chat with your Coach!</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.box}
        onPress={async () => {
          try {
            const coachResponse = await axios.post(
              `${URL}/checkSpecialistResponse`,
              {
                trainerId: trainerID,
              }
            );
            if (coachResponse.data.Accepted === "P") {
              Alert.alert(
                "Warning",
                "You can't talk to your Nutration Expert right now untill he accept!"
              );
            } else {
              navigation.navigate("ChatTrainerSpecialist");
            }
          } catch (err) {
            console.error("Error checking status:", err);
          }
        }}
      >
        <ImageBackground
          source={require("../assets/chatSpec.jpg")}
          style={styles.boxImage}
        >
          <View style={styles.descriptionContainer}>
            <Text style={styles.description}>
              Chat with your Nutration Expert!
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
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    backgroundColor: "#f7f7f7",
  },
  box: {
    width: "85%",
    height: 200,
    borderRadius: 20,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.6,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 10,
  },
  boxImage: {
    flex: 1,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  descriptionContainer: {
    width: "100%",
    padding: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5,
  },
  description: {
    fontSize: 20,
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
    letterSpacing: 1,
    paddingVertical: 5,
    letterSpacing: 8,
  },
});

export default Calendar;
