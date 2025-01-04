import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../enum";

function Notificationspage() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const username = await AsyncStorage.getItem("username");
      try {
        const response = await axios.post(`${URL}/getNotifications`, {
          Msg_To: username,
        });

        const data = response.data.notifications.map((item) => ({
          id: item.Date,
          name: item.Description,
        }));

        setNotifications(data);
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    };

    fetchNotifications();
  }, []);

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
        scrollEnabled={true}
      >
        <View style={styles.header}>
          <IconIonicons
            name="chevron-back-outline"
            size={24}
            color="#000"
            style={styles.icon}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.textheader}>Notifications</Text>
        </View>

        {notifications.map((item) => (
          <View key={item.name} style={styles.outer}>
            <View style={styles.outertem2}>
              <Text style={styles.item2}>{item.id.split("T")[0]}</Text>
            </View>
            <View style={styles.outeritem}>
              <Text style={styles.item}>{item.name}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

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
    flexDirection: "row",
    gap: 20,
    marginBottom: 10,
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
  item: {
    fontSize: 15,
  },
  item2: {
    color: "#b6b6b6",
  },
  outeritem: {
    width: 350,
    height: 50,
    marginVertical: 5,
    maxWidth: 350,
    borderRadius: 11,
    backgroundColor: "#eaf3fc",
    paddingLeft: 20,
    paddingRight: 20,
  },
  outertem2: {
    width: "100%",
    alignItems: "flex-end",
    paddingRight: 10,
    marginBottom: -5,
  },
  outer: {
    marginTop: 5,
  },
});

export default Notificationspage;
