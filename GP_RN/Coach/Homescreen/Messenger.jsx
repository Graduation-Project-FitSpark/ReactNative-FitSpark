import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import massenger from "../../img/messenger.jpg";
import IconIonicons from "react-native-vector-icons/Ionicons";
function Messenger() {
  return (
    <View style={styles.containerMessenger}>
      <View style={styles.containerMessengerInner}>
        <ImageBackground
          source={massenger}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.textcontainerouter}>
            <View style={styles.textcontainer}>
              <Text style={styles.titleText}>Messenger</Text>
            </View>
            <View style={styles.containerbuttonText}>
              <View style={styles.fackecontener}></View>
              <View style={styles.buttoncontainer}>
                <TouchableOpacity style={styles.buttonText}>
                  <Text style={styles.textStart}>Start</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ImageBackground>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    borderRadius: 20,
    overflow: "hidden",
    height: 200,
    justifyContent: "center",
  },
  containerMessenger: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "flex-start",
  },
  textcontainerouter: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  textStart: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1c1b29",
  },
  fackecontener: {
    width: "50%",
  },
  buttoncontainer: {
    width: "50%",
    justifyContent: "flex-end",
  },
  containerbuttonText: {
    width: "40%",
    flexDirection: "row",
    marginRight: -5,
  },
  containerMessengerInner: {
    width: "90%",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  textcontainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    width: "60%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 10,
    maxHeight: "100%",
  },
  titleText: {
    fontSize: 20,
    color: "#ffffff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 18,
    color: "#ffffff",
    backgroundColor: "#b2f200",
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 10,
    overflow: "hidden",
  },
});
export default Messenger;
