import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

const CounterPage = ({ route }) => {
  const navigation = useNavigation();
  const { videolink, cal } = route.params;

  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("Video data in CounterPage:", videolink);

    const interval = setInterval(() => {
      setCount((prevCount) => (prevCount < 3 ? prevCount + 1 : 0));
    }, 1100);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (count === 3) {
      const timeout = setTimeout(() => {
        navigation.navigate("StartExercise", { videolink, cal });
      }, 1000);

      return () => clearTimeout(timeout);
    }
  }, [count, navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.counterText}>{count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#1a1a2e",
  },
  counterText: {
    color: "#fff",
    fontSize: 300,
  },
});

export default CounterPage;
