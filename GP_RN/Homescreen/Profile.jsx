import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../enum.js";

const Profile = ({ route, navigation }) => {
  const [trainerDetails, setTrainerDetails] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    fetchTrainerDetails();
  }, []);

  const fetchTrainerDetails = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      const response = await axios.post(`${URL}/getTrainerDetails`, {
        username,
      });
      if (response.status === 200) {
        const trainer = response.data.trainer;

        const editable = {
          Email: trainer.Email,
          Password: trainer.Password,
          First_Name: trainer.First_Name,
          Last_Name: trainer.Last_Name,
          Phone_Number: trainer.Phone_Number,
          Age: trainer.Age,
          Card_Number: trainer.Card_Number,
          Expression_Date: trainer.Expression_Date,
          CVC: trainer.CVC,
        };

        setTrainerDetails(trainer);
        setEditableFields(editable);

        const editingState = {};
        Object.keys(editable).forEach((key) => (editingState[key] = false));
        setIsEditing(editingState);
      }
    } catch (error) {
      console.error("Error fetching trainer details:", error);
      Alert.alert("Error", "Unable to fetch trainer details.");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEditing = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const updateTrainerDetails = async () => {
    const updatedFields = Object.keys(editableFields).reduce((acc, field) => {
      if (editableFields[field] !== trainerDetails[field]) {
        acc[field] = editableFields[field];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      Alert.alert("No Changes", "No fields have been updated.");
      return;
    }

    try {
      const response = await axios.post(`${URL}/updateTrainerDetails`, {
        trainerId: trainerDetails.ID_Trainer,
        ...updatedFields,
      });
      if (response.status === 200) {
        Alert.alert("Success", "Trainer details updated successfully.");
        fetchTrainerDetails();
      } else {
        Alert.alert("Error", "Failed to update trainer details.");
      }
    } catch (error) {
      console.error("Error updating trainer details:", error);
      Alert.alert("Error", "Unable to update trainer details.");
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {Object.keys(editableFields).map((field) => (
        <View key={field} style={styles.fieldContainer}>
          <Text style={styles.label}>{field.replace(/_/g, " ")}</Text>
          <TextInput
            style={[
              styles.input,
              isEditing[field] ? styles.editableInput : styles.disabledInput,
            ]}
            value={editableFields[field]?.toString() || ""}
            editable={isEditing[field]}
            onChangeText={(value) => handleFieldChange(field, value)}
          />
          <Button
            title={isEditing[field] ? "Save" : "Change"}
            onPress={() => toggleEditing(field)}
            color="#99E895"
          />
        </View>
      ))}
      <Button title="Update" onPress={updateTrainerDetails} color="#4CAF50" />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
    color: "#1c1b29",
    textTransform: "uppercase",
    letterSpacing: 2,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 18,
    marginBottom: 8,
    fontWeight: "600",
    color: "#333",
    textShadowRadius: 1,
    letterSpacing: 1.2,
  },
  input: {
    height: 45,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#000",
  },
  editableInput: {
    borderColor: "#1c1b29",
    backgroundColor: "#1c1b29",
    color: "#fff",
  },
  disabledInput: {
    borderColor: "#ddd",
    backgroundColor: "#f0f0f0",
    color: "#000",
  },
  button: {
    marginTop: 10,
    backgroundColor: "#1c1b29",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 90,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  updateButton: {
    backgroundColor: "#4CAF50",
    height: 60,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 90,
    alignItems: "center",
    marginTop: 20,
  },
});

export default Profile;
