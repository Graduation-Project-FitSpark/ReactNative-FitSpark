import React, { useState, useEffect } from "react";
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
import axios from "axios";
import URL from "../../../enum.js";
function EditUsers() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const navigation = useNavigation();
  const handlePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const [usertableData, setUserTableData] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`${URL}/getTrainerSpecificDetails`);

        if (!response.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data = await response.json();
        setUserTableData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchTrainers();
  }, []);
  const filteredData = usertableData.filter((row) =>
    row.Username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ScrollView style={styles.EditTrainees}>
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
      <View style={styles.filterEditTrainees}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by Name"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
        <TouchableOpacity style={styles.search}>
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
            key={row.ID_Trainer}
            style={[
              styles.tableRow,
              index % 2 === 0 ? styles.evenRow : styles.oddRow,
            ]}
            onPress={() => handlePress(row.ID_Trainer)}
          >
            <Text style={styles.tableCell}>{row.ID_Trainer}</Text>
            <Text style={styles.tableCell}>{row.Username}</Text>
            <Text style={styles.tableCell}>{row.Age}</Text>
            <Text style={styles.tableCell}>{row.Dateenter.split("T")[0]}</Text>
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
  EditTrainees: {
    marginTop: 30,
  },
  headtitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginVertical: 20,
  },
  filterEditTrainees: {
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
  search: {
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
