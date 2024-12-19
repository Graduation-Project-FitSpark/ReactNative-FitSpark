import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import Model from "./Modelchart.jsx";

function AllUserstatistics() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [sale, setsale] = useState();
  const [totleWatchedVideos, settotleWatchedVideos] = useState();
  const [maxpointcoach, setmaxpointcoach] = useState();
  const [maxpointSpecialist, setmaxpointSpecialist] = useState();
  const [vlauemaxpointcoach, setvlauemaxpointcoach] = useState();
  const [vlauemaxpointSpecialist, setvlauemaxpointSpecialist] = useState();

  const navigation = useNavigation();

  const handlePress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const saleData = [
    //هون لازم يكون في تيبل كل ما يبنباع اشي يسجلهم في تيبل ما بزبط في تيبدل تاعت الشوب لانو هدايك في كونتيتي
    {
      ID_Sale: 1,
      Sale_Name: "Sample Product",
      Price: 19.99,
      Description: "This is a sample sale product.",
    },
    {
      ID_Sale: 2,
      Sale_Name: "Sample Product",
      Price: 19.99,
      Description: "This is a sample sale product.",
    },
    {
      ID_Sale: 2,
      Sale_Name: "Sample Product",
      Price: 19.99,
      Description: "This is a sample sale product.",
    },
  ];
  const Trainess = [
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
      WatchedVideos: 5,
      Token: null,
      Username: "user_7737",
      Height: 150,
      Weight: 100,
      Dateenter: "2024-12-06",
      Age: 12,
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
      Dateenter: "2024-04-06",
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
      Dateenter: "2024-05-06",
      Age: 12,
    },
  ];
  const coach = [
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
      Dateenter: "2024-02-05",
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
      Dateenter: "2021-05-05",
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
      Dateenter: "2024-05-05",
      AcceptedDescription: "P",
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
      Points: 500,
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
      AcceptedDescription: "A",
    },
  ];
  const Specialist = [
    {
      ID_Specialist: 1,
      Username: "Ali",
      Email: "masdm",
      First_Name: "Ali",
      Last_Name: "nbasd",
      Phone_Number: "flkj;d",
      Age: 26,
      Gender: "Male",
      Location: "Nablus",
      Points: 100,
      Img: null,
      YearsOfExperience: 7,
      Dateenter: "2020-04-06",
      AcceptedDescription: "A",
    },
    {
      ID_Specialist: "7ce0612a-892a-4429-89cc-0d6d7aa1f72a",
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
      Dateenter: "2020-04-06",
      AcceptedDescription: "A",
    },
    {
      ID_Specialist: "924facco-b571-4611-9e70-c7a7ff2af929",
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
      Dateenter: "2020-04-06",
      AcceptedDescription: "A",
    },
    {
      ID_Specialist: "9eaa7962-2c52-418e-9826-86beb2e6392b",
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
      ID_Specialist: "ca667de4-2ae9-42fd-98dc-487e%6-ldd6lf",
      Username: "Vector",
      Email: "ashayera44@gmail.com",
      First_Name: "Vector",
      Last_Name: "Marcos",
      Phone_Number: "059495949",
      Age: 34,
      Gender: "Male",
      Location: "37.72010281317459, -122.430373853449",
      Points: 400,
      Img: null,
      YearsOfExperience: 7,
      Dateenter: "2020-04-06",
      AcceptedDescription: "A",
    },
  ];
  useEffect(() => {
    let countWatchedVideos = 0;
    let maxpointcoach = 0;
    let idcoach;
    let maxpointSpecialist = 0;
    let idSpecialist;
    Trainess.forEach((user) => {
      countWatchedVideos += user.WatchedVideos;
    });
    settotleWatchedVideos(countWatchedVideos);

    coach.forEach((user) => {
      if (maxpointcoach < user.Points && user.AcceptedDescription === "A") {
        maxpointcoach = user.Points;
        idcoach = user.ID_Coach;
      }
    });
    setmaxpointcoach(idcoach);
    setvlauemaxpointcoach(maxpointcoach);
    Specialist.forEach((user) => {
      if (
        maxpointSpecialist < user.Points &&
        user.AcceptedDescription === "A"
      ) {
        maxpointSpecialist = user.Points;
        idSpecialist = user.ID_Specialist;
      }
    });
    setmaxpointSpecialist(idSpecialist);
    setvlauemaxpointSpecialist(maxpointSpecialist);
    setsale(saleData.length);
  }, [saleData, Trainess, Specialist, coach]);
  return (
    <ScrollView style={styles.outerAlltatistics}>
      <View style={styles.inertheader}>
        <IconIonicons
          name="chevron-back-outline"
          size={24}
          color="#000"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.textheader}>System statistics</Text>
      </View>
      <View style={styles.inercontainer}>
        <View style={styles.row}>
          <TouchableOpacity
            style={styles.card}
            onPress={() => handlePress("2000")}
          >
            <View style={styles.title}>
              <Text style={styles.label}>Store Sales</Text>
              <View style={[styles.icondiv, { backgroundColor: "#94E075" }]}>
                <IconIonicons name="bag-check" size={16} color="#fff" />
              </View>
            </View>
            <Text style={styles.value}>{sale}</Text>
            <View style={styles.footer}>
              <IconIonicons name="arrow-up-outline" size={16} color="#4CAF50" />
              <Text style={[styles.changeText, { color: "#4CAF50" }]}>
                +2.5% vs last 7 days
              </Text>
            </View>
          </TouchableOpacity>

          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.label}>Active Users</Text>
              <View style={[styles.icondiv, { backgroundColor: "#70D7FA" }]}>
                <IconIonicons name="checkmark-done" size={16} color="#fff" />
              </View>
            </View>
            <Text style={styles.value}>{totleWatchedVideos}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.label}>Best Coach</Text>
              <View style={[styles.icondiv, { backgroundColor: "#AE92F9" }]}>
                <IconIonicons name="person" size={16} color="#fff" />
              </View>
            </View>
            <Text style={styles.value}>
              {(() => {
                const foundCoach = coach.find(
                  (user) => user.ID_Coach === maxpointcoach
                );
                return foundCoach ? foundCoach.Username : "notfound";
              })()}
            </Text>
            <View style={styles.footer}>
              <Text>With Totle Point :{vlauemaxpointcoach}</Text>
            </View>
          </View>

          <View style={styles.card}>
            <View style={styles.title}>
              <Text style={styles.label}>Best Specialist</Text>
              <View style={[styles.icondiv, { backgroundColor: "#FA503C" }]}>
                <IconIonicons name="person" size={16} color="#fff" />
              </View>
            </View>
            <Text style={styles.value}>
              {(() => {
                const foundSpecialist = Specialist.find(
                  (user) => user.ID_Specialist === maxpointSpecialist
                );
                return foundSpecialist ? foundSpecialist.Username : "notfound";
              })()}
            </Text>
            <View style={styles.footer}>
              <Text>With Totle Point :{vlauemaxpointSpecialist}</Text>
            </View>
          </View>
        </View>
      </View>

      {}
      {modalVisible && (
        <Model
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          iteam={selectedItem}
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  outerAlltatistics: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  inertheader: {
    flexDirection: "row",
    gap: 20,
  },
  textheader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  icon: {
    marginTop: 25,
  },
  inercontainer: {
    paddingTop: 30,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  card: {
    flex: 1,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
    marginHorizontal: 8,
    justifyContent: "space-between",
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
  },
  label: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 12,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
  },
  changeText: {
    fontSize: 12,
    marginLeft: 4,
  },
  icondiv: {
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    width: "20%",
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default AllUserstatistics;
