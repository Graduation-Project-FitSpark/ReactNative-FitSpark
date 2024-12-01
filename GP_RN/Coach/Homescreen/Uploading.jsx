import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import * as DocumentPicker from "expo-document-picker";
import axios from "axios";
import URL from "../../enum";

const Uploading = () => {
  const [trainList, setTrainList] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState("");
  const [videoFile, setVideoFile] = useState(null);

  useEffect(() => {
    const fetchTrains = async () => {
      try {
        const response = await axios.get(`${URL}/getTrains`);
        const trainNames = response.data.trains.map(
          (train) => train.Train_Name
        );
        setTrainList(trainNames);
      } catch (error) {
        console.error("Error fetching train list:", error);
      }
    };

    fetchTrains();
  }, []);

  const handleFilePicker = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({ multiple: false });

      setVideoFile(result);
    } catch (error) {
      console.error("Error picking file:", error);
    }
  };

  const handleSubmit = async () => {
    if (!selectedTrain) {
      Alert.alert("Validation Error", "Please select a train.");
      return;
    }
    if (!videoFile) {
      Alert.alert("Validation Error", "Please upload a video file.");
      return;
    }

    try {
      const fileUri = videoFile.assets[0].uri;
      const formData = new FormData();
      formData.append("video", {
        uri: fileUri,
        type: "video/mp4",
        name: `${videoFile.assets[0].name}.mp4`,
      });
      formData.append("trainName", selectedTrain);

      const response = await axios.post(`${URL}/uploadingVideo`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      Alert.alert("Success", "Video uploaded successfully!");
      console.log(response.data);
    } catch (error) {
      console.error("Error uploading video:", error);
      Alert.alert("Error", "Failed to upload video. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Upload Train Videos</Text>
      <View style={styles.card}>
        <Picker
          selectedValue={selectedTrain}
          onValueChange={(value) => setSelectedTrain(value)}
          style={styles.dropdown}
        >
          <Picker.Item label="Select a Train" value="" />
          {trainList.map((train, index) => (
            <Picker.Item key={index} label={train} value={train} />
          ))}
        </Picker>
        <TouchableOpacity style={styles.button} onPress={handleFilePicker}>
          <Text style={styles.buttonText}>Pick a Video File</Text>
        </TouchableOpacity>
        <Text style={styles.fileName}>
          {videoFile
            ? `Selected File: ${videoFile.assets[0].name}`
            : "No file selected"}
        </Text>
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Upload Video</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f4f8",
    padding: 20,
  },
  card: {
    width: "90%",
    maxWidth: 500,
    padding: 30,
    borderRadius: 20,
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 50,
    borderRadius: 8,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  heading: {
    fontSize: 26,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 30,
    color: "#333",
    letterSpacing: 5,
  },
  dropdown: {
    width: "100%",
    padding: 14,
    borderRadius: 60,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#f7f7f7",
    fontSize: 16,
    fontWeight: 700,
    color: "#333",
    marginBottom: 10,
  },
  fileName: {
    marginVertical: 10,
    fontSize: 16,
    color: "#555",
  },
});

export default Uploading;
