import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Traineetablestyle } from "../CachActivities/Traineetablestyle";
import URL from "../../enum";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useFocusEffect } from "@react-navigation/native";
import { useCallback } from "react";
function Friends() {
  const navigation = useNavigation();
  const [IDCoach, setIDCoach] = useState(0);
  const [trainerCoachData, setTrainerCoachData] = useState([]);
  const [infoTrainer, setInfoTrainer] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCoachDetails = async () => {
        try {
          const username = await AsyncStorage.getItem("username");
          const ID = await AsyncStorage.getItem("ID");
          setIDCoach(ID);

          const response1 = await fetch(`${URL}/getTrainerWithDetails`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

          if (!response1.ok) throw new Error(`Failed: ${response1.status}`);
          const data1 = await response1.json();
          setInfoTrainer(data1);

          const response2 = await fetch(`${URL}/getTrainerCoach`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });

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
  return (
    <View>
      <View style={Traineetablestyle.trainerTableContainer}>
        <View style={Traineetablestyle.traineertitle}>
          <Text style={Traineetablestyle.title}>Supervising trainee</Text>
        </View>

        {trainerCoachData
          .filter((item) => item.ID_Coach === IDCoach)
          .map((item) => {
            const trainerInfo = infoTrainer.find(
              (trainer) => trainer.ID_Trainer === item.ID_Trainer
            );
            if (!trainerInfo) return null;

            return (
              <TouchableOpacity
                key={item.ID_Trainer}
                style={Traineetablestyle.boxInfoTrainer}
                onPress={() => navigation.navigate("ChatCoach", trainerInfo)}
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

export default Friends;
