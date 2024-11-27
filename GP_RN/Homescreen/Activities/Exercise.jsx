import React from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

function Exercise({ route }) {
  const navigation = useNavigation();
  const { id, name, description, goal, progress, imageUrl, videolink, cal } =
    route.params;

  return (
    <View style={styles.outer}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.toptitle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconIonicons name="chevron-back-outline" size={25} color="#000" />
          </TouchableOpacity>
          <View style={styles.toptitlenameContainer}>
            <Text style={styles.toptitlename}>Workout</Text>
          </View>
        </View>
        <View style={styles.rootcontnervideo}>
          <View>
            <View style={styles.videocontner}>
              <Image
                source={{
                  uri: imageUrl,
                }}
                style={styles.image}
              />
              <View style={styles.Detail}>
                <View style={styles.Detailiner}>
                  <View style={styles.iconback}>
                    <IconIonicons
                      name="time-outline"
                      size={25}
                      color="#000000"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.labelText}>Time</Text>
                    <Text style={styles.valueText}>{progress} min</Text>
                  </View>
                </View>
                <View style={styles.line} />
                <View style={styles.Detailiner}>
                  <View style={styles.iconback}>
                    <IconIonicons
                      name="flame-outline"
                      size={25}
                      color="#000000"
                    />
                  </View>
                  <View style={styles.textContainer}>
                    <Text style={styles.labelText}>Burn</Text>
                    <Text style={styles.valueText}>{cal * goal} kcal</Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          <View style={styles.cardBackground}>
            <Text style={styles.headingText}>{name}</Text>
            <Text style={styles.bodyText}>{description}</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <IconIonicons name="musical-notes-outline" size={24} color="#ffffff" />
        <TouchableOpacity
          style={styles.startButton}
          onPress={() =>
            navigation.navigate("Counttostart", { videolink, cal })
          }
        >
          <Text style={styles.startText}>Start</Text>
        </TouchableOpacity>

        <IconIonicons name="heart-outline" size={24} color="#ffffff" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 30,
    backgroundColor: "#FFF",
    height: "100%",
    padding: 10,
  },
  rootcontnervideo: {
    paddingTop: 30,
  },
  toptitle: {
    flexDirection: "row",
    width: "100%",

    alignItems: "center",
  },
  toptitlenameContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  toptitlename: {
    fontSize: 20,
    color: "#000",
  },
  image: {
    width: 350,
    height: 250,
    resizeMode: "cover",
    borderRadius: 20,

    borderWidth: 1,
  },
  videocontner: {
    alignItems: "center",
  },
  Detail: {
    bottom: 30,
    width: "75%",
    height: "20%",
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 0.5,
  },
  Detailiner: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconback: {
    backgroundColor: "#BBF246",
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    width: 40,
    height: 40,
    marginRight: 10,
  },
  textContainer: {
    flexDirection: "column",
  },
  labelText: {
    color: "#FFFFFF",
    fontSize: 12,
    fontWeight: "bold",
  },
  valueText: {
    color: "#BBF246",
    fontSize: 16,
    fontWeight: "bold",
  },
  line: {
    width: 2,
    height: "80%",
    backgroundColor: "#B0B0B0",
    alignSelf: "center",
    opacity: 0.6,
    marginVertical: 10,
  },
  cardBackground: {
    padding: 16,
    borderRadius: 8,
    marginTop: -60,
  },
  headingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 8,
  },
  bodyText: {
    fontSize: 16,
    color: "#000",
    lineHeight: 24,
  },
  footer: {
    height: 90,
    position: "absolute",
    bottom: 0,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    padding: 20,
    backgroundColor: "#1a1a2e",
    zIndex: 10,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  startButton: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#BBF246",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 10,
    bottom: 15,
  },
  startText: {
    color: "#000000",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Exercise;
