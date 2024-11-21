import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Image,
  Dimensions,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import { useNavigation } from "@react-navigation/native";
import URL from "../enum";
import AsyncStorage from "@react-native-async-storage/async-storage";

const SignToGym = () => {
  const [trainerLocation, setTrainerLocation] = useState(null);
  const [gyms, setGyms] = useState([]);
  const [selectedGym, setSelectedGym] = useState(null);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const trainerId = await AsyncStorage.getItem("ID");
        const locationResponse = await fetch(`${URL}/getTrainerLocation`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ trainerId }),
        });
        const locationData = await locationResponse.json();

        if (locationData && locationData.location) {
          const locationArray = JSON.parse(locationData.location);
          if (Array.isArray(locationArray) && locationArray.length === 2) {
            const latitude = parseFloat(locationArray[0]);
            const longitude = parseFloat(locationArray[1]);
            setTrainerLocation({ latitude, longitude });
          }
        }

        const gymsResponse = await fetch(`${URL}/getGyms`);
        const gymsData = await gymsResponse.json();
        setGyms(gymsData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchLocations();
  }, []);

  const handleGymSelect = (gym) => setSelectedGym(gym);

  const handleSubmit = async () => {
    if (!selectedGym) return;
    const trainerId = await AsyncStorage.getItem("ID");
    try {
      const response = await fetch(`${URL}/insertTrainerToGym`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ trainerId, gym_id: selectedGym.gym_id }),
      });
      const data = await response.json();
      navigation.navigate("Menubar");
    } catch (error) {
      console.error(error);
    }
  };

  if (!trainerLocation || !gyms.length) {
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
          latitude: trainerLocation.latitude,
          longitude: trainerLocation.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        <Marker
          coordinate={{
            latitude: trainerLocation.latitude,
            longitude: trainerLocation.longitude,
          }}
          title="My Location"
        ></Marker>

        {gyms.map((gym) => (
          <Marker
            key={gym.gym_id}
            coordinate={{
              latitude: gym.latitude,
              longitude: gym.longitude,
            }}
            title={gym.name}
            description={gym.name}
          >
            <Image
              source={{ uri: gym.img }}
              style={{ width: 40, height: 40, borderRadius: 20 }}
            />
          </Marker>
        ))}
      </MapView>

      <View style={styles.listContainer}>
        <FlatList
          data={gyms}
          keyExtractor={(item) => item.gym_id.toString()}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.specialistContainer,
                selectedGym?.gym_id === item.gym_id &&
                  styles.selectedSpecialist,
              ]}
              onPress={() => handleGymSelect(item)}
            >
              <Image
                source={{ uri: item.img }}
                style={styles.specialistImage}
              />
              <View style={styles.specialistInfo}>
                <Text
                  style={[
                    styles.specialistName,
                    selectedGym?.gym_id === item.gym_id && styles.selectedText,
                  ]}
                >
                  {item.name}
                </Text>
              </View>
              <Text
                style={[
                  styles.gymPrice,
                  selectedGym?.gym_id === item.gym_id && styles.selectedText,
                ]}
              >
                ${item.price}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>
      <TouchableOpacity style={styles.nextButton} onPress={handleSubmit}>
        <Text style={styles.nextButtonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  map: {
    width: Dimensions.get("window").width,
    height: "50%",
  },
  listContainer: {
    flex: 1,
    marginTop: 16,
  },
  specialistContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    backgroundColor: "#F0F0F0",
  },
  selectedSpecialist: {
    backgroundColor: "#003366",
  },
  specialistImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  specialistInfo: {
    flex: 1,
  },
  specialistName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  selectedText: {
    color: "#FFF",
  },
  selectedLocation: {
    fontSize: 14,
    color: "#666",
  },
  gymPrice: {
    fontSize: 16,
    color: "#333",
    fontWeight: "bold",
  },
  nextButton: {
    backgroundColor: "#003366",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default SignToGym;
