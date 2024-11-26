import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import qizeimg from "../../img/quizeimg.jpg";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
function Requests() {
  const navigation = useNavigation();
  return (
    <View style={styles.containerRequests}>
      <View style={styles.containerRequestsInner}>
        <ImageBackground
          source={qizeimg}
          resizeMode="cover"
          style={styles.image}
        >
          <View style={styles.textcontainerouter}>
            <View style={styles.textcontainer}>
              <Text style={styles.titleText}>Training Requests</Text>
            </View>
            <View style={styles.containerbuttonText}>
              <View style={styles.fackecontener}></View>
              <View style={styles.buttoncontainer}>
                <TouchableOpacity
                  style={styles.buttonText}
                  onPress={() => navigation.navigate("Requesttraining")}
                >
                  <IconIonicons
                    name="chevron-forward-outline"
                    size={25}
                    color="#1c1b29"
                  />
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
    height: 100,
    justifyContent: "center",
  },
  containerRequests: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    justifyContent: "flex-start",
    maxHeight: 120,
  },
  textcontainerouter: {
    flexDirection: "row",
    width: "100%",
    height: "100%",
  },
  fackecontener: {
    width: "73%",
  },
  buttoncontainer: {
    width: "30%",
    justifyContent: "flex-end",
  },
  containerbuttonText: {
    width: "40%",
    flexDirection: "row",
  },
  containerRequestsInner: {
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

export default Requests;
