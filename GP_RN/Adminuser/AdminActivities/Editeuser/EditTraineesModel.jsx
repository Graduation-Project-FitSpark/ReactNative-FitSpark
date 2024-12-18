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
function EditeuserModel({ modalVisible, setModalVisible, iteam }) {
  const [notfiction, setnotfiction] = useState("");
  const [initialTableData, setInitialTableData] = useState([
    {
      ID_Trainer: 1,
      First_name: "mahmoud",
      Last_name: "Arafat",
      Gender: "Male",
      Class_Type: "Cardio",
      Location: "[37.74798825940199, -122.420727407486164]",
      Activity_Level: "Fat",
      Card_Number: "594949494",
      Expression_Date: "2000-06-07 00:00:00",
      CVC: 594,
      Points: 0,
      Image: "https://via.placeholder.com/50",
      WatchedVideos: 0,
      Token: null,
      Username: "user_7737",
      Height: 150,
      Weight: 100,
    },
    {
      ID_Trainer: 13,
      First_name: "jone",
      Last_name: "kcdcd",
      Gender: "Male",
      Class_Type: "Cardio",
      Location: "Nablus",
      Activity_Level: "Fat",
      Card_Number: "065061563",
      Expression_Date: "2000-08-02 00:00:00",
      CVC: 321,
      Points: 500,
      Image: "https://via.placeholder.com/50",
      WatchedVideos: 0,
      Token: null,
      Username: "user_7733",
      Height: 120,
      Weight: 50,
    },
    {
      ID_Trainer: 9,
      First_name: "sasa",
      Last_name: "ffdfd",
      Gender: "Male",
      Class_Type: "Cardio",
      Location: "[37.68169336082543, -122.44336623698473]",
      Activity_Level: "Fat",
      Card_Number: "594949494",
      Expression_Date: "2005-06-01 00:00:00",
      CVC: 493,
      Points: 100,
      Image: "https://via.placeholder.com/50",
      WatchedVideos: 0,
      Token: null,
      Username: "user_7737",
      Height: 150,
      Weight: 90,
    },
  ]);

  const [fullTableDatacal, setFullTableDatacal] = useState([
    {
      ID_Trainer: 1,
      ID_Calorie: "0e813dde-9419-4012-b3cb-01f41b9bdcc4",
      Calories: 100,
      Steps: 10000,
      Day: "Monday",
      Date: "2024-10-28",
      Distance: null,
    },
    {
      ID_Trainer: 1,
      ID_Calorie: "dc3cb01-83eb-48a8-9a29-de2c8284ceed",
      Calories: 200,
      Steps: 1000,
      Day: "Thursday",
      Date: "2024-11-14",
      Distance: 400,
    },
    {
      ID_Trainer: 13,
      ID_Calorie: "752e3515-55ff-419f-947c-48c06fe037e5",
      Calories: 100,
      Steps: 0,
      Day: "Friday",
      Date: "2024-11-22",
      Distance: 0,
    },
    {
      ID_Trainer: 1,
      ID_Calorie: "752e3515-55ff-419f-947c-48c06fe037e5",
      Calories: 300,
      Steps: 0,
      Day: "Friday",
      Date: "2024-11-22",
      Distance: 0,
    },
  ]);

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

  const deletet = () => {
    //هون حذف اليوزر
    setInitialTableData((prevData) =>
      prevData.filter((data) => data.ID_Trainer !== iteam)
    );
    setFullTableDatacal((prevData) =>
      prevData.filter((data) => data.ID_Trainer !== iteam)
    );
    console.log(initialTableData);
    setModalVisible(false);
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
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          {userData ? (
            <>
              <View style={styles.header}>
                <Image
                  source={{
                    uri: userData.Image || "https://via.placeholder.com/50",
                  }}
                  style={styles.image}
                />
                <Text style={styles.idText}>
                  {userData.First_name + " " + userData.Last_name}
                </Text>
              </View>
              <View style={styles.grideContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>Gender: {userData.Gender}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    Class Type: {userData.Class_Type}
                  </Text>
                </View>
              </View>
              <View style={styles.grideContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>Points: {userData.Points}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    Watched Videos: {userData.WatchedVideos}
                  </Text>
                </View>
              </View>
              <View style={styles.grideContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    Total Calories: {totalCalories}
                  </Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>Total Steps: {totalSteps}</Text>
                </View>
              </View>
            </>
          ) : (
            <Text style={styles.infoText}>
              No data found for the selected trainer.
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
            <TouchableOpacity onPress={send} style={styles.send}>
              <IconIonicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <View style={styles.closedeletecontiner}>
            <TouchableOpacity
              onPress={() => setModalVisible(false)}
              style={styles.closeButton}
            >
              <Text style={styles.closeButtonText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={deletet} style={styles.deleteButton}>
              <Text style={styles.deleteButtonText}>Delete user</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
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
  idText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  infoContainer: {
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
  infoText: {
    fontSize: 14,
    color: "#555",
  },
  grideContainer: {
    flexDirection: "row",
    gap: 10,
  },
  closeButton: {
    backgroundColor: "#749DE1",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  deleteButton: {
    backgroundColor: "#E16A68",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  deleteButtonText: {
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

export default EditeuserModel;
