import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
} from "react-native";
import URL from "../enum";

const SelectCoach = ({ navigation }) => {
  const [coaches, setCoaches] = useState([]);
  const [selectedCoachId, setSelectedCoachId] = useState(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      try {
        const response = await fetch(`${URL}/getAllCoaches`);
        const result = await response.json();
        setCoaches(result.coaches);
      } catch (error) {
        console.error("Error With Coaches:", error);
      }
    };

    fetchCoaches();
  }, []);

  const handleSelectCoach = (id) => {
    setSelectedCoachId(id);
  };

  const handleNext = () => {
    if (selectedCoachId) {
      const selectedCoach = coaches.find(
        (coach) => coach.ID_Coach === selectedCoachId
      );
      navigation.navigate("SelectSpecialist", { selectedCoach });
    }
  };

  const renderCoachItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.coachContainer,
        item.ID_Coach === selectedCoachId && styles.selectedCoach,
      ]}
      onPress={() => handleSelectCoach(item.ID_Coach)}
    >
      <Image
        source={item.Img ? { uri: item.Img } : require("../img/logo.png")}
        style={styles.coachImage}
      />
      <View style={styles.coachInfo}>
        <Text
          style={[
            styles.coachName,
            item.ID_Coach === selectedCoachId && styles.selectedText,
          ]}
        >
          {item.First_Name} {item.Last_Name}
        </Text>
        <Text
          style={[
            styles.coachAge,
            item.ID_Coach === selectedCoachId && styles.selectedText,
          ]}
        >
          Age: {item.Age}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Image source={require("../img/logo.png")} style={styles.logo} />
      <Text style={styles.headerText}>
        Please select your Coach who will be your supervisor
      </Text>
      <FlatList
        data={coaches}
        renderItem={renderCoachItem}
        keyExtractor={(item) => item.ID_Coach}
      />
      <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
        <Text style={styles.nextButtonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: "center",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
  },
  coachContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    backgroundColor: "#F0F0F0",
  },
  selectedCoach: {
    backgroundColor: "#003366",
  },
  coachImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  coachInfo: {
    flex: 1,
  },
  coachName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  coachAge: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#666",
  },
  selectedText: {
    color: "#FFF",
  },
  nextButton: {
    backgroundColor: "#003366",
    padding: 16,
    borderRadius: 50,
    alignItems: "center",
    marginVertical: 16,
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SelectCoach;
