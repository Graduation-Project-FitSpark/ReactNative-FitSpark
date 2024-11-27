import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import Ring from "./RingProgress.jsx";
import Quiz from "./Quizcomponenthomepage.jsx";
import Section from "./Gotosection.jsx";
import Inoutwalking from "./Inoutwalking.jsx";
import { styles } from "./styleshomepage";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../enum.js";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const windowWidth = Dimensions.get("window").width;
const currentHour = new Date().getHours();
let greeting = currentHour < 12 ? "Good Morning" : "Good Evening";
const data = [
  {
    id: "1",
    phrase: "Transform Your Life",
    image: require("../img/homeimg1.jpg"),
  },
  { id: "2", phrase: "Stay Strong", image: require("../img/homeimg5.jpg") },
  { id: "3", phrase: "Keep Going", image: require("../img/homeimg3.jpg") },
];

// App Component
const Home = () => {
  const navigation = useNavigation();
  const scrollViewRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState("right");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userData, setUserData] = useState({
    name: "unknown",
  });
  const [showSection, setShowSection] = useState(false);
  const cardWidth = windowWidth * 0.8;

  useFocusEffect(
    React.useCallback(() => {
      const fetchTrainerDetails = async () => {
        try {
          const username = await AsyncStorage.getItem("username");
          setUserData({ name: username });

          const trainerResponse = await axios.post(`${URL}/getTrainerDetails`, {
            username,
          });

          const trainerID = trainerResponse.data.trainer.ID_Trainer;
          await AsyncStorage.setItem("ID", trainerID);

          if (trainerID) {
            const userResultResponse = await fetch(
              `${URL}/ifUserResultExsists`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ ID_Trainer: trainerID }),
              }
            );

            const userResultData = await userResultResponse.json();
            console.log(userResultData.exists);

            if (userResultData.exists === true) {
              setShowSection(true);
            } else {
              setShowSection(false);
            }
          }

          try {
            const coachResponse = await axios.post(
              `${URL}/checkCoachResponse`,
              {
                trainerId: trainerID,
              }
            );

            const specialistResponse = await axios.post(
              `${URL}/checkSpecialistResponse`,
              {
                trainerId: trainerID,
              }
            );

            if (coachResponse.data.Accepted === "R") {
              const response = await axios.post(`${URL}/deleteCoach`, {
                trainerId: trainerID,
              });
              navigation.navigate("SelectCoach");
            } //
            if (specialistResponse.data.Accepted === "R") {
              const response = await axios.post(`${URL}/deleteSpecialist`, {
                trainerId: trainerID,
              });
              navigation.navigate("SelectSpecialist");
            }
          } catch (err) {
            console.error("Error checking status:", err);
          }
        } catch (error) {
          console.error(
            "Error fetching trainer or user result details:",
            error
          );
        }
      };

      fetchTrainerDetails();
    }, [])
  );

  useEffect(() => {
    const interval = setInterval(() => {
      let newIndex = currentIndex;

      if (scrollDirection === "right") {
        newIndex += 1;
        if (newIndex >= data.length - 1) {
          setScrollDirection("left");
        }
      } else {
        newIndex -= 1;
        if (newIndex <= 0) {
          setScrollDirection("right");
        }
      }

      setCurrentIndex(newIndex);
      const newOffset = newIndex * cardWidth;

      scrollViewRef.current.scrollTo({ x: newOffset, animated: true });
    }, 1500);

    return () => clearInterval(interval);
  }, [currentIndex, scrollDirection, cardWidth]);

  const date = new Date().toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <View style={styles.container}>
      <View style={styles.welcom}>
        <Text>{greeting} 🔥</Text>
        <View style={styles.namedate}>
          <Text style={styles.name}>{userData.name}</Text>
          <Text style={styles.date}>{date}</Text>
        </View>
      </View>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        snapToInterval={cardWidth}
        decelerationRate="fast"
        scrollEnabled={false}
      >
        {data.map((item) => (
          <View key={item.id} style={styles.card}>
            <ImageBackground
              source={item.image}
              resizeMode="cover"
              style={styles.image}
            >
              <View style={styles.textContainer}>
                <Text style={styles.cardText}>{item.phrase}</Text>
                <Text style={styles.cardSubtitle}>
                  See more <Text style={styles.arrow}>&gt;</Text>
                </Text>
              </View>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>
      {}
      <Ring />
      {}
      <Inoutwalking />
      {}
      {showSection ? <Section /> : <Quiz />}
    </View>
  );
};

export default Home;
