import React, { useState, useCallback } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import axios from "axios";
import URL from "../../enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import { Traineetablestyle } from "../../Coach/CachActivities/Traineetablestyle";
function FriendsSpecialist() {
  const navigation = useNavigation();
  const [IDSpecialist, setIDSpecialist] = useState(0);
  const [trainerSpecialistData, setTrainerSpecialistData] = useState([]);
  const [infoTrainer, setInfoTrainer] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchSpecialistDetails = async () => {
        try {
          const username = await AsyncStorage.getItem("username");
          const ID = await AsyncStorage.getItem("ID");
          setIDSpecialist(ID);

          const response1 = await fetch(`${URL}/getTrainerWithDetails`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!response1.ok) throw new Error(`Failed: ${response1.status}`);
          const data1 = await response1.json();
          setInfoTrainer(data1);

          const response2 = await fetch(`${URL}/getTrainerSpecialist`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!response2.ok) throw new Error(`Failed: ${response2.status}`);
          const data2 = await response2.json();
          setTrainerSpecialistData(data2);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchSpecialistDetails();
    }, [])
  );
  return (
    <View>
      <View style={Traineetablestyle.trainerTableContainer}>
        <View style={Traineetablestyle.traineertitle}>
          <Text style={Traineetablestyle.title}>Your Traniees</Text>
        </View>

        {trainerSpecialistData
          .filter(
            (item) =>
              item.ID_Specialist === IDSpecialist && item.Accepted === "A"
          )
          .map((item) => {
            const trainerInfo = infoTrainer.find(
              (trainer) => trainer.ID_Trainer === item.ID_Trainer
            );
            if (!trainerInfo) return null;

            return (
              <TouchableOpacity
                key={item.ID_Trainer}
                style={Traineetablestyle.boxInfoTrainer}
                onPress={() =>
                  navigation.navigate("ChatSpecialist", trainerInfo)
                }
              >
                <Image
                  source={{ uri: trainerInfo.img }}
                  style={Traineetablestyle.trainerImage}
                />
                <View style={Traineetablestyle.trainerinfodetels}>
                  <Text>Name: {trainerInfo.name}</Text>
                  <Text>Age: {trainerInfo.Age}</Text>
                </View>
              </TouchableOpacity>
            );
          })}
      </View>
    </View>
  );
}

export default FriendsSpecialist;
