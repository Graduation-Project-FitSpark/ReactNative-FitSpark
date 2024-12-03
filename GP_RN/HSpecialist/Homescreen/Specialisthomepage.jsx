import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Pointtransformer from "./Pointtransformer.jsx";
import Titlename from "./Titlename.jsx";
import Messenger from "./SpecilaistMessnger.jsx";
import Requests from "./SpecialistRequests.jsx";
function Specialisthomepage() {
  return (
    <View style={styles.homepagecontener}>
      <View style={styles.homepagecontener1}>
        <Titlename />
        <Pointtransformer />
      </View>
      <Requests />
      <Messenger />
    </View>
  );
}
export const styles = StyleSheet.create({
  homepagecontener: {
    backgroundColor: "#fff",
    height: "100%",
  },
  homepagecontener1: {
    gap: 50,
    height: "33%",
  },
});
export default Specialisthomepage;
