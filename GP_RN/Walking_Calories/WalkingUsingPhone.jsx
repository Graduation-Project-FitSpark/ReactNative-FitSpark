import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { Pedometer } from "expo-sensors";
import Svg, { Circle } from "react-native-svg";
import Icon from "react-native-vector-icons/FontAwesome";
const CircularProgress = ({
  radius,
  strokeWidth,
  percentage,
  color,
  label,
  value,
  iconName,
}) => {
  const normalizedRadius = radius - strokeWidth / 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <View style={styles.cardContainer}>
      <Svg height={radius * 2} width={radius * 2}>
        <Circle
          stroke="#eee"
          fill="transparent"
          strokeWidth={strokeWidth}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <Circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          r={normalizedRadius}
          cx={radius}
          cy={radius}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
        />
      </Svg>
      <View style={styles.circleTextContainer}>
        <Icon name={iconName} size={24} color={color} />
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.labelText}>{label}</Text>
      </View>
    </View>
  );
};

const WalkingUsingPhone = () => {
  const [isPedometerAvailable, setIsPedometerAvailable] = useState("checking");
  const [steps, setSteps] = useState(0);
  const [distance, setDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [walking, setWalking] = useState(false);

  useEffect(() => {
    Pedometer.isAvailableAsync().then(
      (result) => setIsPedometerAvailable(String(result)),
      (error) => setIsPedometerAvailable("false")
    );
  }, []);

  useEffect(() => {
    let subscription;

    const startTracking = () => {
      subscription = Pedometer.watchStepCount((result) => {
        const newSteps = Number((result.steps / 10).toFixed(1));
        setSteps((prevSteps) => prevSteps + newSteps);

        const stepLength = 0.8; // Average step length in meters
        const distanceWalked = newSteps * stepLength; // Distance in meters
        setDistance((prevDistance) => prevDistance + distanceWalked);

        const caloriesBurnedPerStep = 0.04; // Estimated calories burned per step
        const newCalories = newSteps * caloriesBurnedPerStep;
        setCalories((prevCalories) => prevCalories + newCalories);
      });
    };

    if (walking) {
      startTracking();
    }

    return () => {
      if (subscription) {
        subscription.remove();
      }
    };
  }, [walking]);

  const startWalking = () => {
    setWalking(true);
    setSteps(0); // Reset steps
    setDistance(0); // Reset distance
    setCalories(0); // Reset calories
  };

  const stopWalking = () => {
    setWalking(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false} // Hide vertical scroll indicator
        showsHorizontalScrollIndicator={false} // Hide horizontal scroll indicator
      >
        <CircularProgress
          radius={90}
          strokeWidth={10}
          percentage={(steps / 10000) * 100}
          color="#4CAF50"
          label="Steps"
          value={steps.toFixed(0)}
          iconName="bicycle"
        />
        <CircularProgress
          radius={90}
          strokeWidth={10}
          percentage={(calories / 2000) * 100} // Assuming 2000 calories goal
          color="#FF9800"
          label="Calories"
          value={calories.toFixed(2)}
          iconName="fire"
        />
        <CircularProgress
          radius={90}
          strokeWidth={10}
          percentage={(distance / 100) * 100} // Assuming 10km goal
          color="#00BCD4"
          label="Meters"
          value={distance.toFixed(2)}
          iconName="map-marker"
        />
        <TouchableOpacity
          style={[
            styles.button,
            walking ? styles.stopButton : styles.startButton,
          ]}
          onPress={walking ? stopWalking : startWalking}
        >
          <Text style={styles.buttonText}>
            {walking ? "Stop Walking" : "Start Walking"}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff", // Changed background to white
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  cardContainer: {
    alignItems: "center",
    marginVertical: 20,
    backgroundColor: "#fff", // White background for card
    borderRadius: 10,
    padding: 20,
    elevation: 5, // Android shadow
    shadowColor: "#000", // iOS shadow
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  circleTextContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: "100%",
  },
  valueText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333", // Adjusted text color for white background
    textAlign: "center",
  },
  labelText: {
    fontSize: 14,
    color: "#555", // Adjusted label text color
    textAlign: "center",
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
    backgroundColor: "#4CAF50", // Green for start
  },
  stopButton: {
    backgroundColor: "#f44336", // Red for stop
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WalkingUsingPhone;
