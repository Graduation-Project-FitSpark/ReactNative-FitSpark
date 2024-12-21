import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import EditeuserModel from "./EditCoachModel.jsx";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import URL from "../../../enum.js";
function EditCoach() {
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
        const response2 = await fetch(`${URL}/getAllCoachesAdmin`);
        if (!response2.ok) {
          throw new Error("Failed to fetch coach details");
        }
        const data2 = await response2.json();
        setUserTableData(data2);
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
    setSortOrder("");
  };
  return (
    <ScrollView style={styles.EditCoachModel}>
      <View style={styles.inertheader}>
        <IconIonicons
          name="chevron-back-outline"
          size={24}
          color="#000"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.textheader}>Coach Info</Text>
      </View>

      <View style={styles.filterEditCoachModel}>
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
      <View style={styles.pickerEditCoachModel}>
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
                key={row.ID_Coach}
                style={[
                  styles.tableRow,
                  index % 2 === 0 ? styles.evenRow : styles.oddRow,
                ]}
                onPress={() => handlePress(row.ID_Coach)}
              >
                <Text style={styles.tableCell}>{row.ID_Coach}</Text>
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
  EditCoachModel: {
    marginTop: 50,
  },
  filterEditCoachModel: {
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
    alignItems: "center",
    justifyContent: "flex-start",
    marginBottom: 20,
  },
  icon: {
    marginLeft: 20,
  },
  textheader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
  pickerEditCoachModel: {
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

export default EditCoach;
