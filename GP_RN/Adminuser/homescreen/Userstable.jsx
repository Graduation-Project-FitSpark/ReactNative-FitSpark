import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import IconIonicons from "react-native-vector-icons/Ionicons";
import URL from "../../enum";
import axios from "axios";

function Userstable() {
  const [selectedEntryType, setSelectedEntryType] = useState("");
  const [ageOrder, setAgeOrder] = useState("youngest");
  const [dateOrder, setDateOrder] = useState("newest");
  const [watchedVideosOrder, setWatchedVideosOrder] = useState("highest");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() + 1;
  const [usertableData, setUsertableData] = useState([]);

  useEffect(() => {
    const fetchTrainers = async () => {
      try {
        const response = await fetch(`${URL}/getTrainerSpecificDetails`);

        if (!response.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data = await response.json();
        setUsertableData(data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchTrainers();
  }, []);
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
    <ScrollView style={styles.Userstable}>
      <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
        <Text style={styles.resetButtonText}>Reset Filters</Text>
      </TouchableOpacity>
      <View style={styles.filterUserstable}>
        <View style={styles.filterRow}>
          <View style={styles.pickerUserstable}>
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

          <View style={styles.pickerUserstable}>
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
            <Text style={styles.tableCell}>{row.Dateenter.split("T")[0]}</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  Userstable: {
    marginTop: -13,
  },
  filterUserstable: {
    alignItems: "stretch",
    padding: 20,
    marginBottom: -50,
  },
  filterRow: {
    flexDirection: "row",
    gap: 20,
  },
  pickerUserstable: {
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
