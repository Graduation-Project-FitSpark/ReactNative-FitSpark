import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Title from "./Title.jsx";
import Userstatistics from "./Userstatistics.jsx";
import Userstable from "./Userstable.jsx";
function Homescreen() {
  return (
    <ScrollView>
      <Title />
      <Userstatistics />
      <Userstable />
    </ScrollView>
  );
}

export default Homescreen;
