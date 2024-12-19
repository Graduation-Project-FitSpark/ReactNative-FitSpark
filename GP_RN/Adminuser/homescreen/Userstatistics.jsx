import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
function Userstatistics() {
  const navigation = useNavigation();
  const [lengthcoach, setlengthcoach] = useState();
  const [lengthSpecialist, setlengthSpecialist] = useState();
  const [lengthTrainess, setlengthTrainess] = useState();
  const [Totaluser, setTotaluser] = useState();
  const [trainessChange, setTrainessChange] = useState("");
  const [coachChange, setcoachChange] = useState("");
  const [specialistChange, setspecialistChange] = useState("");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear() + 1;
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
      Dateenter: "2025-11-06",
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
      Points: 0,
      Img: null,
      YearsOfExperience: 7,
      Dateenter: "2025-12-06",
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
      Dateenter: "2025-5-06",
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
      Dateenter: "2025-4-06",
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
      Dateenter: "2025-11-06",
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
      Dateenter: "2025-12-06",
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
      Dateenter: "2025-11-06",
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
      Points: 0,
      Img: null,
      YearsOfExperience: 7,
      Dateenter: "2025-12-06",
      AcceptedDescription: "A",
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
      WatchedVideos: 0,
      Token: null,
      Username: "user_7737",
      Height: 150,
      Weight: 100,
      Dateenter: "2025-12-06",
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
      Dateenter: "2025-11-06",
      Age: 12,
    },
  ];

  useEffect(() => {
    const countcoach = coach.filter((user) => {
      const [year, month, day] = user.Dateenter.split("-");
      return (
        user.AcceptedDescription === "A" &&
        currentMonth === parseInt(month) &&
        currentYear === parseInt(year)
      );
    }).length;
    setlengthcoach(countcoach);

    const countSpecialist = Specialist.filter((user) => {
      const [year, month, day] = user.Dateenter.split("-");
      return (
        user.AcceptedDescription === "A" &&
        currentMonth === parseInt(month) &&
        currentYear === parseInt(year)
      );
    }).length;
    setlengthSpecialist(countSpecialist);

    const countTrainess = Trainess.filter((user) => {
      const [year, month, day] = user.Dateenter.split("-");
      return currentMonth === parseInt(month) && currentYear === parseInt(year);
    }).length;

    setlengthTrainess(countTrainess);
    setTotaluser(Trainess.length + coach.length + Specialist.length);

    const countTrainesspass = Trainess.filter((user) => {
      const [year, month, day] = user.Dateenter.split("-");
      return (
        currentMonth - 1 === parseInt(month) && currentYear === parseInt(year)
      );
    }).length;

    if (countTrainess > countTrainesspass) {
      setTrainessChange("up vs last month ");
    } else if (countTrainess < countTrainesspass) {
      setTrainessChange("down vs last month ");
    } else {
      setTrainessChange("no change vs last month ");
    }

    const countcoachspass = coach.filter((user) => {
      const [year, month, day] = user.Dateenter.split("-");
      return (
        currentMonth - 1 === parseInt(month) && currentYear === parseInt(year)
      );
    }).length;

    if (countcoach > countcoachspass) {
      setcoachChange("up vs last month ");
    } else if (countcoach < countcoachspass) {
      setcoachChange("down vs last month ");
    } else {
      setcoachChange("no change vs last month ");
    }

    const countSpecialistspass = Specialist.filter((user) => {
      const [year, month, day] = user.Dateenter.split("-");
      return (
        currentMonth - 1 === parseInt(month) && currentYear === parseInt(year)
      );
    }).length;

    if (countSpecialist > countSpecialistspass) {
      setspecialistChange("up vs last month ");
    } else if (countSpecialist < countSpecialistspass) {
      setspecialistChange("down vs last month ");
    } else {
      setspecialistChange("no change vs last month ");
    }
  }, [coach, Specialist, Trainess, currentMonth]);

  return (
    <View style={styles.Userstatistics}>
      <View style={styles.row}>
        <View style={styles.card}>
          <View style={styles.title}>
            <Text style={styles.label}>Total Trainees</Text>
            <View style={[styles.icondiv, { backgroundColor: "#94E075" }]}>
              <IconIonicons name="barbell" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.value}>{lengthTrainess}</Text>

          <View style={styles.footer}>
            {trainessChange === "up vs last month " && (
              <IconIonicons name="arrow-up-outline" size={16} color="#4CAF50" />
            )}
            {trainessChange === "down vs last month " && (
              <IconIonicons
                name="arrow-down-outline"
                size={16}
                color="#FF5722"
              />
            )}
            {trainessChange !== "down vs last month " &&
              trainessChange !== "up vs last month " && (
                <IconIonicons name="remove-outline" size={16} color="#757575" />
              )}
            <Text
              style={[
                styles.changeText,
                {
                  color:
                    trainessChange === "up vs last month "
                      ? "#4CAF50"
                      : trainessChange === "down vs last month "
                      ? "#FF5722"
                      : "#757575",
                },
              ]}
            >
              {trainessChange === "up vs last month "
                ? "up vs last month "
                : trainessChange === "down vs last month "
                ? "dow vs last month "
                : "no change vs last month "}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.title}>
            <Text style={styles.label}>Total Coach</Text>
            <View style={[styles.icondiv, { backgroundColor: "#E19083" }]}>
              <IconIonicons name="person-add" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.value}>{lengthcoach}</Text>

          <View style={styles.footer}>
            {coachChange === "up vs last month " && (
              <IconIonicons name="arrow-up-outline" size={16} color="#4CAF50" />
            )}
            {coachChange === "down vs last month " && (
              <IconIonicons
                name="arrow-down-outline"
                size={16}
                color="#FF5722"
              />
            )}
            {coachChange !== "down vs last month " &&
              coachChange !== "up vs last month " && (
                <IconIonicons name="remove-outline" size={16} color="#757575" />
              )}
            <Text
              style={[
                styles.changeText,
                {
                  color:
                    coachChange === "up vs last month "
                      ? "#4CAF50"
                      : coachChange === "down vs last month "
                      ? "#FF5722"
                      : "#757575",
                },
              ]}
            >
              {coachChange === "up vs last month "
                ? "up vs last month "
                : coachChange === "down vs last month"
                ? "down vs last month "
                : "no change vs last month "}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <View style={styles.title}>
            <Text style={styles.label}>Total Specialist </Text>
            <View style={[styles.icondiv, { backgroundColor: "#E0DB87" }]}>
              <IconIonicons name="fast-food" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.value}>{lengthSpecialist}</Text>
          <View style={styles.footer}>
            {specialistChange === "up vs last month " && (
              <IconIonicons name="arrow-up-outline" size={16} color="#4CAF50" />
            )}
            {specialistChange === "down vs last month " && (
              <IconIonicons
                name="arrow-down-outline"
                size={16}
                color="#FF5722"
              />
            )}
            {specialistChange !== "down vs last month " &&
              specialistChange !== "up vs last month " && (
                <IconIonicons name="remove-outline" size={16} color="#757575" />
              )}
            <Text
              style={[
                styles.changeText,
                {
                  color:
                    specialistChange === "up vs last month "
                      ? "#4CAF50"
                      : specialistChange === "down vs last month "
                      ? "#FF5722"
                      : "#757575",
                },
              ]}
            >
              {specialistChange === "up vs last month "
                ? "up vs last month "
                : specialistChange === "down vs last month "
                ? "down vs last month "
                : "no change vs last month "}
            </Text>
          </View>
        </View>
        <View style={styles.card}>
          <View style={styles.title}>
            <Text style={styles.label}>Total User </Text>
            <View style={[styles.icondiv, { backgroundColor: "#8FBEE0" }]}>
              <IconIonicons name="people" size={16} color="#fff" />
            </View>
          </View>
          <Text style={styles.value}>{Totaluser}</Text>
        </View>
      </View>
      <View style={styles.seemore}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Alltatistics")}
        >
          <Text style={styles.buttonText}>See More</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  Userstatistics: {
    padding: 16,
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
    color: "#000",
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
  button: {
    width: "21%",
    backgroundColor: "#b2f200",
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  buttonText: {
    color: "#000",
    fontSize: 12,
    fontWeight: "600",
  },
  seemore: {
    width: "100%",
    alignItems: "flex-end",
  },
});

export default Userstatistics;
