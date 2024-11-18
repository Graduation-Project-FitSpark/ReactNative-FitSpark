import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import URL from "../enum";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const WalkingCalMap = () => {
  const [location, setLocation] = useState(null);
  const [walking, setWalking] = useState(false);
  const [steps, setSteps] = useState(0);
  const [totalDistance, setTotalDistance] = useState(0);
  const [calories, setCalories] = useState(0);
  const [previousLocation, setPreviousLocation] = useState(null);
  const [pathCoordinates, setPathCoordinates] = useState([]);

  useEffect(() => {
    const requestPermission = async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.error("Permission to access location was denied");
      }
    };
    requestPermission();
  }, []);

  useEffect(() => {
    let watchLocation;

    const startWatchingLocation = async () => {
      watchLocation = await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.High,
          distanceInterval: 1,
          timeInterval: 1000,
        },
        (newLocation) => {
          console.log("New Location: ", newLocation);

          if (previousLocation) {
            const distance = getDistanceBetween(
              previousLocation.coords,
              newLocation.coords
            );
            setTotalDistance((prevDistance) => prevDistance + distance);
            setSteps((prevSteps) => prevSteps + Math.round(distance / 0.8));
            setCalories((prevCalories) => prevCalories + distance * 0.05);
          }

          setPreviousLocation(newLocation);
          setLocation(newLocation.coords);
          setPathCoordinates((prevCoords) => [
            ...prevCoords,
            newLocation.coords,
          ]);
        }
      );
    };

    if (walking) {
      startWatchingLocation();
    }

    return () => {
      if (watchLocation) {
        watchLocation.remove();
      }
    };
  }, [walking, previousLocation]);

  const getDistanceBetween = (coords1, coords2) => {
    const toRad = (value) => (value * Math.PI) / 180;
    const R = 6371e3;
    const lat1 = toRad(coords1.latitude);
    const lat2 = toRad(coords2.latitude);
    const deltaLat = toRad(coords2.latitude - coords1.latitude);
    const deltaLng = toRad(coords2.longitude - coords1.longitude);

    const a =
      Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
      Math.cos(lat1) *
        Math.cos(lat2) *
        Math.sin(deltaLng / 2) *
        Math.sin(deltaLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c;
    return distance;
  };

  const startWalking = async () => {
    setWalking(true);
    setSteps(0);
    setTotalDistance(0);
    setCalories(0);
    setPreviousLocation(null);
    setPathCoordinates([]);
  };

  const stopWalking = () => {
    setWalking(false);
    const updateCaloriesAndSteps = async () => {
      const trainerId = await AsyncStorage.getItem("ID");
      const pointsToAdd = Math.floor(steps / 50);
      try {
        const response = await axios.post(`${URL}/updateCalorieSteps`, {
          trainerId: trainerId,
          steps: steps,
          calories: calories,
          distance: totalDistance,
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
  };

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location ? location.latitude : 37.78825,
          longitude: location ? location.longitude : -122.4324,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        {location && (
          <Marker
            coordinate={location}
            title="You Are Here"
            description={`Lat: ${location.latitude}, Lon: ${location.longitude}`}
            pinColor="blue"
          />
        )}
        <Polyline
          coordinates={pathCoordinates}
          strokeColor="red"
          strokeWidth={4}
        />
      </MapView>
      <View style={styles.statsContainer}>
        <View style={styles.statCircle}>
          <Text style={styles.statValue}>{steps}</Text>
          <Text style={styles.statLabel}>Steps</Text>
        </View>
        <View style={styles.statCircle}>
          <Text style={styles.statValue}>{totalDistance.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Meters</Text>
        </View>
        <View style={styles.statCircle}>
          <Text style={styles.statValue}>{calories.toFixed(2)}</Text>
          <Text style={styles.statLabel}>Calories</Text>
        </View>
      </View>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  map: {
    width: "100%",
    height: "50%",
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  statCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderWidth: 2,
    borderColor: "#ccc",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
  },
  statLabel: {
    fontSize: 14,
    color: "#666",
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
    backgroundColor: "#f44336",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default WalkingCalMap;
