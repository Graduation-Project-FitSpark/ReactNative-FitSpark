import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconIonicons from "react-native-vector-icons/Ionicons";
////////
function Requestcoachspecialist() {
  const navigation = useNavigation();
  return (
    <View style={styles.Requestcoachspecialist}>
      <View style={styles.inertheader}>
        <IconIonicons
          name="chevron-back-outline"
          size={24}
          color="#000"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.textheader}>System statistics</Text>
      </View>
      <View style={styles.chosse}>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("Applicantscoach")}
        >
          <ImageBackground
            source={{
              uri: "https://media.istockphoto.com/id/675179390/photo/muscular-trainer-writing-on-clipboard.jpg?s=612x612&w=0&k=20&c=9NKx1AwVMpPY0YBlk5H-hxx2vJSCu1Wc78BKRM9wFq0=",
            }}
            style={styles.backgroundImage}
          >
            <View style={styles.boxshwdo}>
              <Text style={styles.text}>Coach Table</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.card}
          onPress={() => navigation.navigate("ApplicantsSpecialist")}
        >
          <ImageBackground
            source={{
              uri: "https://media.istockphoto.com/id/1044382612/photo/beautiful-smiling-nutritionist-looking-at-camera-and-showing-healthy-vegetables-in-the.jpg?s=612x612&w=0&k=20&c=2-C7hNt9QkxDc6g7YaCTmY1akX9gjwOO137EhnDceV0=",
            }}
            style={styles.backgroundImage}
          >
            <View style={styles.boxshwdo}>
              <Text style={styles.text}>Nutritionist Table</Text>
            </View>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Requestcoachspecialist: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    gap: 10,
    paddingTop: 30,
  },
  card: {
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    height: 200,
    marginVertical: 10,
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: "center",
  },
  boxshwdo: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  titleUsers: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
  chosse: {
    flex: 1,
    gap: 50,
    paddingTop: 50,
  },
  inertheader: {
    flexDirection: "row",
    gap: 20,
  },
  icon: {
    marginTop: 25,
  },
  textheader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
});

export default Requestcoachspecialist;
