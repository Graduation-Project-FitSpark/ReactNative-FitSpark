import React, { useState, useEffect } from "react";
import { View, Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import logo from "../../img/logo.png";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const Navigationdrawercoacj = () => {
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

        <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={() => navigation.navigate("Notification")}
        >
          <IconIonicons name="notifications" size={24} color="#000" />
          <Text style={styles.menuItem}>Notifications</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={() => navigation.navigate("Competitions")}
        >
          <IconIonicons name="flash" size={24} color="#000" />
          <Text style={styles.menuItem}>Competitions</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItemContainer}>
          <IconIonicons name="help-circle" size={24} color="#000" />
          <Text style={styles.menuItem}>FAQ</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItemContainer}
          onPress={() => navigation.navigate("SignIn")}
        >
          <IconIonicons name="log-out" size={24} color="#000" />
          <Text style={styles.menuItem}>Logout</Text>
        </TouchableOpacity>
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
    marginBottom: 15,
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
    padding: 5,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    marginTop: 20,
  },
  button: {
    marginHorizontal: 5,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  icon: {
    marginRight: 10,
  },
});

export default Navigationdrawercoacj;
