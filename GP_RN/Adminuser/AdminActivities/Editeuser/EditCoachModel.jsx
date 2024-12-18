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
function EditSpecialistModel({ modalVisible, setModalVisible, iteam }) {
  const [notfiction, setnotfiction] = useState("");
  const [counttrner, setcounttrner] = useState(0);
  const [initialTableData, setInitialTableData] = useState([
    {
      ID_Coach: 1,
      Username: "Ali",
      Email: "masdm",
      First_Name: "Ali",
      Last_Name: "nbasd",
      Phone_Number: "flkj;d",
      Age: 26,
      Gender: "Male",
      Location: "Nablus",
      Points: 200,
      Img: null,
      YearsOfExperience: 7,
    },
    {
      ID_Coach: "7ce0612a-892a-4429-89cc-0d6d7aa1f72a",
      Username: "AhmadA",
      Email: "asjkdsI",
      First_Name: "sdlkfJ",
      Last_Name: "sdlkfJ",
      Phone_Number: "06594958",
      Age: 12,
      Gender: "Female",
      Location: "Genen",
      Points: 0,
      Img: null,
      YearsOfExperience: 7,
    },
    {
      ID_Coach: "924facco-b571-4611-9e70-c7a7ff2af929",
      Username: "Umy",
      Email: "GfKfk",
      First_Name: "Fjfj",
      Last_Name: "FjfJ",
      Phone_Number: "06594958",
      Age: 12,
      Gender: "Female",
      Location: "Genen",
      Points: 10,
      Img: null,
      YearsOfExperience: 7,
    },
    {
      ID_Coach: "9eaa7962-2c52-418e-9826-86beb2e6392b",
      Username: "Umy",
      Email: "GfKfk",
      First_Name: "Fjfj",
      Last_Name: "FjfJ",
      Phone_Number: "05976969",
      Age: 5,
      Gender: "Female",
      Location: "&_{",
      Points: 0,
      Img: null,
      YearsOfExperience: 7,
    },
    {
      ID_Coach: "ca667de4-2ae9-42fd-98dc-487e%6-ldd6lf",
      Username: "Vector",
      Email: "ashayera44@gmail.com",
      First_Name: "Vector",
      Last_Name: "Marcos",
      Phone_Number: "059495949",
      Age: 34,
      Gender: "Male",
      Location: "37.72010281317459, -122.430373853449",
      Points: 0,
      Img: null,
      YearsOfExperience: 7,
    },
  ]);
  const [trainerCoachData, setTrainerCoachData] = useState([
    {
      ID_Trainer: 1,
      ID_Coach: 1,
      Accepted: "t",
      Description:
        "Trainer 1 is paired with Coach 2 and the request is accepted.",
    },
    {
      ID_Trainer: 3,
      ID_Coach: 4,
      Accepted: "f",
      Description:
        "Trainer 3 is paired with Coach 4 and the request is declined.",
    },
    {
      ID_Trainer: 5,
      ID_Coach: 1,
      Accepted: "p",
      Description:
        "Trainer 5 is paired with Coach 10 and the request is accepted.",
    },
    {
      ID_Trainer: 7,
      ID_Coach: 8,
      Accepted: "f",
      Description:
        "Trainer 7 is paired with Coach 8 and the request is declined.",
    },
    {
      ID_Trainer: 9,
      ID_Coach: 10,
      Accepted: "p",
      Description:
        "Trainer 9 is paired with Coach 10 and the request is accepted.",
    },
    {
      ID_Trainer: 10,
      ID_Coach: 10,
      Accepted: "p",
      Description:
        "Trainer 10 is paired with Coach 10 and the request is accepted.",
    },
    {
      ID_Trainer: 12,
      ID_Coach: 1,
      Accepted: "T",
      Description:
        "Trainer 12 is paired with Coach 10 and the request is pending.",
    },
    {
      ID_Trainer: 13,
      ID_Coach: 10,
      Accepted: "T",
      Description:
        "Trainer 13 is paired with Coach 10 and the request is pending.",
    },
    {
      ID_Trainer: 15,
      ID_Coach: 16,
      Accepted: "f",
      Description:
        "Trainer 15 is paired with Coach 16 and the request is declined.jjsldkcklsjcjlnsdjcbdcljsjlbjldc",
    },
    {
      ID_Trainer: 17,
      ID_Coach: 18,
      Accepted: "t",
      Description:
        "Trainer 17 is paired with Coach 18 and the request is accepted.",
    },
    {
      ID_Trainer: 19,
      ID_Coach: 20,
      Accepted: "f",
      Description:
        "Trainer 19 is paired with Coach 20 and the request is declined.",
    },
  ]);
  useFocusEffect(
    useCallback(() => {
      let count = 0;
      trainerCoachData.filter((item) => {
        if (
          item.ID_Coach === iteam &&
          (item.Accepted === "t" || item.Accepted === "T")
        ) {
          count++;
        }
      });
      setcounttrner(count);
    }, [trainerCoachData, iteam])
  );

  const userData = initialTableData.find((item) => item.ID_Coach === iteam);

  const deletet = () => {
    //هون حذف اليوزر
    setInitialTableData((prevData) =>
      prevData.filter((data) => data.ID_Coach !== iteam)
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
                    uri: userData.Img || "https://via.placeholder.com/50",
                  }}
                  style={styles.image}
                />
                <Text style={styles.idText}>
                  {userData.First_Name + " " + userData.Last_Name}
                </Text>
              </View>
              <View style={styles.grideContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>Gender: {userData.Gender}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>
                    Experience: {userData.YearsOfExperience} Years
                  </Text>
                </View>
              </View>
              <View style={styles.grideContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>Points: {userData.Points}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>Enrollment:{counttrner}</Text>
                </View>
              </View>
              <View style={styles.grideContainer}>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>Email:</Text>
                  <Text style={styles.infoText}>{userData.Email}</Text>
                </View>
                <View style={styles.infoContainer}>
                  <Text style={styles.infoText}>Phone_Number:</Text>
                  <Text style={styles.infoText}>{userData.Phone_Number}</Text>
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

export default EditSpecialistModel;
