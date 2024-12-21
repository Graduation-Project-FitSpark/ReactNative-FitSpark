import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  Alert,
  StyleSheet,
  Modal,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import URL from "../../enum";
import { manipulateAsync } from "expo-image-manipulator";

function AddAwardsModel({ modalVisible, setModalVisible, iteam }) {
  const [imageUri, setImageUri] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handleImageUpload = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission is required to access photos.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.5,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setUploadedImageUrl(selectedImageUri);
      const manipResult = await manipulateAsync(selectedImageUri, [
        { resize: { width: 300, height: 300 } },
      ]);
      const imageBase64 = await fetch(manipResult.uri)
        .then((res) => res.blob())
        .then((blob) => blobToBase64(blob));
      setImageUri(imageBase64);
      console.log(imageBase64);
    }
  };
  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  const handleSubmit = async () => {
    if (!name || !number || !imageUri) {
      Alert.alert("Please fill all fields");
      return;
    }

    try {
      // Create the payload as a JSON object
      const payload = {
        point: number,
        name: name,
        img: imageUri, // If you want to send the image URI as a string
      };

      // Send data as JSON
      const response = await axios.post(
        `${URL}/insertPointAward`,
        JSON.stringify(payload),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      Alert.alert("Award inserted successfully!");
    } catch (error) {
      console.error(
        "Error inserting award:",
        error.response?.data || error.message
      );
      Alert.alert("Failed to insert award. Please try again.");
    }
  };

  const handleCancel = () => {
    setModalVisible(false);
    setName("");
    setNumber("");
    setImageUri(null);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.overlay}>
        <View style={styles.container}>
          <View style={styles.imageUpload}>
            <TouchableOpacity onPress={handleImageUpload} style={styles.button}>
              <Text style={styles.buttonText}>Upload Image</Text>
            </TouchableOpacity>
            {uploadedImageUrl && (
              <Image source={{ uri: uploadedImageUrl }} style={styles.image} />
            )}
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Name:</Text>
            <TextInput
              style={styles.input}
              value={name}
              onChangeText={setName}
              placeholder="Enter your name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.label}>Number:</Text>
            <TextInput
              style={styles.input}
              value={number}
              onChangeText={setNumber}
              keyboardType="numeric"
              placeholder="Enter a number"
            />
          </View>

          <View style={styles.buttonsContainer}>
            <TouchableOpacity
              onPress={handleCancel}
              style={[styles.button, styles.cancelButton]}
            >
              <Text style={styles.buttonTextCancel}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handleSubmit}
              style={[styles.button, styles.submitButton]}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(28, 27, 41, 0.7)",
  },
  container: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  imageUpload: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 200,
    height: 200,
    marginTop: 10,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 20,
    width: "100%",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#1c1b29",
  },
  input: {
    height: 40,
    borderColor: "#1c1b29",
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 8,
    marginBottom: 10,
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 80,
    marginTop: 10,
  },
  button: {
    backgroundColor: "#b2f200",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  cancelButton: {
    backgroundColor: "#749DE1",
  },
  submitButton: {
    backgroundColor: "#b2f200",
  },
  buttonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  buttonTextCancel: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddAwardsModel;
