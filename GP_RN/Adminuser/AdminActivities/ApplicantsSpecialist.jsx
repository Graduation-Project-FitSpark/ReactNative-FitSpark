import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
import { useNavigation } from "@react-navigation/native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import axios from "axios";
import URL from "../../enum";
function ApplicantsSpecialist() {
  const navigation = useNavigation();

  const [counttrner, setcounttrner] = useState(0);

  const goback = () => {
    savecahnge();
    navigation.goBack();
  };

  const [Specialist, setcSpecialist] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response3 = await fetch(`${URL}/getAllSepcialistsAdmin`);

        if (!response3.ok) {
          throw new Error("Failed to fetch specialist details");
        }
        const data3 = await response3.json();
        setcSpecialist(data3);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };

    fetchUsers();
  }, []);
  useEffect(() => {
    let count = 0;
    Specialist.filter((item) => {
      if (
        item.AcceptedDescription === "a" ||
        item.AcceptedDescription === "A"
      ) {
        count++;
      }
    });
    setcounttrner(count);
  }, [Specialist]);

  const Accept = (id) => {
    setcSpecialist((prevData) =>
      prevData.map((item) =>
        item.ID_Specialist === id ? { ...item, AcceptedDescription: "A" } : item
      )
    );
  };

  const Reject = (id) => {
    setcSpecialist((prevData) =>
      prevData.map((item) =>
        item.ID_Specialist === id ? { ...item, AcceptedDescription: "R" } : item
      )
    );
  };
  const savecahnge = async () => {
    try {
      const response = await fetch(`${URL}/EditSpecialistsAdmin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(Specialist),
      });

      if (!response.ok) {
        throw new Error("Failed to update");
      }

      const data = await response.json();
      console.log("Spec details updated:", data);
    } catch (error) {
      console.error("Error updating:", error);
    }
  };
  return (
    <View>
      <ScrollView
        contentContainerStyle={styles.trainerTableContainer}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={true}
      >
        <View style={styles.headrequst}>
          <TouchableOpacity onPress={goback} style={styles.bouttonback}>
            <IconIonicons name="chevron-back-outline" size={25} color="#000" />
          </TouchableOpacity>
          <View style={styles.traineertitle}>
            <Text style={styles.title}>Request Nutraion Experts </Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.wrapper}>
            <Text style={styles.textLabel}>
              Nutraion Experts in the system :
            </Text>
            <Text style={styles.textValue}>{counttrner} Nutrations</Text>
          </View>

          {Specialist.filter(
            (item) =>
              item.AcceptedDescription === "P" ||
              item.AcceptedDescription === "p"
          ).map((item) => (
            <View key={item.ID_Specialist} style={styles.boxInfoTrainer}>
              <View style={styles.imageinfo}>
                <Image source={{ uri: item.Img }} style={styles.trainerImage} />
                <View style={styles.trainerinfodetels}>
                  <View style={styles.coachinfodetels}>
                    <Text style={styles.textStyle}>
                      Name: {item.First_Name} {item.Last_Name}
                    </Text>
                    <Text style={styles.textStyle}>Age: {item.Age}</Text>
                  </View>
                  <View style={styles.coachinfodetels}>
                    <Text style={styles.textStyle}>Gender: {item.Gender}</Text>
                    <Text style={styles.textStyleExperience}>
                      Experience: {item.YearsOfExperience} year
                    </Text>
                  </View>
                </View>
              </View>
              <Text style={styles.Description}> {item.Description}</Text>
              <View style={styles.acppetorreacject}>
                <View style={styles.facek}></View>
                <View style={styles.acppetorreacjectiner}>
                  <TouchableOpacity
                    style={styles.uniqueButtona}
                    onPress={() => Accept(item.ID_Specialist)}
                  >
                    <IconIonicons
                      name="checkmark-outline"
                      size={25}
                      color="#1c1b29"
                    />
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.uniqueButtonr}
                    onPress={() => Reject(item.ID_Specialist)}
                  >
                    <IconIonicons
                      name="close-outline"
                      size={25}
                      color="#1c1b29"
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  trainerTableContainer: {
    backgroundColor: "#f8f8f8",
    justifyContent: "flex-start",
    paddingTop: 30,
    gap: 20,
  },
  headrequst: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  info: {
    alignItems: "center",
    gap: 20,
  },
  imageinfo: {
    width: "100%",
    flexDirection: "row",
    gap: 20,
  },
  bouttonback: {
    marginTop: 5,
    marginRight: -50,
  },
  boxInfoTrainer: {
    width: "90%",
    height: 200,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

    padding: 15,
    alignItems: "center",
    marginVertical: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  trainerImage: {
    width: 80,
    height: 80,
    borderRadius: 40,

    borderWidth: 2,
    borderColor: "#f0f0f0",
  },
  trainerinfodetels: {
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
  },
  traineertitle: {
    width: "100%",
    alignItems: "center",
    paddingLeft: 10,
  },
  title: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 20,
  },
  uniqueButtonr: {
    borderBottomRightRadius: 15,
    backgroundColor: "#F54E43",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 60,
  },
  uniqueButtona: {
    borderTopLeftRadius: 15,
    backgroundColor: "#BBF246",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 60,
  },
  uniqueButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  acppetorreacject: {
    width: "100%",
    marginBottom: -40,
    marginRight: -48,
    flexDirection: "row",
  },
  Description: {
    height: 65,
    textAlign: "left",
  },
  facek: {
    width: "60%",
  },
  acppetorreacjectiner: {
    height: "50%",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-around",
    justifyContent: "flex-start",
  },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  textLabel: {
    fontSize: 21,
    color: "#333",
    fontWeight: "bold",
  },
  textValue: {
    fontSize: 18,
    color: "#1c1b29",
    marginLeft: 5,
    fontWeight: "600",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
    paddingRight: 75,
  },
  coachinfodetels: {
    justifyContent: "center",
    gap: 20,
  },

  coachinfodetels: {
    flexDirection: "column",
  },
  textStyle: {
    fontSize: 16,
    color: "#333",
    marginVertical: 4,
    fontWeight: "500",
  },
  textStyleExperience: {
    fontSize: 16,
    color: "#333",
    marginVertical: 4,
    fontWeight: "500",
    marginLeft: -20,
  },
});

export default ApplicantsSpecialist;
