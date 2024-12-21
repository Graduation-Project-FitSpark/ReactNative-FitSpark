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
import URL from "../../enum";

const ProfileAdmin = ({ route, navigation }) => {
  const [adminDetails, setadminDetails] = useState({});
  const [editableFields, setEditableFields] = useState({});
  const [isEditing, setIsEditing] = useState({});

  useEffect(() => {
    fetchTrainerDetails();
  }, []);

  const fetchTrainerDetails = async () => {
    try {
      const username = await AsyncStorage.getItem("username");
      const response = await axios.get(`${URL}/getAdminDetails`);
      if (response.status === 200) {
        const admin = response.data;
        console.log(admin);
        const editable = {
          Email: admin.Email,
          Password: admin.Password,
          First_Name: admin.First_Name,
          Last_Name: admin.Last_Name,
          Phone_Number: admin.Phone_Number,
          Age: admin.Age,
        };

        setadminDetails(admin);
        setEditableFields(editable);

        const editingState = {};
        Object.keys(editable).forEach((key) => (editingState[key] = false));
        setIsEditing(editingState);
      }
    } catch (error) {
      console.error("Error fetching admin details:", error);
      Alert.alert("Error", "Unable to fetch admin details.");
    }
  };

  const handleFieldChange = (field, value) => {
    setEditableFields((prev) => ({ ...prev, [field]: value }));
  };

  const toggleEditing = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const updateadminDetails = async () => {
    const updatedFields = Object.keys(editableFields).reduce((acc, field) => {
      if (editableFields[field] !== adminDetails[field]) {
        acc[field] = editableFields[field];
      }
      return acc;
    }, {});

    if (Object.keys(updatedFields).length === 0) {
      Alert.alert("No Changes", "No fields have been updated.");
      return;
    }

    try {
      const response = await axios.post(`${URL}/updateadminDetails`, {
        ...updatedFields,
      });
      if (response.status === 200) {
        Alert.alert("Success", "admin details updated successfully.");
        fetchTrainerDetails();
      } else {
        Alert.alert("Error", "Failed to update admin details.");
      }
    } catch (error) {
      console.error("Error updating admin details:", error);
      Alert.alert("Error", "Unable to update admin details.");
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
            color="#1c1b29"
          />
        </View>
      ))}
      <Button title="Update" onPress={updateadminDetails} color="#4CAF50" />
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

export default ProfileAdmin;
