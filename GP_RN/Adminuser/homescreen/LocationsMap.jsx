import React, { useState, useEffect } from "react";
import { View, Text, Image, StyleSheet, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import axios from "axios";
import URL from "../../enum";

const LocationsMap = () => {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const response = await axios.get(`${URL}/getAllLocations`);
        setLocations(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching locations", error);
        Alert.alert("Failed to load locations");
        setLoading(false);
      }
    };

    fetchLocations();
  }, []);

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 32.314558,
          longitude: 35.029778,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {locations.map((location, index) => {
          const [latitude, longitude] = JSON.parse(location.Location);
          return (
            <Marker key={index} coordinate={{ latitude, longitude }}>
              <View style={styles.markerContainer}>
                <Text style={styles.usernameText}>{location.Username}</Text>
                {location.img && (
                  <Image source={{ uri: location.img }} style={styles.image} />
                )}
              </View>
            </Marker>
          );
        })}
      </MapView>

      <View style={styles.descriptionContainer}>
        <Text style={styles.descriptionText}>
          Locations of users who signed up with Fitspark
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: "100%",
    height: "100%",
  },
  markerContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  usernameText: {
    fontWeight: "bold",
    color: "black",
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginTop: 5,
  },
  descriptionContainer: {
    position: "absolute",
    top: 50,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: "rgba(0,0,0,0.8)",
    zIndex: 1,
  },
  descriptionText: {
    fontWeight: "bold",
    fontSize: 24,
    color: "white",
    textAlign: "center",
  },
});

export default LocationsMap;
