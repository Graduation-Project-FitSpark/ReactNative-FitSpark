import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import AddAwardsModel from "./AddAwardsModel.jsx";

const AddAwards = () => {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [Awards, setAwards] = useState([
    {
      point: 20,
      photo: require("../../img/ChinUps.jpeg"),
      name: "Fitness Titan",
    },
    {
      point: 40,
      photo: require("../../img/ChinUps.jpeg"),
      name: "Strength Champion",
    },
    {
      point: 60,
      photo: require("../../img/ChinUps.jpeg"),
      name: "Power Icon",
    },
    {
      point: 80,
      photo: require("../../img/ChinUps.jpeg"),
      name: "Endurance Legend",
    },
    {
      point: 100,
      photo: require("../../img/ChinUps.jpeg"),
      name: "Prime Athlete",
    },
    {
      point: 120,
      photo: require("../../img/ChinUps.jpeg"),
      name: "Vitality Hero",
    },
    {
      point: 150,
      photo: require("../../img/ChinUps.jpeg"),
      name: "Peak Performer",
    },
    {
      point: 170,
      photo: require("../../img/ChinUps.jpeg"),
      name: "Muscle Maverick",
    },
    {
      point: 200,
      photo: require("../../img/ChinUps.jpeg"),
      name: "Flex Master",
    },
  ]);

  useEffect(() => {
    const newAwards = {
      point: 250,
      photo: require("../../img/ChinUps.jpeg"),
      name: "Core Conqueror",
    };

    setAwards((prevAwards) => {
      const exists = prevAwards.some(
        (award) => award.point === newAwards.point
      );

      if (!exists) {
        return [...prevAwards, newAwards];
      }
      return prevAwards;
    });
  }, []);

  const addNewAward = (newAward) => {
    setAwards((prevAwards) => [...prevAwards, newAward]);
  };

  const pointAwards = () => {
    const elements = [];

    for (let i = 0; i < Awards.length; i += 3) {
      const batch = Awards.slice(i, i + 3);

      elements.push(
        <View key={i} style={styles.batchContainer}>
          {batch.map((item, index) => {
            return (
              <View key={index} style={styles.outer}>
                <View style={styles.outeritem}>
                  <Image style={styles.pointimg} source={item.photo} />
                  <View style={styles.namepoint}>
                    <Text style={styles.nameawards}>{item.name}</Text>
                    <Text style={styles.pointof}>{item.point}</Text>
                  </View>
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
        </View>
        <View>{pointAwards()}</View>
        <TouchableOpacity
          style={styles.outerTouchableOpacity}
          onPress={() => setModalVisible(true)}
        >
          <View style={styles.innerTouchableOpacity}>
            <IconIonicons name="add" size={30} color="white" />
          </View>
        </TouchableOpacity>
      </ScrollView>
      {modalVisible && (
        <AddAwardsModel
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          addNewAward={addNewAward}
        />
      )}
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
    alignItems: "center",
  },
  nameawards: { fontSize: 10 },
  textpoint: {
    fontSize: 16,

    marginBottom: 10,
    marginTop: 26,
  },
  batchContainer: {
    marginBottom: 3,
    flexDirection: "row",
    gap: 10,
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
  outerTouchableOpacity: {
    padding: 10,
    borderRadius: 50,
    marginTop: -20,
    justifyContent: "center",
    alignItems: "center",
  },
  innerTouchableOpacity: {
    width: 80,
    height: 80,
    borderRadius: 60,
    backgroundColor: "#60DB78",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default AddAwards;
