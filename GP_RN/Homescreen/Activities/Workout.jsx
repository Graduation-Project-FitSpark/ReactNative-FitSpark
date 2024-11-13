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

function Workout() {
  let cal = 5;
  let steps = 99;
  let maxsteps = 2000;
  let meters = 23;
  const today = new Date();
  const navigation = useNavigation();
  const date = new Date();

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "long",
  });

  const [todayPlan, settodayPlan] = useState([
    {
      id: 1,
      name: "Push Up",
      description:
        "The lower abdomen and hips are the most difficult areas of the body to reduce when we are on a diet. Even so, in this area, especially the legs as a whole, you can reduce weight even if you don't use tools.",
      goal: "100 Push up a day",
      progress: 45,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSv8DHqz8RFaA8jEqtRODUG6o9WQktS0RX_Q&s",
      videolink:
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      cal: 95,
    },
    {
      id: 2,
      name: "Sit Up",
      description:
        "The lower abdomen and hips are the most difficult areas of the body to reduce when we are on a diet. Even so, in this area, especially the legs as a whole, you can reduce weight even if you don't use tools.",
      goal: "20 Sit up a day",
      progress: 75,
      imageUrl: "https://example.com/sit_up_image.jpg",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
      cal: 45,
    },
    {
      id: 3,
      name: "Knee Push Up",
      description: "Beginner",
      goal: "50 Knee Push up a day",
      progress: 60,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSv8DHqz8RFaA8jEqtRODUG6o9WQktS0RX_Q&s",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
      cal: 33,
    },
    {
      id: 4,
      name: "Squats",
      description: "Intermediate",
      goal: "100 Squats a day",
      progress: 30,
      imageUrl: "https://example.com/squats_image.jpg",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
      cal: 55,
    },
    {
      id: 5,
      name: "Lunges",
      description: "Beginner",
      goal: "50 Lunges a day",
      progress: 40,
      imageUrl: "https://example.com/lunges_image.jpg",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
      cal: 45,
    },
    {
      id: 6,
      name: "Plank",
      description: "Intermediate",
      goal: "5 Minutes Plank",
      progress: 80,
      imageUrl: "https://example.com/plank_image.jpg",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
    },
    {
      id: 8,
      name: "Mountain Climbers",
      description: "Advanced",
      goal: "200 Mountain Climbers",
      progress: 50,
      imageUrl: "https://example.com/mountain_climbers_image.jpg",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
      cal: 45,
    },
  ]);

  const [trineday] = useState([
    { ID_Trains: [1, 3], Day_Of_Week: "Monday" },
    { ID_Trains: [2], Day_Of_Week: "Tuesday" },
    { ID_Trains: [6, 4, 8], Day_Of_Week: "Wednesday" },
  ]);

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
  }, [formattedDate, todayPlan]);

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
