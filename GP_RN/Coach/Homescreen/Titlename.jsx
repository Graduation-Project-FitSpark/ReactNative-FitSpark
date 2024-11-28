import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";

function TitleName() {
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
      <Text>Good Morning Coach 🔥</Text>
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
