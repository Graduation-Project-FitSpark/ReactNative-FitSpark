import React, { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  View,
  TextInput,
  Text,
  Button,
  TouchableOpacity,
  Image,
} from "react-native";
import URL from "../enum";
import { signInStyles } from "./stylessignin";
import logo from "../img/logo.png";

const SignIn = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const handleSignIn = async () => {
    try {
      console.log("Attempting to connect to the server...");
      const response = await fetch(`${URL}/searchForUser`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      console.log("Response status:", response.status);

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Response Error:", errorText);
        Alert.alert("Error", errorText);
        return;
      }

      const data = await response.json();
      if (data.message) {
        const { Email } = data.user;
        await AsyncStorage.setItem("username", username);
        await AsyncStorage.setItem("Email", Email);

        navigation.navigate("Authentication", {
          username: username,
          Email: Email,
        });
      } else {
        Alert.alert("Warning", "Username or password is wrong");
      }
    } catch (error) {
      console.error("Fetch Error:", error);
      Alert.alert("Error", "Something went wrong");
    }
  };
  return (
    <View style={signInStyles.container}>
      <View style={signInStyles.topSection}>
        <Image style={signInStyles.tinyLogo} source={logo} />
      </View>

      <View style={signInStyles.mainContent}>
        <Text style={signInStyles.title}>Login</Text>
        <TextInput
          style={signInStyles.input}
          placeholder="Username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={signInStyles.input}
          placeholder="Password"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={signInStyles.button} onPress={handleSignIn}>
          <Text style={signInStyles.buttonText}>Login</Text>
        </TouchableOpacity>
        <View style={signInStyles.buttonView}>
          <Text style={signInStyles.footerText}>Don't have any account?</Text>
          <TouchableOpacity
            style={signInStyles.button1}
            onPress={() => navigation.navigate("SignUp")}
          >
            <Text style={signInStyles.buttonText1}>SignUp</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default SignIn;
