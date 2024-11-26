import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Traineetablestyle } from "./Traineetablestyle";

import { useNavigation } from "@react-navigation/native";
function Traineetable() {
  const navigation = useNavigation();
  const [IDCoach, setIDCoach] = useState(10); //هون اي دي الي داخل هلا
  const [trainerCoachData, setTrainerCoachData] = useState([
    { ID_Trainer: 1, ID_Coach: 2, Accepted: true },
    { ID_Trainer: 3, ID_Coach: 4, Accepted: false },
    { ID_Trainer: 5, ID_Coach: 6, Accepted: true },
    { ID_Trainer: 7, ID_Coach: 8, Accepted: false },
    { ID_Trainer: 9, ID_Coach: 10, Accepted: true },
    { ID_Trainer: 10, ID_Coach: 11, Accepted: false },
    { ID_Trainer: 12, ID_Coach: 10, Accepted: false },
    { ID_Trainer: 13, ID_Coach: 10, Accepted: true },
    { ID_Trainer: 15, ID_Coach: 16, Accepted: false },
    { ID_Trainer: 17, ID_Coach: 18, Accepted: true },
    { ID_Trainer: 19, ID_Coach: 20, Accepted: false },
  ]);

  const [infoTrainer, setInfoTrainer] = useState([
    {
      ID_Trainer: 13,
      name: "Mahmoud",
      Age: 23,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdWwVU65gZW5--Ypno_l2GBNhI_sinWkNUw&s",
    },
    {
      ID_Trainer: 9,
      name: "Ali",
      Age: 25,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdWwVU65gZW5--Ypno_l2GBNhI_sinWkNUw&s",
    },
    {
      ID_Trainer: 12,
      name: "Sara",
      Age: 22,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdWwVU65gZW5--Ypno_l2GBNhI_sinWkNUw&s",
    },
    {
      ID_Trainer: 4,
      name: "John",
      Age: 28,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdWwVU65gZW5--Ypno_l2GBNhI_sinWkNUw&s",
    },
    {
      ID_Trainer: 1,
      name: "David",
      Age: 30,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdWwVU65gZW5--Ypno_l2GBNhI_sinWkNUw&s",
    },
  ]);

  return (
    <View>
      <View style={Traineetablestyle.trainerTableContainer}>
        <View style={Traineetablestyle.traineertitle}>
          <Text style={Traineetablestyle.title}>Supervising trainer</Text>
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
                onPress={() =>
                  navigation.navigate("Traineeexercise", trainerInfo)
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

export default Traineetable;
