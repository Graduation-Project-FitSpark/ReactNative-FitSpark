import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import qizeimg from "../img/sectionimg.jpg";
import { useNavigation } from "@react-navigation/native";
const Section = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.qizeouterView}>
      <ImageBackground source={qizeimg} resizeMode="cover" style={styles.image}>
        <View style={styles.qizeinerView}>
          <Text style={styles.titleText}>Start your day</Text>
          <Text style={styles.subtitleText}>
            Start daily with exercise and healthy eating 💪
          </Text>
        </View>
        <TouchableOpacity
          style={styles.buttonContainer}
          onPress={() => navigation.navigate("Workout")}
        >
          <Text style={styles.playIcon}>▶</Text>
        </TouchableOpacity>
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

    height: 120,
    margin: 10,

    marginBottom: 90,
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
});

export default Section;
