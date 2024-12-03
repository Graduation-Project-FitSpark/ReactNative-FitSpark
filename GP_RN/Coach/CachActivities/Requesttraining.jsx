import React, { useState } from "react";
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
import URL from "../../enum";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Requesttraining() {
  const navigation = useNavigation();
  const [IDCoach, setIDCoach] = useState(0);
  const [counttrner, setcounttrner] = useState(0);

  const goback = async () => {
    try {
      const response = await fetch(`${URL}/processRequestsCoach`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(trainerCoachData),
      });

      if (!response.ok) {
        throw new Error(`Failed: ${response.status}`);
      }

      const result = await response.json();
      console.log(result.message);
      navigation.goBack();
    } catch (error) {
      console.error("Error processing requests:", error.message);
    }
  };

  const [trainerCoachData, setTrainerCoachData] = useState([]);

  const [infoTrainer, setInfoTrainer] = useState([]);
  useFocusEffect(
    useCallback(() => {
      const fetchCoachDetails = async () => {
        try {
          const ID = await AsyncStorage.getItem("ID");
          setIDCoach(ID);

          const response1 = await fetch(`${URL}/getTrainerWithDetails`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (!response1.ok) throw new Error(`Failed: ${response1.status}`);
          const data1 = await response1.json();
          setInfoTrainer(data1);

          const response2 = await fetch(
            `${URL}/getTrainerCoachWithDescription`,
            {
              method: "GET",
              headers: { "Content-Type": "application/json" },
            }
          );
          if (!response2.ok) throw new Error(`Failed: ${response2.status}`);
          const data2 = await response2.json();
          setTrainerCoachData(data2);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchCoachDetails();
    }, [])
  );
  useFocusEffect(
    useCallback(() => {
      console.log("This is my array");
      let count = 0;
      trainerCoachData.filter((item) => {
        if (item.ID_Coach === IDCoach && item.Accepted === "A") {
          count++;
        }
      });
      setcounttrner(count);
    }, [trainerCoachData, IDCoach])
  );
  const Accept = async (id) => {
    try {
      const response = await fetch(`${URL}/insertCoachPoints`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ID_Coach: IDCoach,
          Points: 1,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Updated successfully:", data);
      } else {
        console.error("Error updating:", data.error);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
    setTrainerCoachData((prevData) =>
      prevData.map((item) =>
        item.ID_Trainer === id ? { ...item, Accepted: "A" } : item
      )
    );
  };

  const Reject = (id) => {
    setTrainerCoachData((prevData) =>
      prevData.map((item) =>
        item.ID_Trainer === id ? { ...item, Accepted: "R" } : item
      )
    );
  };
  const savecahnge = () => {
    console.log("Updated trineday:", trainerCoachData);
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
            <Text style={styles.title}>Request trainer </Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.wrapper}>
            <Text style={styles.textLabel}>
              Number of Trainees{"\n"}you train: {counttrner} Trainees
            </Text>
          </View>

          {trainerCoachData
            .filter((item) => item.ID_Coach === IDCoach && item.Accepted == "P")
            .map((item) => {
              const trainerInfo = infoTrainer.find(
                (trainer) => trainer.ID_Trainer === item.ID_Trainer
              );
              if (!trainerInfo) return null;

              return (
                <View
                  key={item.ID_Trainer}
                  style={styles.boxInfoTrainer}
                  onPress={() =>
                    navigation.navigate("Traineeexercise", trainerInfo)
                  }
                >
                  <View style={styles.imageinfo}>
                    <View>
                      <Image
                        source={{ uri: trainerInfo.img }}
                        style={styles.trainerImage}
                      />
                    </View>

                    <View style={styles.trainerinfodetels}>
                      <Text>Name: {trainerInfo.name}</Text>
                      <Text>Age: {trainerInfo.Age}</Text>
                    </View>
                  </View>
                  <Text style={styles.Description}> {item.Description}</Text>
                  <View style={styles.acppetorreacject}>
                    <View style={styles.facek}></View>
                    <View style={styles.acppetorreacjectiner}>
                      <TouchableOpacity
                        style={styles.uniqueButtona}
                        onPress={() => Accept(item.ID_Trainer)}
                      >
                        <IconIonicons
                          name="checkmark-outline"
                          size={25}
                          color="#1c1b29"
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        style={styles.uniqueButtonr}
                        onPress={() => Reject(item.ID_Trainer)}
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
              );
            })}
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
    width: 55,
  },
  uniqueButtona: {
    borderTopLeftRadius: 15,
    backgroundColor: "#BBF246",
    alignItems: "center",
    justifyContent: "center",
    height: 40,
    width: 55,
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
});

export default Requesttraining;
