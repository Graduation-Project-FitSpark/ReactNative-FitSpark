import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Model from "./Modelchart.jsx";
import LocationsMap from "../homescreen/LocationsMap.jsx";
import URL from "../../enum.js";
import axios from "axios";
function AllUserstatistics() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sale, setsale] = useState();
  const [totleWatchedVideos, settotleWatchedVideos] = useState();
  const [maxpointcoach, setmaxpointcoach] = useState();
  const [maxpointSpecialist, setmaxpointSpecialist] = useState();
  const [vlauemaxpointcoach, setvlauemaxpointcoach] = useState();
  const [vlauemaxpointSpecialist, setvlauemaxpointSpecialist] = useState();
  const [showMap, setShowMap] = useState(false);

  const navigation = useNavigation();

  const handlePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const [Trainess, setTrainees] = useState([]);
  const [coach, setCoach] = useState([]);
  const [Specialist, setSpecialist] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${URL}/getTrainerSpecificDetails`);

        if (!response.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data = await response.json();
        setTrainees(data);

        const response2 = await fetch(`${URL}/getAllCoachesAdmin`);

        if (!response2.ok) {
          throw new Error("Failed to fetch coach details");
        }
        const data2 = await response2.json();
        setCoach(data2);

        const response3 = await fetch(`${URL}/getAllSepcialistsAdmin`);

        if (!response3.ok) {
          throw new Error("Failed to fetch specialist details");
        }
        const data3 = await response3.json();
        setSpecialist(data3);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    let countWatchedVideos = 0;
    let maxpointcoach = 0;
    let idcoach;
    let maxpointSpecialist = 0;
    let idSpecialist;
    Trainess.forEach((user) => {
      countWatchedVideos += user.WatchedVideos;
    });
    settotleWatchedVideos(countWatchedVideos);

    coach.forEach((user) => {
      if (maxpointcoach < user.Points && user.AcceptedDescription === "A") {
        maxpointcoach = user.Points;
        idcoach = user.ID_Coach;
      }
    });
    setmaxpointcoach(idcoach);
    setvlauemaxpointcoach(maxpointcoach);
    Specialist.forEach((user) => {
      if (
        maxpointSpecialist < user.Points &&
        user.AcceptedDescription === "A"
      ) {
        maxpointSpecialist = user.Points;
        idSpecialist = user.ID_Specialist;
      }
    });
    setmaxpointSpecialist(idSpecialist);
    setvlauemaxpointSpecialist(maxpointSpecialist);
  }, [Trainess, Specialist, coach]);
  return (
    <ScrollView style={styles.outerAlltatistics}>
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
      <View style={styles.inercontainer}>
        <View style={styles.row}>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.label}>Active Users</Text>
              <View style={[styles.icondiv, { backgroundColor: "#70D7FA" }]}>
                <IconIonicons name="checkmark-done" size={16} color="#fff" />
              </View>
            </View>
            <Text style={styles.value}>{totleWatchedVideos}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.label}>Best Coach</Text>
              <View style={[styles.icondiv, { backgroundColor: "#AE92F9" }]}>
                <IconIonicons name="person" size={16} color="#fff" />
              </View>
            </View>
            <Text style={styles.value}>
              {(() => {
                const foundCoach = coach.find(
                  (user) => user.ID_Coach === maxpointcoach
                );
                return foundCoach ? foundCoach.Username : "notfound";
              })()}
            </Text>
            <View style={styles.footer}>
              <Text>With Total Point :{vlauemaxpointcoach}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.label}>Best Nutration Expert</Text>
              <View style={[styles.icondiv, { backgroundColor: "#FA503C" }]}>
                <IconIonicons name="person" size={16} color="#fff" />
              </View>
            </View>
            <Text style={styles.value}>
              {(() => {
                const foundSpecialist = Specialist.find(
                  (user) => user.ID_Specialist === maxpointSpecialist
                );
                return foundSpecialist ? foundSpecialist.Username : "notfound";
              })()}
            </Text>
            <View style={styles.footer}>
              <Text>With Total Point :{vlauemaxpointSpecialist}</Text>
            </View>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.mapContainer}>
            <LocationsMap />
          </View>
        </View>
      </View>

      {}
      {modalVisible && (
        <Model
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          iteam={selectedItem}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  mapContainer: {
    height: 300,
    margin: 10,
    borderRadius: 10,
    overflow: "hidden",
  },

  outerAlltatistics: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  inertheader: {
    flexDirection: "row",
    gap: 20,
  },
  textheader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  icon: {
    marginTop: 25,
  },
  inercontainer: {
    paddingTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginHorizontal: 8,
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
  },
  label: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  icondiv: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    width: "20%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AllUserstatistics;
