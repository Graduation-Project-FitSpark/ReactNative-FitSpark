import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Image } from "react-native";
import { Accelerometer } from "expo-sensors";
import Svg, { Circle } from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";
import URL from "../enum";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import trainerDown from "../assets/chindown.png";
import trainerUp from "../assets/chinup.png";

const ChinUps = () => {
  const [chinUpCount, setChinUpCount] = useState(0);
  const [calories, setCalories] = useState(0);
  const [y, setY] = useState(0);
  const [prevY, setPrevY] = useState(0);
  const [isMovingDown, setIsMovingDown] = useState(true);
  const [tracking, setTracking] = useState(false);
  const Y_THRESHOLD = 0.3;

  useEffect(() => {
    let subscription;
    if (tracking) {
      subscription = Accelerometer.addListener(({ y }) => {
        setY(y);
      });
      Accelerometer.setUpdateInterval(100);
    }
    return () => subscription?.remove();
  }, [tracking]);

  useEffect(() => {
    if (prevY !== 0 && tracking) {
      if (y > prevY + Y_THRESHOLD && !isMovingDown) {
        setIsMovingDown(true);
      }
      if (y < prevY - Y_THRESHOLD && isMovingDown) {
        setIsMovingDown(false);
        setChinUpCount(chinUpCount + 1);
        setCalories(calories + 0.4);

        setTimeout(() => {
          setIsMovingDown(true);
        }, 1500);
      }
    }
    setPrevY(y);
  }, [y, prevY, isMovingDown, tracking]);

  const toggleTracking = () => {
    if (tracking) {
      setTracking(false);
      const updateCaloriesAndSteps = async () => {
        const trainerId = await AsyncStorage.getItem("ID");
        const pointsToAdd = Math.floor(chinUpCount / 10);

        try {
          const response = await axios.post(`${URL}/updateCalorieSteps`, {
            trainerId: trainerId,
            steps: chinUpCount,
            calories: calories,
            distance: 0,
          });

          if (response.status === 200 || response.status === 201) {
            console.log(response.data.message);
          }
          if (pointsToAdd > 0) {
            await axios.post(`${URL}/updatePoints`, {
              trainerId: trainerId,
              pointsToAdd: pointsToAdd,
            });
          }
        } catch (error) {
          console.error("Error updating calories and steps:", error);
        }
      };
      updateCaloriesAndSteps();
    } else {
      setTracking(true);
      setChinUpCount(0);
      setCalories(0);
      setIsMovingDown(true);
    }
  };

  const calculateCircleProgress = (value, maxValue) => {
    return (value / maxValue) * 100;
  };

  const trainerImage = isMovingDown ? trainerDown : trainerUp;

  return (
    <View style={styles.container}>
      <Image source={trainerImage} style={styles.trainerImage} />
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.circleContainer}>
            <Svg height="100" width="100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#dce6df"
                strokeWidth="10"
                fill="none"
              />
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#4CAF50"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${
                  Math.PI *
                  2 *
                  45 *
                  (calculateCircleProgress(chinUpCount, 100) / 100)
                } ${Math.PI * 2 * 45}`}
              />
            </Svg>
            <Icon
              name="arrow-up"
              size={30}
              color="#4CAF50"
              style={styles.icon}
            />
            <Text style={styles.circleText}>{chinUpCount}</Text>
            <Text style={styles.circleLabel}>Chin-Ups</Text>
          </View>
          <View style={styles.circleContainer}>
            <Svg height="100" width="100">
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="#dce6df"
                strokeWidth="10"
                fill="none"
              />
              <Circle
                cx="50"
                cy="50"
                r="45"
                stroke="red"
                strokeWidth="10"
                fill="none"
                strokeDasharray={`${
                  Math.PI *
                  2 *
                  45 *
                  (calculateCircleProgress(calories, 30) / 100)
                } ${Math.PI * 2 * 45}`}
              />
            </Svg>
            <Icon name="fire" size={30} color="red" style={styles.icon} />
            <Text style={styles.circleText}>{calories.toFixed(2)}</Text>
            <Text style={styles.circleLabel}>Calories</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          tracking ? styles.stopButton : styles.startButton,
        ]}
        onPress={toggleTracking}
      >
        <Text style={styles.buttonText}>
          {tracking ? "Stop Training" : "Start Training"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 20,
  },
  trainerImage: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  card: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    marginBottom: 20,
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },
  circleContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  icon: {
    position: "absolute",
    top: 15,
  },
  circleText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  circleLabel: {
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    width: 150,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: 20,
  },
  startButton: {
    backgroundColor: "#4CAF50",
  },
  stopButton: {
    backgroundColor: "red",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ChinUps;
