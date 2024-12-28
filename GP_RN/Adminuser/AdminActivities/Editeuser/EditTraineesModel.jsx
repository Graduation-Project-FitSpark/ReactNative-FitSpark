import React, { useState, useEffect } from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  TextInput,
} from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { Alert } from "react-native";
import axios from "axios";
import URL from "../../../enum";
import { useNavigation } from "@react-navigation/native";
function EditeuserModel({ modalVisible, setModalVisible, iteam }) {
  const navigation = useNavigation();
  const [notfiction, setnotfiction] = useState("");
  const [initialTableData, setInitialTableData] = useState([]);
  const [fullTableDatacal, setFullTableDatacal] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${URL}/getTrainerSpecificDetails`);

        if (!response.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data = await response.json();
        setInitialTableData(data);

        const response2 = await fetch(`${URL}/getTrainerClorieDetails`);

        if (!response2.ok) {
          throw new Error("Failed to fetch coach details");
        }
        const data2 = await response2.json();
        setFullTableDatacal(data2);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchUsers();
  }, [initialTableData]);

  const userData = initialTableData.find((item) => item.ID_Trainer === iteam);
  const userCaloriesData = fullTableDatacal.filter(
    (item) => item.ID_Trainer === iteam
  );

  const totalCalories = userCaloriesData.reduce(
    (sum, entry) => sum + entry.Calories,
    0
  );
  const totalSteps = userCaloriesData.reduce(
    (sum, entry) => sum + entry.Steps,
    0
  );

  const deletet = async () => {
    const response = await axios.post(`${URL}/DeleteTrainerAdmin`, {
      ID_Trainer: iteam,
    });
    setInitialTableData((prevData) =>
      prevData.filter((data) => data.ID_Trainer !== iteam)
    );
    setFullTableDatacal((prevData) =>
      prevData.filter((data) => data.ID_Trainer !== iteam)
    );
    console.log(initialTableData);
    setModalVisible(false);
    navigation.replace("EditTrainees");
  };
  const send = () => {
    //هون ببعت نوتفيكشن لليوزر الي الايدي تاعو iteam
    console.log(notfiction);
    setnotfiction("");
    Alert.alert("Notification Sent", `Message: ${notfiction}`, [
      { text: "OK" },
    ]);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalEditTraineesModel}>
        <View style={styles.modaltent}>
          {userData ? (
            <>
              <View style={styles.header}>
                <Image
                  source={{
                    uri: userData.Image || "https://via.placeholder.com/50",
                  }}
                  style={styles.image}
                />
                <Text style={styles.idtext}>
                  {userData.First_Name + " " + userData.Last_Name}
                </Text>
              </View>
              <View style={styles.grideEditTraineesModel}>
                <View style={styles.infoEditTraineesModel}>
                  <Text style={styles.info}>Gender: {userData.Gender}</Text>
                </View>
                <View style={styles.infoEditTraineesModel}>
                  <Text style={styles.info}>
                    Class Type: {userData.Class_Type}
                  </Text>
                </View>
              </View>
              <View style={styles.grideEditTraineesModel}>
                <View style={styles.infoEditTraineesModel}>
                  <Text style={styles.info}>Points: {userData.Points}</Text>
                </View>
                <View style={styles.infoEditTraineesModel}>
                  <Text style={styles.info}>
                    Watched Videos: {userData.WatchedVideos}
                  </Text>
                </View>
              </View>
              <View style={styles.grideEditTraineesModel}>
                <View style={styles.infoEditTraineesModel}>
                  <Text style={styles.info}>
                    Total Calories: {totalCalories}
                  </Text>
                </View>
                <View style={styles.infoEditTraineesModel}>
                  <Text style={styles.info}>Total Steps: {totalSteps}</Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.info}>
              No data found for the selected trainee.
            </Text>
          )}
          <View style={styles.outerinfoContainerNotification}>
            <View style={styles.infoContainerNotification}>
              <TextInput
                style={styles.search}
                placeholder="Send Notification"
                placeholderTextColor="#aaa"
                value={notfiction}
                onChangeText={(text) => setnotfiction(text)}
              />
            </View>
            <TouchableOpacity onPress={send} style={styles.send}>
              <IconIonicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.closedeletecontiner}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closebutton}
            >
              <Text style={styles.closetext}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deletet} style={styles.deletebutton}>
              <Text style={styles.deletetext}>Delete user</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalEditTraineesModel: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modaltent: {
    width: "90%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 70,
    height: 70,
    borderRadius: 40,
  },
  idtext: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  infoEditTraineesModel: {
    backgroundColor: "#e2ff90",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    elevation: 5,
    width: "50%",
  },
  info: {
    fontSize: 14,
    color: "#555",
  },
  grideEditTraineesModel: {
    flexDirection: "row",
    gap: 10,
  },
  closebutton: {
    backgroundColor: "#749DE1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closetext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deletebutton: {
    backgroundColor: "#E16A68",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deletetext: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  closedeletecontiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  infoContainerNotification: {
    backgroundColor: "#e8f4ff",
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 3,
    flex: 1,
    marginRight: 10,
  },
  outerinfoContainerNotification: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  search: {},
  send: {
    backgroundColor: "#3498db",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    borderRadius: 8,
    elevation: 3,
    marginBottom: 5,
  },
});

export default EditeuserModel;
