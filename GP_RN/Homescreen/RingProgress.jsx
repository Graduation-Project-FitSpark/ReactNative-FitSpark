import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";
import GoogleFit, { Scopes } from "react-native-google-fit";
import URL from "../enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";

import axios from "axios";

const windowWidth = Dimensions.get("window").width;

const RingProgress = ({
  radius = 100,
  color = "red",
  strokeWidth = 10,
  progress = 0.75,
}) => {
  const circleRadius = radius - strokeWidth / 2;
  const circumference = 2 * Math.PI * circleRadius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View
      style={{ width: radius * 2, height: radius * 2, alignSelf: "center" }}
    >
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          cx={radius}
          cy={radius}
          r={circleRadius}
          stroke="#e6e6e6"
          strokeWidth={strokeWidth}
          fill="none"
        />
        <Circle
          cx={radius}
          cy={radius}
          r={circleRadius}
          stroke={color}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
    </View>
  );
};

const ExampleScreen = () => {
  const [progress, setProgress] = useState(0);
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const goalCalories = 380;

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        try {
          const ID = await AsyncStorage.getItem("ID");
          console.log(ID);

          const createOrUpdateTodayEntry = async () => {
            try {
              await axios.post(`${URL}/updateCalorieSteps`, {
                trainerId: ID,
                calories: 0,
                steps: 0,
                distance: 0,
              });
              console.log("Today's entry ensured in database");

              await fetchTodayCalories();
            } catch (error) {
              console.error("Error ensuring today's entry:", error);
            }
          };

          const fetchTodayCalories = async () => {
            try {
              const response = await axios.post(`${URL}/getTodayCalories`, {
                trainerId: ID,
              });
              const { Calories, Steps, Distance } = response.data;
              setProgress(Calories / goalCalories);
              setSteps(Steps);
              setDistance(Distance);
            } catch (error) {
              console.error("Error fetching today's calories:", error);
            }
          };

          await createOrUpdateTodayEntry();
        } catch (error) {
          console.error("Error in useEffect:", error);
        }
      };

      fetchData();
    }, [])
  );

  return (
    <View style={styles.screenContainer}>
      <View style={styles.RingProgress1}>
        <RingProgress
          progress={progress}
          radius={60}
          color="red"
          strokeWidth={12}
        />
      </View>
      <View style={styles.statsContainer}>
        <Text style={styles.calories}>{`${Math.floor(
          progress * goalCalories
        )} CAL`}</Text>
        <Text style={styles.statsText}>Steps: {steps}</Text>
        <Text style={styles.statsText}>Distance: {distance.toFixed(2)} MI</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    backgroundColor: "#000",
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    maxHeight: 140,
  },
  RingProgress1: {
    alignItems: "center",
    flexDirection: "column",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  calories: {
    fontSize: 16,
    color: "red",
    marginVertical: 10,
  },
  statsContainer: {
    marginTop: 20,
  },
  statsText: {
    fontSize: 14,
    color: "#fff",
  },
});

export default ExampleScreen;
