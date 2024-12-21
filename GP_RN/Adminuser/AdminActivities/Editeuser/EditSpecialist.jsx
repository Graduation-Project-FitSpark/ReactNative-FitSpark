import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import EditeuserModel from "./EditSpecialistModel.jsx";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import URL from "../../../enum.js";
import axios from "axios";
function EditSpecialist() {
  const [searchQuery, setSearchQuery] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sortOrder, setSortOrder] = useState("highest");

  const navigation = useNavigation();
  const handlePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const [usertableData, setUserTableData] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response3 = await fetch(`${URL}/getAllSepcialistsAdmin`);

        if (!response3.ok) {
          throw new Error("Failed to fetch specialist details");
        }
        const data3 = await response3.json();
        setUserTableData(data3);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchUsers();
  }, []);
  const filteredData = usertableData.filter((row) =>
    row.Username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (sortOrder === "highest") {
      return b.Points - a.Points;
    } else {
      return a.Points - b.Points;
    }
  });

  const resetFilters = () => {
    setSortOrder("highest");
  };

  return (
    <ScrollView style={styles.EditSpecialist}>
      <View style={styles.inertheader}>
        <IconIonicons
          name="chevron-back-outline"
          size={24}
          color="#000"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.textheader}>Specialist Info</Text>
      </View>
      <View style={styles.filterEditSpecialist}>
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
      <View style={styles.pickerEditSpecialist}>
        <Text style={styles.filterLabel}>
          <IconIonicons name="star" size={30} color="#6D7FDB" />{" "}
        </Text>
        <Picker
          selectedValue={sortOrder}
          onValueChange={(value) => setSortOrder(value)}
          style={styles.picker}
        >
          <Picker.Item label="Highest rating" value="highest" />
          <Picker.Item label="Lowest rating" value="lowest" />
        </Picker>
        <TouchableOpacity style={styles.reset} onPress={resetFilters}>
          <Text style={styles.resetText}>Reset Filters</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>ID</Text>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>Age</Text>
          <Text style={styles.tableHeaderText}>Entered</Text>
        </View>

        {sortedData.map((row, index) => {
          if (row.AcceptedDescription === "A") {
            return (
              <TouchableOpacity
                key={row.ID_Specialist}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}
                onPress={() => handlePress(row.ID_Specialist)}
              >
                <Text style={styles.tableCell}>{row.ID_Specialist}</Text>
                <Text style={styles.tableCell}>{row.Username}</Text>
                <Text style={styles.tableCell}>{row.Age}</Text>
                <Text style={styles.tableCell}>
                  {row.Dateenter.split("T")[0]}
                </Text>
              </TouchableOpacity>
            );
          }
          return null;
        })}
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
  EditSpecialist: {
    marginTop: 50,
  },
  headtitle: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    color: "#333",
    marginVertical: 20,
  },
  filterEditSpecialist: {
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
    marginBottom: 20,
  },
  textheader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  icon: {
    marginTop: 4,
    marginLeft: 10,
  },
  textheader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  pickerEditSpecialist: {
    marginLeft: 15,
    flexDirection: "row",
    width: "50%",
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 12,
  },
  picker: {
    height: 50,
    width: "100%",
  },
  reset: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    marginTop: 5,
    width: "60%",
    marginLeft: 20,
    maxHeight: "80%",
  },
  resetText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default EditSpecialist;
