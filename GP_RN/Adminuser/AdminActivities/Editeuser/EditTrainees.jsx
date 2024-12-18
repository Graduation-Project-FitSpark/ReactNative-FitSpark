import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import EditeuserModel from "./EditTraineesModel.jsx";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

function EditUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  const handlePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const usertableData = [
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
      Dateenter: "2024-12-06",
      Age: 12,
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
      WatchedVideos: 5,
      Token: null,
      Username: "user_7733",
      Height: 120,
      Weight: 50,
      Dateenter: "2024-04-06",
      Age: 12,
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
      WatchedVideos: 2,
      Token: null,
      Username: "user_7737",
      Height: 150,
      Weight: 90,
      Dateenter: "2024-05-06",
      Age: 12,
    },
  ];

  const filteredData = usertableData.filter((row) =>
    row.Username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inertheader}>
        <IconIonicons
          name="chevron-back-outline"
          size={24}
          color="#000"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.textheader}>User Info</Text>
      </View>
      <View style={styles.filterContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.searchButton}>
          <IconIonicons name="search" size={25} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>ID</Text>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>Age</Text>
          <Text style={styles.tableHeaderText}>Entered</Text>
        </View>

        {filteredData.map((row, index) => (
          <TouchableOpacity
            key={row.id}
            style={[
              styles.tableRow,
              index % 2 === 0 ? styles.evenRow : styles.oddRow,
            ]}
            onPress={() => handlePress(row.ID_Trainer)}
          >
            <Text style={styles.tableCell}>{row.ID_Trainer}</Text>
            <Text style={styles.tableCell}>{row.Username}</Text>
            <Text style={styles.tableCell}>{row.Age}</Text>
            <Text style={styles.tableCell}>{row.Dateenter}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {modalVisible && (
        <EditeuserModel
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
    marginTop: 30,
  },
  headtitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginVertical: 20,
  },
  filterContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,

    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    padding: 12,
    borderColor: "#b2f200",
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    color: "#333",
    marginRight: 10,
  },
  searchButton: {
    padding: 10,
    backgroundColor: "#b2f200",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  table: {
    margin: 20,
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#ffffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#b2f200",
    padding: 15,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: "700",
    textAlign: "center",
    color: "#000",
    fontSize: 14,
  },
  tableRow: {
    flexDirection: "row",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  inertheader: {
    flexDirection: "row",
    gap: 20,
    marginLeft: 20,
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
});

export default EditUsers;
