import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import logo from "../img/logo.png";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const Navigationdrawer = () => {
  const navigation = useNavigation();

  const [userData, setUserData] = useState({
    name: "unknown",
    email: "unknown",
    img: "",
  });

  useEffect(() => {
    setUserData({ name: "ahmed", email: "aaa@gmail.com" }); // عشاير هون انت بس بتستدعي الاسم و الايميل من داتا بيس وبتدبدلها مكان النيم  والصورة و  الايميل
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          style={styles.profileImage}
          source={userData.img ? { uri: userData.img } : logo}
        />
        <Text style={styles.profileName}>{userData.name}</Text>
        <Text style={styles.profileTitle}>{userData.email}</Text>
      </View>
      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={() => navigation.navigate("//")}
        >
          <IconIonicons name="person" size={24} color="#000" />
          <Text style={styles.menuItem}>Your Profile</Text>
        </TouchableOpacity>
        <View style={styles.hr} />

        <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={() => navigation.navigate("Notification")}
        >
          <IconIonicons name="notifications" size={24} color="#000" />
          <Text style={styles.menuItem}>Notifications</Text>
        </TouchableOpacity>
        <View style={styles.hr} />
        <TouchableOpacity style={styles.menuItemContainer}>
          <IconIonicons name="medal" size={24} color="#000" />
          <Text style={styles.menuItem}>Awards</Text>
        </TouchableOpacity>
        <View style={styles.hr} />
        <TouchableOpacity style={styles.menuItemContainer}>
          <IconIonicons name="barbell" size={24} color="#000" />
          <Text style={styles.menuItem}>Workout</Text>
        </TouchableOpacity>
        <View style={styles.hr} />
        <TouchableOpacity style={styles.menuItemContainer}>
          <IconIonicons name="leaf" size={24} color="#000" />
          <Text style={styles.menuItem}>Meals</Text>
        </TouchableOpacity>
        <View style={styles.hr} />
        <TouchableOpacity style={styles.menuItemContainer}>
          <IconIonicons name="help-circle" size={24} color="#000" />
          <Text style={styles.menuItem}>FAQ</Text>
        </TouchableOpacity>
        <View style={styles.hr} />
        <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={() => navigation.navigate("SignIn")}
        >
          <IconIonicons name="log-out" size={24} color="#000" />
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.account}>
        {["facebook", "whatsapp"].map((name, index) => (
          <IconFontAwesome.Button
            key={index}
            name={name}
            backgroundColor={name === "whatsapp" ? "#25D366" : "#3b5998"}
            iconStyle={styles.icon}
            style={styles.button}
          >
            {name.charAt(0).toUpperCase() + name.slice(1)}
          </IconFontAwesome.Button>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
  },
  profileContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
  },
  profileTitle: {
    fontSize: 16,
    color: "gray",
  },
  menuItemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  menuItem: {
    fontSize: 18,
    paddingLeft: 15,
  },
  hr: {
    borderBottomColor: "black",
    borderBottomWidth: 0.5,
    maxWidth: 250,
    marginTop: 8,
    marginBottom: 8,
  },
  account: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 7,
  },
  button: {
    marginHorizontal: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});

export default Navigationdrawer;
