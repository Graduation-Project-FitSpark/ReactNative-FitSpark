import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

function TitleName() {
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning Coach 🔥" : "Good Evening Coach 🔥";
  useEffect(() => {
    const fetchUsername = async () => {
      try {
        const storedName = await AsyncStorage.getItem("username");
        setnameofuser(storedName);
      } catch (err) {
        console.error("Error accessing AsyncStorage:", err);
      }
    };

    fetchUsername();
  }, []);
  const [nameofuser, setnameofuser] = useState("Mahmoud ");

  const userData = { name: nameofuser };
  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.welcome}>
      <Text>{greeting}</Text>
      <View style={styles.namedate}>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.date}>{date}</Text>
      </View>
    </View>
  );
}

export const styles = StyleSheet.create({
  welcome: {
    marginTop: 20,

    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  namedate: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    marginTop: 4,
  },
});

export default TitleName;
