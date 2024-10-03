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

import { styles } from "./styleshomepage";

// Define window dimensions
const windowWidth = Dimensions.get("window").width;

// Sample data for cards
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
const home = () => {
  const scrollViewRef = useRef(null);
  const [scrollDirection, setScrollDirection] = useState("right");
  const [currentIndex, setCurrentIndex] = useState(0);

  // Calculate the width of each card based on the window width
  const cardWidth = windowWidth * 0.8;

  // ScrollView auto-scroll effect
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

  return (
    <View style={styles.container}>
      <View style={styles.welcom}>
        <Text>Good Morning 🔥</Text>
        <Text style={styles.name}>Mahmoud Arafat</Text>
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
                <Text style={styles.cardSubtitle}>See more</Text>
              </View>
              <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.playIcon}>▶</Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        ))}
      </ScrollView>

      {/* Ring component */}
      <Ring />
      {/* Menubar component without NavigationContainer */}
    </View>
  );
};

export default home;
