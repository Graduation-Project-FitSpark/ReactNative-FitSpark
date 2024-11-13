import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import qizeimg from "../img/walking.webp";
import { useNavigation } from "@react-navigation/native";
const Inoutwalking = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.qizeouterView}>
      <ImageBackground source={qizeimg} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <View style={styles.header}>
            <Text style={styles.icons}>⚡⚡⚡</Text>
            <TouchableOpacity
              style={styles.startButton}
              onPress={() => navigation.navigate("SignIn")} // هون بدل السابن ان حط تاعت  صفحة المشي
            >
              <Text style={styles.startText}>Start</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.title}>Endurance improvement program</Text>
          <Text style={styles.details}>10km • 3548kcal • 120min</Text>
        </View>
      </ImageBackground>
    </View>
  );
};
const styles = StyleSheet.create({
  image: {
    borderRadius: 20,

    overflow: "hidden",
    flex: 1,
    justifyContent: "center",
  },
  qizeouterView: {
    borderRadius: 15,

    height: 100,
    margin: 10,
  },
  qizeinerView: {
    paddingLeft: 10,
    padding: 5,
    width: "50%",
    justifyContent: "space-between",
    height: "100%",
    paddingBottom: 20,
    paddingTop: 10,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
    borderRadius: 10,
  },
  titleText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  subtitleText: {
    fontSize: 16,
    color: "white",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#9fff00",
    justifyContent: "center",
    alignItems: "center",
    paddingBottom: 5,
    paddingLeft: 5,
  },
  playIcon: {
    fontSize: 30,
    color: "#fff",
  },
  overlay: {
    width: "100%",
    padding: 10,
    borderRadius: 10,
    backgroundColor: "rgba(0, 0, 0, 0.4)",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icons: {
    color: "white",
    fontSize: 16,
  },
  startButton: {
    height: 30,
    backgroundColor: "red",
    borderRadius: 20,
    paddingVertical: 5,
    paddingHorizontal: 10,
  },
  startText: {
    color: "white",
    fontWeight: "bold",
  },
  title: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    marginTop: 10,
  },
  details: {
    color: "white",
    fontSize: 14,
    marginTop: 5,
  },
});

export default Inoutwalking;
