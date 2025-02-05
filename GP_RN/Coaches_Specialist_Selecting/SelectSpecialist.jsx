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

const SelectSpecialist = ({ navigation }) => {
  const [specialists, setSpecialists] = useState([]);
  const [selectedSpecialistId, setSelectedSpecialistId] = useState(null);

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const response = await fetch(`${URL}/getAllSpecialists`);
        const result = await response.json();
        setSpecialists(result.specialists);
      } catch (error) {
        console.error("Error With Specialists:", error);
      }
    };

    fetchSpecialists();
  }, []);

  const handleSelectSpecialist = (id) => {
    setSelectedSpecialistId(id);
  };

  const handleNext = () => {
    if (selectedSpecialistId) {
      const selectedSpecialist = specialists.find(
        (specialist) => specialist.ID_Specialist === selectedSpecialistId
      );
      navigation.navigate("NextPage", { selectedSpecialist });
    }
  };

  const renderSpecialistItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.specialistContainer,
        item.ID_Specialist === selectedSpecialistId &&
          styles.selectedSpecialist,
      ]}
      onPress={() => handleSelectSpecialist(item.ID_Specialist)}
    >
      <Image
        source={item.Img ? { uri: item.Img } : require("../img/logo.png")}
        style={styles.specialistImage}
      />
      <View style={styles.specialistInfo}>
        <Text
          style={[
            styles.specialistName,
            item.ID_Specialist === selectedSpecialistId && styles.selectedText,
          ]}
        >
          {item.First_Name} {item.Last_Name}
        </Text>
        <Text
          style={[
            styles.specialistAge,
            item.ID_Specialist === selectedSpecialistId && styles.selectedText,
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
        Please select your Specialist who will be your supervisor
      </Text>
      <FlatList
        data={specialists}
        renderItem={renderSpecialistItem}
        keyExtractor={(item) => item.ID_Specialist}
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
  headerText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 16,
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
  specialistAge: {
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
    alignSelf: "center",
  },
  nextButtonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SelectSpecialist;
