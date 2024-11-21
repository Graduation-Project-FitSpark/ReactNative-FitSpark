import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import URL from "../enum";
const GoToGym = () => {
  const [trainerLocation, setTrainerLocation] = useState(null);
  const [gymLocation, setGymLocation] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocations = async () => {
      const trainerId = await AsyncStorage.getItem("ID");

      fetch(`${URL}/getGymLocation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ trainerId: trainerId }),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Gym location response:", data);

          if (data.location) {
            const location = JSON.parse(data.location.replace(/\r/g, ""));
            setGymLocation({
              latitude: location[0],
              longitude: location[1],
              img: data.img,
            });
          }
        })
        .catch((error) => console.error("Error fetching gym location:", error));

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === "granted") {
        const location = await Location.getCurrentPositionAsync({});
        setTrainerLocation(location.coords);
      }
    };

    fetchLocations();
  }, []);

  useEffect(() => {
    if (trainerLocation && gymLocation) {
      fetchRoute(trainerLocation, gymLocation);
    }
  }, [trainerLocation, gymLocation]);

  const fetchRoute = (start, end) => {
    const url = `https://router.project-osrm.org/route/v1/driving/${start.longitude},${start.latitude};${end.longitude},${end.latitude}?overview=full&geometries=geojson`;

    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.routes && data.routes[0] && data.routes[0].geometry) {
          const route = data.routes[0].geometry.coordinates.map(
            ([longitude, latitude]) => ({
              latitude,
              longitude,
            })
          );
          setRouteCoordinates(route);
        }
      })
      .catch((error) => console.error("Error fetching route:", error));
  };

  const handleNavigateHome = () => {
    navigation.navigate("Menubar");
  };

  if (!trainerLocation || !gymLocation) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: trainerLocation ? trainerLocation.latitude : 37.78825,
          longitude: trainerLocation ? trainerLocation.longitude : -122.4324,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {trainerLocation && (
          <Marker coordinate={trainerLocation} title="Your Location" />
        )}
        {gymLocation && gymLocation.latitude && gymLocation.longitude && (
          <Marker
            coordinate={gymLocation}
            title="Gym Location"
            description="Destination gym"
            image={{ uri: gymLocation.img }}
          />
        )}
        {routeCoordinates.length > 0 && (
          <Polyline
            coordinates={routeCoordinates}
            strokeWidth={3}
            strokeColor="blue"
          />
        )}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handleNavigateHome}>
        <Text style={styles.buttonText}>Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: "90%",
  },
  button: {
    position: "absolute",
    bottom: 30,
    left: Dimensions.get("window").width / 2 - 40,
    width: 80,
    height: 80,
    backgroundColor: "#003366",
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default GoToGym;
