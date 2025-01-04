import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { ProgressBar, MD3Colors } from "react-native-paper";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../enum";
const Award = ({ navigation }) => {
  const [Awardspoint, setAwardspoint] = useState(0);
  const [Awards, setAwards] = useState([]);

  useEffect(() => {
    const fetchPoints = async () => {
      try {
        try {
          const response = await axios.get(`${URL}/getAwards`);
          const awards = response.data.awards.map((item) => ({
            point: item.point,
            name: item.name,
            photoUrl: item.photoUrl,
          }));
          setAwards(awards);
        } catch (error) {
          console.error("Error fetching awards:", error);
        }
        const trainerId = await AsyncStorage.getItem("ID");
        const response = await axios.post(`${URL}/getPoints`, {
          trainerId: trainerId,
        });
        if (response.status === 200) {
          setAwardspoint(response.data.points);
        }
      } catch (error) {
        console.error("Error fetching points:", error);
      }
    };

    fetchPoints();
  }, []);

  const pointAwards = () => {
    const elements = [];

    for (let i = 0; i < Awards.length; i += 3) {
      const batch = Awards.slice(i, i + 3);

      elements.push(
        <View key={i} style={styles.batchContainer}>
          {batch.map((item, index) => {
            if (Awardspoint >= item.point) {
              return (
                <View key={index} style={styles.outer}>
                  <View style={styles.outeritem}>
                    <Image
                      style={styles.pointimg}
                      source={{ uri: item.photoUrl }}
                    />

                    <Text style={styles.namepoint}>{item.name}</Text>
                    <View style={styles.namepoint}>
                      <Text style={styles.pointof}>
                        {Awardspoint + (item.point - Awardspoint)} of{" "}
                        {item.point}{" "}
                      </Text>
                    </View>
                    <ProgressBar
                      progress={
                        Awardspoint > item.point ? item.point : Awardspoint
                      }
                      target={item.point}
                      color={"#b2f200"}
                    />
                  </View>
                </View>
              );
            }
            return (
              <View key={index} style={styles.outer}>
                <View style={styles.outeritem}>
                  <Image
                    style={styles.notpointimg}
                    source={{ uri: item.photoUrl }}
                  />
                  <Text style={styles.namepoint}>{item.name}</Text>
                  <View style={styles.namepoint}>
                    <Text style={styles.pointof}>
                      {Awardspoint} of {item.point}
                    </Text>
                  </View>

                  <ProgressBar
                    progress={Awardspoint * 0.004}
                    target={item.point * 0.004}
                    color={"#b2f200"}
                  />
                </View>
              </View>
            );
          })}
        </View>
      );
    }

    return elements;
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollEnabled={true}
      >
        <View style={styles.header}>
          <View style={styles.inertheader}>
            <IconIonicons
              name="chevron-back-outline"
              size={24}
              color="#000"
              style={styles.icon}
              onPress={() => navigation.goBack()}
            />
            <Text style={styles.textheader}>Awards</Text>
          </View>
          <Text style={styles.textpoint}>Your Points: {Awardspoint}</Text>
        </View>
        <View>{pointAwards()}</View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 20,
    width: "100%",
  },
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    marginRight: "10px",
  },
  header: {
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingRight: 10,
  },
  inertheader: {
    flexDirection: "row",
    gap: 20,
  },
  icon: {
    marginTop: 25,
  },
  textheader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 20,
  },
  namepoint: {
    fontSize: 10,
    width: "100%",
    justifyContent: "center",
  },
  textpoint: {
    fontSize: 16,

    marginBottom: 10,
    marginTop: 26,
  },
  batchContainer: {
    marginBottom: 3,
    flexDirection: "row",
    gap: 1,
  },
  outer: {
    marginBottom: 10,
  },
  outeritem: {
    padding: 10,
  },
  tinyLogo: {
    width: 50,
    height: 50,
  },
  pointimg: {
    width: 90,
    height: 90,
  },
  notpointimg: {
    width: 90,
    height: 90,

    opacity: 0.2,
  },
  pointof: {
    fontSize: 12,
    color: "#818181",
    marginTop: 5,
  },
});

export default Award;
