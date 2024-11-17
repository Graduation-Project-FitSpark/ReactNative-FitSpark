import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { format, addDays, subDays } from "date-fns";
import notraining from "../../img/notraining.png";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import URL from "../../enum.js";
function Workout() {
  let maxsteps = 10000;

  const [cal, setCal] = useState(0);
  const [steps, setSteps] = useState(0);
  const [meters, setMeters] = useState(0);
  const today = new Date();
  const navigation = useNavigation();
  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const [todayPlan, settodayPlan] = useState([]);
  const [trineday, settrineday] = useState([]);

  useEffect(() => {
    const fetchTodayCalories = async () => {
      try {
        const ID = await AsyncStorage.getItem("ID");

        const response = await axios.post(`${URL}/getTodayCalories`, {
          trainerId: ID,
        });
        const { Calories, Steps, Distance } = response.data;

        setCal(Calories);
        setSteps(Steps);
        setMeters(Distance);
        console.log("Calories:", Calories);
        console.log("Steps:", Steps);
        console.log("Distance (Meters):", Distance);
      } catch (error) {
        console.error("Error fetching today's calories:", error);
      }
    };

    const fetchWorks = async () => {
      try {
        const ID = await AsyncStorage.getItem("ID");
        const response = await axios.post(`${URL}/getWorks`);
        const works = response.data.map((work) => ({
          id: work.id,
          name: work.name,
          description: work.description,
          goal: work.goal,
          progress: Math.floor(Math.random() * 100),
          imageUrl: work.imageUrl,
          videolink: work.videolink,
          cal: work.cal,
        }));
        settodayPlan(works);

        const trainerResponse = await fetch(`${URL}/getTrainerWorks`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ trainerId: ID }),
        });
        const result = await trainerResponse.json();
        settrineday(result);
      } catch (error) {
        console.error("Error fetching data:", error.message);
      }
    };

    fetchWorks();
    fetchTodayCalories();
  }, []);

  const [data, setData] = useState([
    {
      day: "S",
      date: format(subDays(today, today.getDay()), "dd"),
      isSelected: today.getDay() === 0,
      Day_Of_Week: "Sunday",
    },
    {
      day: "M",
      date: format(addDays(subDays(today, today.getDay()), 1), "dd"),
      isSelected: today.getDay() === 1,
      Day_Of_Week: "Monday",
    },
    {
      day: "T",
      date: format(addDays(subDays(today, today.getDay()), 2), "dd"),
      isSelected: today.getDay() === 2,
      Day_Of_Week: "Tuesday",
    },
    {
      day: "W",
      date: format(addDays(subDays(today, today.getDay()), 3), "dd"),
      isSelected: today.getDay() === 3,
      Day_Of_Week: "Wednesday",
    },
    {
      day: "T",
      date: format(addDays(subDays(today, today.getDay()), 4), "dd"),
      isSelected: today.getDay() === 4,
      Day_Of_Week: "Thursday",
    },
    {
      day: "F",
      date: format(addDays(subDays(today, today.getDay()), 5), "dd"),
      isSelected: today.getDay() === 5,
      Day_Of_Week: "Friday",
    },
    {
      day: "S",
      date: format(addDays(subDays(today, today.getDay()), 6), "dd"),
      isSelected: today.getDay() === 6,
      Day_Of_Week: "Saturday",
    },
  ]);

  const [filteredPlan, setFilteredPlan] = useState([]);

  useEffect(() => {
    const matchingTrains = trineday
      .filter((train) => train.Day_Of_Week === formattedDate)
      .flatMap((train) => train.ID_Trains);

    const matchingPlan = todayPlan.filter((plan) =>
      matchingTrains.includes(plan.id)
    );

    setFilteredPlan(matchingPlan);
    setData((prevData) =>
      prevData.map((item) =>
        item.Day_Of_Week === formattedDate
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );
  }, [formattedDate, todayPlan, trineday]);

  const selectDay = (selectedDay) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.Day_Of_Week === selectedDay.Day_Of_Week
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );

    const matchingTrains = trineday
      .filter((train) => train.Day_Of_Week === selectedDay.Day_Of_Week)
      .flatMap((train) => train.ID_Trains);

    const matchingPlan = todayPlan.filter((plan) =>
      matchingTrains.includes(plan.id)
    );

    setFilteredPlan(matchingPlan);
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.toptitle}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconIonicons name="chevron-back-outline" size={25} color="#000" />
          </TouchableOpacity>
          <View style={styles.toptitlenamecontener}>
            <Text style={styles.toptitlename}>Treinar Plan</Text>
          </View>
        </View>
        <View style={styles.container1}>
          <View style={styles.calorierogressBox}>
            <View style={styles.calorierogressBoxouter}>
              <View style={styles.caloriesBox}>
                <Text style={styles.title}>Active calories</Text>
                <Text style={styles.value}>{cal} Cal</Text>
              </View>
              <View style={styles.caloriesBox2}>
                <Text style={styles.title}>Active calories</Text>
                <Text style={styles.value}>{cal} Cal</Text>
              </View>
            </View>

            <View style={styles.progressBox}>
              <View style={styles.ttrininfo}>
                <TouchableOpacity
                  style={styles.backicontreinar}
                  onPress={() => navigation.goBack()}
                >
                  <IconIonicons name="barbell-outline" size={20} color="#000" />
                </TouchableOpacity>
                <View style={styles.toptitlenamecontener}>
                  <Text style={styles.ttrininfotitlename}>Treinar </Text>
                </View>
              </View>

              <View style={[styles.circle, { borderWidth: (100 * 5) / 100 }]}>
                <Text style={styles.progressText}>80</Text>
              </View>
            </View>
          </View>
          <View style={styles.stepsencouragementBox}>
            <View style={styles.stepsBox}>
              <View style={styles.ttrininfo}>
                <TouchableOpacity
                  style={styles.backiconsteps}
                  onPress={() => navigation.goBack()}
                >
                  <IconIonicons name="walk-outline" size={20} color="#000" />
                </TouchableOpacity>
                <View style={styles.toptitlenamecontener}>
                  <Text style={styles.stepsinfotitlename}>Steps </Text>
                </View>
              </View>

              <Text style={styles.value}>
                {steps}/{maxsteps}
              </Text>
            </View>

            <View style={styles.metersBox}>
              <View style={styles.ttrininfo}>
                <TouchableOpacity
                  style={styles.backiconmeters}
                  onPress={() => navigation.goBack()}
                >
                  <IconIonicons
                    name="analytics-outline"
                    size={20}
                    color="#000"
                  />
                </TouchableOpacity>
                <View style={styles.toptitlenamecontener}>
                  <Text style={styles.ttrininfotitlename}>Meters </Text>
                </View>
              </View>

              <Text style={styles.value}>{meters}</Text>
            </View>
          </View>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContainer2}
          showsHorizontalScrollIndicator={false}
        >
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayContainer,
                item.isSelected && styles.selectedDay,
              ]}
              onPress={() => selectDay(item)}
            >
              <Text
                style={[
                  styles.dayText,
                  item.isSelected && styles.selectedDayText,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  item.isSelected && styles.selectedDayText,
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        <View style={styles.planContainer}>
          <Text style={styles.header}>Today's Plan</Text>
          {filteredPlan.length > 0 ? (
            filteredPlan.map((planItem) => (
              <TouchableOpacity
                key={planItem.id}
                onPress={() => navigation.navigate("Exercise", planItem)}
              >
                <View style={styles.exerciseCard}>
                  <Image
                    source={{ uri: planItem.imageUrl }}
                    style={styles.image}
                  />
                  <View style={styles.details}>
                    <Text style={styles.name}>{planItem.name}</Text>
                    <Text style={styles.goal}>{planItem.goal}</Text>
                    <View style={styles.progressBar}>
                      <View
                        style={[
                          styles.progress,
                          { width: `${planItem.progress}%` },
                        ]}
                      />
                    </View>
                  </View>
                </View>
              </TouchableOpacity>
            ))
          ) : (
            <View style={styles.container2}>
              <ImageBackground
                source={notraining}
                resizeMode="cover"
                style={styles.image2}
              ></ImageBackground>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
  },
  treanouter: {
    padding: 20,
  },
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingTop: 30,
  },
  textheader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  toptitlenamecontener: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  toptitle: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 10,
    marginBottom: 10,
  },
  toptitlename: {
    fontWeight: "bold",
    fontSize: 20,
  },
  outer: {
    marginTop: 5,
  },
  outeritem: {
    width: "100%",
    height: 110,
    marginVertical: 5,
    borderRadius: 11,
    backgroundColor: "#eaf3fc",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  imagetrine: {
    width: "30%",
  },
  image: {
    resizeMode: "cover",
    borderRadius: 10,
    width: 80,
    height: 70,
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 10,
    gap: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionContainer: {
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginVertical: 5,
  },
  descriptionText: {
    color: "gray",
    fontSize: 14,
  },

  progressBarContainer: {
    height: 15,
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },

  progressText: {
    position: "absolute",
    right: 5,
    top: 1,
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
  scrollContainer2: {
    paddingLeft: 10,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BBF246",
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 5,
    width: 50,
    height: 50,
  },
  selectedDay: {
    backgroundColor: "#333333",
  },
  selecteddayText: {
    color: "#fff",
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  dateText: {
    fontSize: 12,
    color: "#000",
  },

  container1: {
    flexDirection: "row",

    paddingHorizontal: 16,
    paddingVertical: 8,
    marginBottom: 10,
  },
  calorierogressBox: {
    width: "60%",
    justifyContent: "space-between",
  },
  calorierogressBoxouter: {
    flexDirection: "row",
    width: "100%",
    gap: 10,
  },
  caloriesBox: {
    backgroundColor: "#D8E6EC",

    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  caloriesBox2: {
    backgroundColor: "#F9B9B9",

    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  progressBox: {
    backgroundColor: "#EAECFF",
    padding: 15,
    width: "90%",
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  infoprogressBox: {
    width: "100%",
    justifyContent: "space-between",
    flexDirection: "row",
  },
  stepsencouragementBox: {
    width: "35%",
    justifyContent: "space-between",
  },
  stepsBox: {
    backgroundColor: "#fff3e0",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    marginTop: 15,
  },
  metersBox: {
    backgroundColor: "#F0E7FC",
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  encouragementBox: {
    backgroundColor: "#F6CFCF",
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 10,
    fontWeight: "600",
    color: "#333",
  },
  value: {
    fontSize: 15,
    fontWeight: "bold",
    color: "#333",
    marginTop: 4,
  },
  circle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 5,
    borderColor: "#6a5acd",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
  },
  progressText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#6a5acd",
  },
  encouragementText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  ttrininfo: {
    flexDirection: "row",
    width: "100%",
  },
  ttrininfotitlename: {
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 32,
  },
  stepsinfotitlename: {
    fontWeight: "bold",
    fontSize: 15,
    marginRight: 40,
  },
  backicontreinar: {
    backgroundColor: "#cfd3fc",
    borderRadius: 7,

    borderWidth: 5,
    borderColor: "#cfd3fc",
  },
  backiconsteps: {
    backgroundColor: "#F8D39D",
    borderRadius: 7,

    borderWidth: 5,
    borderColor: "#F8D39D",
  },
  backiconmeters: {
    backgroundColor: "#E2CFFA",
    borderRadius: 7,

    borderWidth: 5,
    borderColor: "#E2CFFA",
  },

  selectedDayText: {
    color: "#fff",
  },

  planContainer: {
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  exerciseCard: {
    flexDirection: "row",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eaf3fc",
  },

  details: {
    flex: 1,
    paddingLeft: 10,
    gap: 5,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  goal: {
    color: "gray",
    fontSize: 14,
  },

  progressBar: {
    height: 10,
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },

  progress: {
    height: "100%",
    backgroundColor: "#b2f200",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
  },

  image2: {
    resizeMode: "cover",
    borderRadius: 11,
    width: 300,
    height: 300,
  },
});

export default Workout;
