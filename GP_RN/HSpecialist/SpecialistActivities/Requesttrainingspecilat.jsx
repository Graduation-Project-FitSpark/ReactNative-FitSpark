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
function Requesttrainingspecilat() {
  const navigation = useNavigation();
  const [IDSpecialist, setIDSpecialist] = useState(10); //هون اي دي الي داخل هلا
  const [counttrner, setcounttrner] = useState(0);
  const goback = () => {
    //عشان انا خليت الداتا الي في trainerCoachData وبتبدلها مكان trainerCoachData بتاخذ
    //الي بالكود هون  trainerCoachData الي بداتا بيس وحط مكانها trainerCoachData نفسها بس ظاف عليها فا الداتا القديمة ما تعدلت فا امسح الي في trineday الي في الداتا بيس

    navigation.goBack(); //هاي خليها ما تقيمها
  };

  const [trainerCoachData, setTrainerCoachData] = useState([
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
      ID_Trainer: 5,
      name: "John",
      Age: 28,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdWwVU65gZW5--Ypno_l2GBNhI_sinWkNUw&s",
    },
    {
      ID_Trainer: 10,
      name: "David",
      Age: 30,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTfdWwVU65gZW5--Ypno_l2GBNhI_sinWkNUw&s",
    },
  ]);
  useFocusEffect(
    useCallback(() => {
      //هون عشان تجيب كل تيبل وتخزمها بمكانها وانتبه ان قارن بين كل تيبل وحطها بمكانها المناسب يعني اطلع على كل الداتا الي موجودة فوق وخزن الداتا المناسبه الها الي في الداتا بيس
    })
  );
  useFocusEffect(
    useCallback(() => {
      let count = 0;
      trainerCoachData.filter((item) => {
        if (
          item.ID_Specialist === IDSpecialist &&
          (item.Accepted === "t" || item.Accepted === "T")
        ) {
          count++;
        }
      });
      setcounttrner(count);
    }, [trainerCoachData, IDSpecialist])
  );
  const Accept = (id) => {
    setTrainerCoachData((prevData) =>
      prevData.map((item) =>
        item.ID_Trainer === id ? { ...item, Accepted: "t" } : item
      )
    );
  };

  const Reject = (id) => {
    setTrainerCoachData((prevData) =>
      prevData.map((item) =>
        item.ID_Trainer === id ? { ...item, Accepted: "f" } : item
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
            <Text style={styles.title}>Request trainees </Text>
          </View>
        </View>
        <View style={styles.info}>
          <View style={styles.wrapper}>
            <Text style={styles.textLabel}>Health system trainees:</Text>
            <Text style={styles.textValue}>{counttrner}Trainees</Text>
          </View>

          {trainerCoachData
            .filter(
              (item) =>
                item.ID_Specialist === IDSpecialist &&
                (item.Accepted == "p" || item.Accepted == "P")
            )
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
});

export default Requesttrainingspecilat;
