import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
/////////////////
function Chosseuser() {
  const navigation = useNavigation();
  return (
    <View style={styles.Chosseuser}>
      <Text style={styles.titleUsers}>Users Tables</Text>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("EditTrainees")}
      >
        <ImageBackground
          source={{
            uri: "https://images.hindustantimes.com/rf/image_size_630x354/HT/p2/2019/07/12/Pictures/_27cfe576-a4b3-11e9-88eb-6879d27b9db7.jpg",
          }}
          style={styles.backgroundImage}
        >
          <View style={styles.boxshwdo}>
            <Text style={styles.text}>Trainees Table</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("EditCoach")}
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
        onPress={() => navigation.navigate("EditSpecialist")}
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
  );
}

const styles = StyleSheet.create({
  Chosseuser: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    gap: 10,
    paddingTop: 30,
  },
  card: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
    maxHeight: "26%",
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
});

export default Chosseuser;
