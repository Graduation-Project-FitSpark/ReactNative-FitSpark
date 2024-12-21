import React, { useEffect, useState } from "react";

import {
  View,
  Text,
  TextInput,
  Alert,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import axios from "axios";
import URL from "../enum";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export default function Authentication({ route }) {
  const { Email } = route.params;
  const [verificationCode, setVerificationCode] = useState("");
  const [verificationCodeSended, setVerificationCodeSended] = useState("");
  const [Type, setType] = useState("");

  const navigation = useNavigation();
  useEffect(() => {
    sendVerificationCode();
  }, []);

  const sendVerificationCode = async () => {
    try {
      setType(await AsyncStorage.getItem("Type"));
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setVerificationCodeSended(code);
      console.log(Email);
      await axios.post(`${URL}/auth/sendingVC`, {
        Email: Email,
        code: code,
      });
      Alert.alert("Success", "Verification code sent!");
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to send verification code");
    }
  };

  const handleVerify = async () => {
    if (verificationCode === verificationCodeSended) {
      if (Type === "trainer") navigation.navigate("Menubar");
      else if (Type === "coach") {
        fetch(`${URL}/getCoachDetails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: await AsyncStorage.getItem("username"),
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            await AsyncStorage.setItem("ID", data.ID_Coach);
            console.log(data.AcceptedDescription);
            if (data.AcceptedDescription !== "P")
              navigation.navigate("Coachmanbur");
            else
              Alert.alert(
                "Error",
                "Sorry Sir, Your Account is not being Accepted by the Admin Yet!"
              );
          })
          .catch((err) => console.error(err));
      } else if (Type === "specialist") {
        fetch(`${URL}/getSpecialistDetails`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: await AsyncStorage.getItem("username"),
          }),
        })
          .then((res) => res.json())
          .then(async (data) => {
            await AsyncStorage.setItem("ID", data.ID_Specialist);
            if (data.AcceptedDescription !== "P")
              navigation.navigate("Specialistmanbur");
            else
              Alert.alert(
                "Error",
                "Sorry Sir, Your Account is not being Accepted by the Admin Yet!"
              );
          })
          .catch((err) => console.error(err));
      } else if (Type === "admin") {
        navigation.navigate("Adminmanbur");
      }
    } else {
      Alert.alert("Error", "Verification code is invalid!");
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ marginBottom: 10 }}>
        A code has been sent to {Email} for verification.
      </Text>

      <TextInput
        style={styles.input}
        placeholder="Enter verification code"
        value={verificationCode}
        onChangeText={setVerificationCode}
      />

      <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
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
});
