import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
function Competitions({ navigation }) {
  const [Competitionsdata, setCompetitionsdata] = useState([
    {
      name: "National Weightlifting Championship",
      applicationMonth: "January",
      image:
        "https://upload.wikimedia.org/wikipedia/commons/1/1f/USMC-Rich_Froning_Jr.jpg",
    },
    {
      name: "Regional Powerlifting Meet",
      applicationMonth: "March",
      image:
        "https://media.gettyimages.com/photos/powerlifting-competition-picture-id1234567891",
    },
    {
      name: "International Weightlifting Open",
      applicationMonth: "June",
      image:
        "https://media.gettyimages.com/photos/international-weightlifting-open-picture-id1234567892",
    },
    {
      name: "City Weightlifting Cup",
      applicationMonth: "September",
      image:
        "https://media.gettyimages.com/photos/city-weightlifting-cup-picture-id1234567893",
    },
    {
      name: "State Weightlifting Finals",
      applicationMonth: "November",
      image:
        "https://media.gettyimages.com/photos/state-weightlifting-finals-picture-id1234567894",
    },
  ]);

  return (
    <ScrollView style={styles.containerouterCompe}>
      <View style={styles.Compe}>
        <View style={styles.containerinerCompe}>
          <TouchableOpacity
            style={styles.backicon}
            onPress={() => navigation.goBack()}
          >
            <IconIonicons name="chevron-back-outline" size={20} color="#000" />
          </TouchableOpacity>
          <Text style={styles.header}>World Weightlifting Competitions</Text>
        </View>

        {Competitionsdata.map((item, index) => {
          return (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() =>
                navigation.navigate("CompetitionDetails", { item })
              }
            >
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.details}>
                <Text style={styles.name}>Name: {item.name}</Text>
                <Text style={styles.submission}>
                  Submission: {item.applicationMonth}
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  containerouterCompe: {
    flex: 1,

    backgroundColor: "#fff",
    paddingTop: 40,
    width: "100%",
  },
  Compe: {
    width: "100%",
    alignItems: "center",
  },
  backicon: {
    marginTop: 4,
  },
  containerinerCompe: {
    flexDirection: "row",
    gap: 30,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
    borderRadius: 8,
    marginBottom: 16,
    padding: 8,
    elevation: 2,
    width: "90%",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 16,
  },
  details: {
    flex: 1,
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
  },
  submission: {
    fontSize: 14,
    color: "#666",
  },
});

export default Competitions;
