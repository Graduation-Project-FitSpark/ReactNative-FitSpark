import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  Alert,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";
import URL from "../../../enum";
import axios from "axios";

const AddItems = () => {
  const [saleName, setSaleName] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [description, setDescription] = useState("");
  const [productName, setProductName] = useState("");
  const [size, setSize] = useState("");
  const [image, setImage] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      Alert.alert(
        "Permission Denied",
        "Permission is required to access photos."
      );
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

      setImage(imageBase64);
    }
  };

  const blobToBase64 = (blob) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });

  const handleAddItem = async () => {
    if (
      !saleName ||
      !price ||
      !quantity ||
      !description ||
      !productName ||
      !size ||
      !image
    ) {
      Alert.alert(
        "Missing Fields",
        "Please fill in all the fields and upload an image."
      );
      return;
    }

    try {
      const payload = {
        Salee_Name: saleName,
        Price: price,
        Quantity: quantity,
        Description: description,
        Product_Name: productName,
        Size: size,
        Img: image,
      };
      const response = await axios.post(`${URL}/insertNewProduct`, payload);

      if (response.status === 200) {
        Alert.alert("Success", response.data.message);
      } else {
        Alert.alert("Error", "Failed to add the product.");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      Alert.alert("Error", "An error occurred while adding the product.");
    }
  };

  const convertImageToBase64 = async (imageUri) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onloadend = () => {
        resolve(fileReader.result.split(",")[1]);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fetch(imageUri)
        .then((response) => response.blob())
        .then((blob) => fileReader.readAsDataURL(blob))
        .catch((error) => reject(error));
    });
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>ADD NEW PRODUCT</Text>

      <Text style={styles.label}>Sale Name</Text>
      <TextInput
        style={styles.inputGreen}
        placeholder="Enter sale name"
        value={saleName}
        onChangeText={setSaleName}
      />

      <Text style={styles.label}>Price</Text>
      <TextInput
        style={styles.inputWhite}
        placeholder="Enter price"
        value={price}
        keyboardType="numeric"
        onChangeText={setPrice}
      />

      <Text style={styles.label}>Quantity</Text>
      <TextInput
        style={styles.inputGreen}
        placeholder="Enter quantity"
        value={quantity}
        keyboardType="numeric"
        onChangeText={setQuantity}
      />

      <Text style={styles.label}>Description</Text>
      <TextInput
        style={styles.textAreaWhite}
        placeholder="Enter description"
        value={description}
        onChangeText={setDescription}
        multiline
      />

      <Text style={styles.label}>Product Name</Text>
      <TextInput
        style={styles.inputGreen}
        placeholder="Enter product name"
        value={productName}
        onChangeText={setProductName}
      />

      <Text style={styles.label}>Size</Text>
      <TextInput
        style={styles.inputWhite}
        placeholder="Enter size (e.g., Small, Medium, Large)"
        value={size}
        onChangeText={setSize}
      />

      <Text style={styles.label}>Product Image</Text>
      {uploadedImageUrl ? (
        <Image source={{ uri: uploadedImageUrl }} style={styles.imagePreview} />
      ) : (
        <TouchableOpacity style={styles.imagePlaceholder} onPress={pickImage}>
          <Text style={styles.imagePlaceholderText}>Pick an Image</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity style={styles.addButton} onPress={handleAddItem}>
        <Text style={styles.addButtonText}>Add Product</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 40,
    textAlign: "center",
    letterSpacing: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
    marginTop: 10,
  },
  inputGreen: {
    height: 40,
    borderWidth: 1,
    borderColor: "#006400",
    borderRadius: 50,
    padding: 10,
    marginBottom: 10,
    fontWeight: "bold",
  },
  inputWhite: {
    height: 40,
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    fontWeight: "bold",
  },
  textAreaWhite: {
    height: 80,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    backgroundColor: "#fff",
    marginBottom: 10,
    textAlignVertical: "top",
    fontWeight: "bold",
  },
  imagePlaceholder: {
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    backgroundColor: "#eaeaea",
    marginBottom: 10,
  },
  imagePlaceholderText: {
    color: "#333",
    fontSize: 14,
    fontWeight: "bold",
  },
  imagePreview: {
    height: 150,
    borderRadius: 5,
    marginBottom: 10,
    resizeMode: "cover",
  },
  addButton: {
    backgroundColor: "#006400",
    padding: 15,
    borderRadius: 55,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 30,
  },
  addButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AddItems;
