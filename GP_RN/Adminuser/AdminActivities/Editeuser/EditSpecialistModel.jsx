import React, { useState } from "react";
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
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import axios from "axios";
import URL from "../../../enum";
import { useNavigation } from "@react-navigation/native";
function EditSpecialistModel({ modalVisible, setModalVisible, iteam }) {
  const navigation = useNavigation();
  const [notfiction, setnotfiction] = useState("");
  const [counttrner, setcounttrner] = useState(0);
  const [initialTableData, setInitialTableData] = useState([]);
  const [trainerSpecialistData, setTrainerCoachData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchTrainers = async () => {
        try {
          const response = await fetch(`${URL}/getAllSpecialists`);

          if (!response.ok) {
            throw new Error("Failed to fetch trainer details");
          }
          const data = await response.json();
          setInitialTableData(data.specialists);
          const response2 = await fetch(
            `${URL}/getTrainerSpecialistWithDescription`
          );

          if (!response2.ok) {
            throw new Error("Failed to fetch trainer details");
          }
          const data2 = await response2.json();
          setTrainerCoachData(data2);
        } catch (err) {
          console.error("Error fetching trainer details:", err);
        }
      };

      fetchTrainers();
    }, [])
  );

  useFocusEffect(
    useCallback(() => {
      let count = 0;
      trainerSpecialistData.filter((item) => {
        if (
          item.ID_Specialist === iteam &&
          (item.Accepted === "a" || item.Accepted === "A")
        ) {
          count++;
        }
      });
      setcounttrner(count);
    }, [trainerSpecialistData, iteam])
  );

  const userData = initialTableData.find(
    (item) => item.ID_Specialist === iteam
  );

  const deletet = async () => {
    const response = await axios.post(`${URL}/DeleteSpecialistAdmin`, {
      ID_Specialist: iteam,
    });
    setInitialTableData((prevData) =>
      prevData.filter((data) => data.ID_Specialist !== iteam)
    );

    console.log(initialTableData);
    setModalVisible(false);
    navigation.replace("EditSpecialist");
  };
  const sendNotification = async (username) => {
    const currentDate = new Date().toISOString().split("T")[0];

    try {
      const notificationData = {
        Description: notfiction,
        Date: currentDate,
        Msg_To: username,
      };

      const response = await axios.post(
        `${URL}/insertNotification`,
        notificationData
      );

      console.log(response.data.message);
      return response.data.message;
    } catch (error) {
      console.error("Error inserting notification:", error);
      return "Failed to insert notification";
    }
    alert(`Notification Sent: ${notification}`);
    setNotification("");
  };

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={styles.modalEditSpecialistModel}>
        <View style={styles.modaltent}>
          {userData ? (
            <>
              <View style={styles.header}>
                <Image
                  source={{
                    uri: userData.Img || "https://via.placeholder.com/50",
                  }}
                  style={styles.image}
                />
                <Text style={styles.idtext}>
                  {userData.First_Name + " " + userData.Last_Name}
                </Text>
              </View>
              <View style={styles.grideEditSpecialistModel}>
                <View style={styles.infoEditSpecialistModel}>
                  <Text style={styles.info}>Gender: {userData.Gender}</Text>
                </View>
                <View style={styles.infoEditSpecialistModel}>
                  <Text style={styles.info}>
                    Experience: {userData.YearsOfExperience} Years
                  </Text>
                </View>
              </View>
              <View style={styles.grideEditSpecialistModel}>
                <View style={styles.infoEditSpecialistModel}>
                  <Text style={styles.info}>Points: {userData.Points}</Text>
                </View>
                <View style={styles.infoEditSpecialistModel}>
                  <Text style={styles.info}>Enrollment:{counttrner}</Text>
                </View>
              </View>
              <View style={styles.grideEditSpecialistModel}>
                <View style={styles.infoEditSpecialistModel}>
                  <Text style={styles.info}>Email:</Text>
                  <Text style={styles.info}>{userData.Email}</Text>
                </View>
                <View style={styles.infoEditSpecialistModel}>
                  <Text style={styles.info}>Phone_Number:</Text>
                  <Text style={styles.info}>{userData.Phone_Number}</Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.info}>
              No data found for the selected nutration expert.
            </Text>
          )}
          <View style={styles.outerinfoContainerNotification}>
            <View style={styles.infoContainerNotification}>
              <TextInput
                style={styles.searchInput}
                placeholder="Send Notification"
                placeholderTextColor="#aaa"
                value={notfiction}
                onChangeText={(text) => setnotfiction(text)}
              />
            </View>
            <TouchableOpacity
              onPress={() => sendNotification(userData.Username)}
              style={styles.send}
            >
              <IconIonicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.closedeletecontiner}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.close}
            >
              <Text style={styles.closetext}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deletet} style={styles.delete}>
              <Text style={styles.deletetext}>Delete user</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalEditSpecialistModel: {
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
  infoEditSpecialistModel: {
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
  grideEditSpecialistModel: {
    flexDirection: "row",
    gap: 10,
  },
  close: {
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
  delete: {
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
  searchInput: {},
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

export default EditSpecialistModel;
