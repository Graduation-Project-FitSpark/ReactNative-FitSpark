import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Title() {
  const [nameofuser, setnameofuser] = useState("");
  const currentHour = new Date().getHours();
  const greeting = currentHour < 12 ? "Good Morning" : "Good Evening";
  useEffect(() => {
    const fetchAdmin = async () => {
      try {
        let username = await AsyncStorage.getItem("username");
        setnameofuser(username);
      } catch (error) {
        console.error("Error With Coaches:", error);
      }
    };

    fetchAdmin();
  }, []);
  const userData = { name: nameofuser };
  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.welcome}>
      <Text>{greeting} Admin🔥</Text>
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

export default Title;
