import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  Alert,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import Slider from "@react-native-community/slider";
import { Picker } from "@react-native-picker/picker";
import URL from "../enum";
import staystrong from "../img/StayStrong.png";
import * as ImagePicker from "expo-image-picker";
import { manipulateAsync } from "expo-image-manipulator";
import MapView, { Marker } from "react-native-maps";
import * as FirebaseMessaging from "expo-firebase-messaging";

const SignUp = ({ navigation }) => {
  const [step, setStep] = useState(1);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [type, setType] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [age, setAge] = useState("");
  const [location, setLocation] = useState({
    latitude: 37.78825,
    longitude: -122.4324,
  });
  const [isSelected, setIsSelected] = useState(false);

  const [yearsOfExperience, setYearsOfExperience] = useState("");
  const [gender, setGender] = useState("");
  const [cvc, setCvc] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expirationDate, setExpressionDate] = useState("");
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [classType, setClassType] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [activityLevelNumber, setActivityLevelNumber] = useState(0);

  const activityLabels = ["Normal", "Fat", "Very Fat"];
  const [image, setImage] = useState("");
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);

  const pickImage = async () => {
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

  const uploadImage = async (imageBase64, username) => {
    try {
      const response = await fetch(`${URL}/uploadProfileImgRouter`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          img: imageBase64,
          username: username,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Image uploaded successfully:", data);
      } else {
        console.error("Error uploading image:", data.error);
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleNextStep = async () => {
    if (step === 1) {
      if (!username || !password || !confirmPassword || !type) {
        Alert.alert("Error", "All fields are required");
        return;
      }
      if (password !== confirmPassword) {
        Alert.alert("Error", "Passwords do not match");
        return;
      }

      try {
        const response = await fetch(`${URL}/ifUserExsistsRouter`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username }),
        });
        const data = await response.json();
        console.log(data.message);
        if (data.message === "T") {
          Alert.alert(
            "Error",
            "Username already exists, please choose another"
          );
          return;
        } else {
          setStep(step + 1);
        }
      } catch (error) {
        console.error("Error checking username:", error);
        Alert.alert("Error", "Something went wrong");
      }
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const newLocation = `[${location.latitude},${location.longitude}]`;

    const commonData = {
      Username: username,
      Email: email,
      Password: password,
      First_Name: firstName,
      Last_Name: lastName,
      Phone_Number: phoneNumber,
      Age: age,
      Location: newLocation,
      Gender: gender,
      Card_Number: cardNumber,
      Expression_Date: expirationDate,
      CVC: cvc,
    };

    let additionalData = {};
    let endpoint = "";

    if (type === "Trainer") {
      if (activityLevelNumber == 0) {
        setActivityLevel("Normal");
      } else if (activityLevelNumber == 1) {
        setActivityLevel("Fat");
      } else {
        setActivityLevel("Very Fat");
      }

      additionalData = {
        Weight: weight,
        Height: height,
        Class_Type: classType,
        Activity_Level: activityLevel,
        Image: image,
      };
      console.log(location);

      endpoint = `${URL}/signUpTrainer`;
    } else if (type === "Coach") {
      additionalData = {
        YearsOfExperience: yearsOfExperience,
      };
      endpoint = `${URL}/signUpCoach`;
    } else if (type === "Specialist") {
      additionalData = {
        YearsOfExperience: yearsOfExperience,
      };
      endpoint = `${URL}/signUpSpecialist`;
    }
    const finalData = {
      ...commonData,
      ...additionalData,
      role: type,
      Points: 0,
    };

    console.log("Submitting Data: ", activityLevel);

    fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(finalData),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.message.includes("added")) {
          Alert.alert("Success", "Registration successful");
          navigation.navigate("SignIn");
        } else {
          Alert.alert("Error", data.message);
        }
      })
      .catch((error) => {
        console.error("Error registering:", error);
        Alert.alert("Error", "Something went wrong during registration");
      });
    await uploadImage(image, username);
    try {
      const token = await FirebaseMessaging.getExpoPushTokenAsync();
      console.log("FCM Token:", token);
      const response = await fetch(`${URL}/uploadToken`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token,
          username: username,
          type: type.toLowerCase(),
        }),
      });
    } catch (error) {
      console.error("Error getting token:", error);
    }
  };

  const renderStep1 = () => (
    <View>
      <View style={styles.ribbonContainer}>
        <View style={styles.ribbon}>
          <Text style={styles.titleStyle}>Stay Strong, Stay Fit</Text>
          <Image style={styles.tinyLogo} source={staystrong} />
          <Text style={styles.signatureStyle}> Your Fitness Journey </Text>
        </View>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        secureTextEntry
        value={confirmPassword}
        onChangeText={setConfirmPassword}
      />

      <Text style={styles.label}>Select Type</Text>
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue)}
      >
        <Picker.Item label="Trainer" value="Trainer" />
        <Picker.Item label="Coach" value="Coach" />
        <Picker.Item label="Specialist" value="Specialist" />
      </Picker>
      <TouchableOpacity style={styles.button} onPress={handleNextStep}>
        <Text style={styles.buttonText}>Next</Text>
      </TouchableOpacity>
    </View>
  );

  const renderStep2 = () => {
    const handleMapPress = (e) => {
      const newLocation = {
        latitude: e.nativeEvent.coordinate.latitude,
        longitude: e.nativeEvent.coordinate.longitude,
      };

      setLocation(newLocation);
      setIsSelected(true);
    };

    if (type === "Trainer" || type === "Coach" || type === "Specialist") {
      return (
        <View>
          <View style={styles.ribbonContainer}>
            <View style={styles.ribbon}>
              <Text style={styles.titleStyle}>Stay Strong, Stay Fit</Text>
              <Image style={styles.tinyLogo} source={staystrong} />
              <Text style={styles.signatureStyle}> Your Fitness Journey </Text>
            </View>
          </View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            value={firstName}
            onChangeText={setFirstName}
          />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            value={lastName}
            onChangeText={setLastName}
          />
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
          />
          <TextInput
            style={styles.input}
            placeholder="Age"
            value={age}
            onChangeText={setAge}
            keyboardType="numeric"
          />
          <Text style={styles.label}>Map On Your Location</Text>
          <MapView
            style={{ height: 300 }}
            onPress={handleMapPress}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {isSelected && <Marker coordinate={location} />}
          </MapView>
          <Text style={styles.label}>Select Gender</Text>
          <Picker
            selectedValue={gender}
            onValueChange={(itemValue) => setGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="Male" />
            <Picker.Item label="Female" value="Female" />
          </Picker>
          {type === "Coach" && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Years of Experience"
                value={yearsOfExperience}
                onChangeText={setYearsOfExperience}
                keyboardType="numeric"
              />
            </>
          )}

          {type === "Specialist" && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Years of Experience"
                value={yearsOfExperience}
                onChangeText={setYearsOfExperience}
                keyboardType="numeric"
              />
            </>
          )}
          <TextInput
            style={styles.input}
            placeholder="Credit Card Number"
            value={cardNumber}
            onChangeText={setCardNumber}
          />

          <TextInput
            style={styles.input}
            placeholder="CVC"
            value={cvc}
            onChangeText={setCvc}
          />

          <TextInput
            style={styles.input}
            placeholder="Date YYYY-MM-DD"
            value={expirationDate}
            onChangeText={setExpressionDate}
          />
          {type === "Trainer" && (
            <>
              <TextInput
                style={styles.input}
                placeholder="Weight"
                value={weight}
                onChangeText={setWeight}
                keyboardType="numeric"
              />
              <TextInput
                style={styles.input}
                placeholder="Height"
                value={height}
                onChangeText={setHeight}
                keyboardType="numeric"
              />
              <Text style={styles.label}>Select Class Type</Text>
              <Picker
                selectedValue={classType}
                onValueChange={(itemValue) => setClassType(itemValue)}
                style={styles.picker}
              >
                <Picker.Item label="Cardio" value="Cardio" />
                <Picker.Item label="Strength" value="Strength" />
              </Picker>
              <Text style={styles.label}>Select Activity Level</Text>
              <View style={styles.container}>
                <Text style={styles.label}>
                  Activity Level: {activityLabels[activityLevelNumber]}
                </Text>
                <Slider
                  style={styles.slider}
                  minimumValue={0}
                  maximumValue={2}
                  step={1}
                  value={activityLevelNumber}
                  onValueChange={(value) => {
                    setActivityLevelNumber(value);
                    setActivityLevel(activityLabels[value]);
                  }}
                  minimumTrackTintColor="#1c1b29"
                  maximumTrackTintColor="#1c1b29"
                  thumbTintColor="#1c1b29"
                />
              </View>
            </>
          )}

          <View style={styles.imageUploadContainer}>
            <Text style={styles.label}>Upload Profile Image</Text>
            <TouchableOpacity
              style={styles.imageUploadButton}
              onPress={pickImage}
            >
              <Text style={styles.imageUploadButtonText}>Upload Image</Text>
            </TouchableOpacity>
            {image && (
              <Image
                source={{ uri: uploadedImageUrl }}
                style={styles.profileImage}
              />
            )}
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleNextStep}
          >
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {step === 1 ? renderStep1() : renderStep2()}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  slider: {
    width: 300,
    height: 70,
    color: "#fff",
  },
  imageUploadContainer: {
    alignItems: "left",
    marginVertical: 10,
  },
  imageUploadButton: {
    backgroundColor: "#1c1b29",
    padding: 10,
    borderRadius: 15,
    marginBottom: 10,
    marginTop: 10,
  },
  imageUploadButtonText: {
    color: "#fff",
    textAlign: "center",
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 10,
  },

  submitButton: {
    backgroundColor: "#1c1b29",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 50,
  },
  submitButtonText: {
    color: "white",
  },
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#1c1b29",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  inputName: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "50%",
    alignSelf: "center",
  },
  divFirstLastName: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    alignSelf: "center",
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 10,
  },
  ribbonContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -20,
    padding: 20,
  },
  ribbon: {
    backgroundColor: "#1c1b29",
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
    maxWidth: "90%",
  },
  titleStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
  },
  bodyStyle: {
    fontSize: 15,
    color: "#fff",
    textAlign: "center",
    marginBottom: 15,
    lineHeight: 25,
  },
  signatureStyle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginTop: 15,
  },
  tinyLogo: {
    width: 180,
    height: 120,
    alignSelf: "center",

    borderColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
});

export default SignUp;
