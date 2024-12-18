import React, { useState } from "react";
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

  const usertableData = [
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
      Dateenter: "2024-02-06",
      AcceptedDescription: "A",
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
      Dateenter: "2021-05-06",
      AcceptedDescription: "A",
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
      Dateenter: "2024-05-06",
      AcceptedDescription: "A",
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
      Dateenter: "2020-04-06",
      AcceptedDescription: "A",
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
      Dateenter: "2019-05-06",
      AcceptedDescription: "P",
    },
  ];

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
                <Text style={styles.tableCell}>{row.Dateenter}</Text>
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
