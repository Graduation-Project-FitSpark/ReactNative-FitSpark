import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity } from "react-native";
import { Traineetablestyle } from "./Traineetablestyle";

import { useNavigation } from "@react-navigation/native";
function Inreotranineranalytics() {
  const navigation = useNavigation();
  const [IDSpecialist, setIDSpecialist] = useState(10); //هون اي دي الي داخل هلا
  const [trainerSpecialistData, setTrainerSpecialistData] = useState([
    {
      ID_Trainer: 1,
      ID_Specialist: 10,
      Accepted: "t",
      Description:
        "Trainer 1 is paired with Coach 2 and the request is accepted.",
    },
    {
      ID_Trainer: 3,
      ID_Specialist: 4,
      Accepted: "f",
      Description:
        "Trainer 3 is paired with Coach 4 and the request is declined.",
    },
    {
      ID_Trainer: 5,
      ID_Specialist: 10,
      Accepted: "p",
      Description:
        "Trainer 5 is paired with Coach 10 and the request is accepted.",
    },
    {
      ID_Trainer: 7,
      ID_Specialist: 8,
      Accepted: "f",
      Description:
        "Trainer 7 is paired with Coach 8 and the request is declined.",
    },
    {
      ID_Trainer: 9,
      ID_Specialist: 10,
      Accepted: "p",
      Description:
        "Trainer 9 is paired with Coach 10 and the request is accepted.",
    },
    {
      ID_Trainer: 10,
      ID_Specialist: 10,
      Accepted: "p",
      Description:
        "Trainer 10 is paired with Coach 10 and the request is accepted.",
    },
    {
      ID_Trainer: 12,
      ID_Specialist: 10,
      Accepted: "T",
      Description:
        "Trainer 12 is paired with Coach 10 and the request is pending.",
    },
    {
      ID_Trainer: 13,
      ID_Specialist: 10,
      Accepted: "T",
      Description:
        "Trainer 13 is paired with Coach 10 and the request is pending.",
    },
    {
      ID_Trainer: 15,
      ID_Specialist: 16,
      Accepted: "f",
      Description:
        "Trainer 15 is paired with Coach 16 and the request is declined.jjsldkcklsjcjlnsdjcbdcljsjlbjldc",
    },
    {
      ID_Trainer: 17,
      ID_Specialist: 18,
      Accepted: "t",
      Description:
        "Trainer 17 is paired with Coach 18 and the request is accepted.",
    },
    {
      ID_Trainer: 19,
      ID_Specialist: 20,
      Accepted: "f",
      Description:
        "Trainer 19 is paired with Coach 20 and the request is declined.",
    },
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
          <Text style={Traineetablestyle.title}>Analysis trainer</Text>
        </View>

        {trainerSpecialistData
          .filter(
            (item) =>
              item.ID_Specialist === IDSpecialist &&
              (item.Accepted === "t" || item.Accepted === "T")
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
                  navigation.navigate(
                    "AnalyticsSectionSpecilalist",
                    trainerInfo
                  )
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

export default Inreotranineranalytics;
