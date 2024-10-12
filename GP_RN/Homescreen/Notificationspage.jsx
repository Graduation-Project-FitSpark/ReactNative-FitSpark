import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

function Notificationspage() {
  const navigation = useNavigation();
  const [notifications, setNotifications] = useState([
    //هاي عبارة عن ارري ليست لم تبلش هون اخذف كل الي جوها واستخدم فنكشن يوسافكيت

    {
      id: "1",
      name: "Hey there, fitness warrior! 💪 Every step, every rep, every drop of ",
    },
    {
      id: "2",
      name: "Hey there, fitness warrior! 💪 Every step, every rep, every drop of",
    },
    {
      id: "3",
      name: "sweat brings you closer to a stronger, healthier you. Keep pushing,",
    },
    { id: "4", name: "keep showing up, because you’re unstoppable!" },
    { id: "5", name: "Grapes" },
  ]);

  useEffect(() => {
    // هون بتعمل زي فكرة فور لوب و بتاخذ كل النوتفيكشن من داتا بيس وتعمبها ست نوتفيكشن

    const newNotification = { id: "6", name: "Ahmed" };

    setNotifications((prevNotifications) => {
      const exists = prevNotifications.some(
        (notification) => notification.id === newNotification.id
      );

      if (!exists) {
        return [...prevNotifications, newNotification];
      }
      return prevNotifications;
    });
  }, []);

  return (
    <View style={styles.container}>
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
        <View key={item.id} style={styles.outer}>
          <View style={styles.outertem2}>
            <Text style={styles.item2}>2mago</Text>
          </View>
          <View style={styles.outeritem}>
            <Text style={styles.item}>{item.name}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
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
