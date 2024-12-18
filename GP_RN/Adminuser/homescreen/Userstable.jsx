import React, { useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import IconIonicons from "react-native-vector-icons/Ionicons";

function Userstable() {
  const [selectedEntryType, setSelectedEntryType] = useState("");
  const [ageOrder, setAgeOrder] = useState("youngest");
  const [dateOrder, setDateOrder] = useState("newest");
  const [watchedVideosOrder, setWatchedVideosOrder] = useState("highest");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() + 1;
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
      WatchedVideos: 3,
      Token: null,
      Username: "user_7737",
      Height: 150,
      Weight: 100,
      Dateenter: "2025-5-06",
      Age: 10,
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
      Dateenter: "2025-04-06",
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
      Dateenter: "2025-12-06",
      Age: 11,
    },
  ];

  const filteredData = usertableData
    .filter((row) => {
      if (selectedEntryType === "new") {
        return (
          new Date(row.Dateenter) >=
          new Date(currentYear + "-" + currentMonth + "-1")
        );
      } else if (selectedEntryType === "last") {
        return (
          new Date(row.Dateenter) <
          new Date(currentYear + "-" + currentMonth + "-1")
        );
      }
      return true;
    })
    .sort((a, b) => {
      if (watchedVideosOrder === "highest") {
        return b.WatchedVideos - a.WatchedVideos;
      } else {
        return a.WatchedVideos - b.WatchedVideos;
      }
    });

  const resetFilters = () => {
    setSelectedEntryType("");
    setAgeOrder("");
    setDateOrder("");
    setWatchedVideosOrder("");
  };
  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
        <Text style={styles.resetButtonText}>Reset Filters</Text>
      </TouchableOpacity>
      <View style={styles.filterContainer}>
        <View style={styles.filterRow}>
          <View style={styles.pickerContainer}>
            <Text style={styles.filterLabel}>
              <IconIonicons name="list-circle" size={30} color="#ffc107" />{" "}
            </Text>
            <Picker
              selectedValue={selectedEntryType}
              onValueChange={(value) => setSelectedEntryType(value)}
              style={styles.picker}
            >
              <Picker.Item label="New" value="new" />
              <Picker.Item label="Last" value="last" />
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Text style={styles.filterLabel}>
              <IconIonicons name="star" size={30} color="#52C1DE" />{" "}
            </Text>
            <Picker
              selectedValue={watchedVideosOrder}
              onValueChange={(value) => setWatchedVideosOrder(value)}
              style={styles.picker}
            >
              <Picker.Item label="Most Watched" value="highest" />
              <Picker.Item label="Least Watched" value="lowest" />
            </Picker>
          </View>
        </View>
      </View>

      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>ID</Text>
          <Text style={styles.tableHeaderText}>Name</Text>
          <Text style={styles.tableHeaderText}>Age</Text>
          <Text style={styles.tableHeaderText}>Entered</Text>
        </View>

        {filteredData.map((row, index) => (
          <View
            key={row.ID_Trainer}
            style={[
              styles.tableRow,
              index % 2 === 0 ? styles.evenRow : styles.oddRow,
            ]}
          >
            <Text style={styles.tableCell}>{row.ID_Trainer}</Text>
            <Text style={styles.tableCell}>{row.Username}</Text>
            <Text style={styles.tableCell}>{row.Age}</Text>
            <Text style={styles.tableCell}>{row.Dateenter}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: -13,
  },
  filterContainer: {
    alignItems: "stretch",
    padding: 20,
    marginBottom: -50,
  },
  filterRow: {
    flexDirection: "row",
    gap: 20,
  },
  pickerContainer: {
    width: "25%",
    marginHorizontal: 10,
    flexDirection: "row",
  },
  filterLabel: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  picker: {
    width: "100%",
    backgroundColor: "transparent",
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
  resetButton: {
    backgroundColor: "#dc3545",
    padding: 10,
    borderRadius: 5,
    marginBottom: -20,
    width: "30%",
    marginLeft: 20,
  },
  resetButtonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default Userstable;
