import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Homepage from "./Specialisthomepage.jsx";
import Traineetable from "../SpecialistActivities/Traineetable.jsx";
import Navigationdrawercoacj from "./Navigationdrawercoacj.jsx";
import AnalyticsSection from "../SpecialistActivities/Inreotranineranalytics.jsx";

function HomeScreen() {
  return <Homepage />;
}

function Trainee() {
  return <Traineetable />;
}

function Calendar() {
  return <AnalyticsSection />;
}

function Bars() {
  return <Navigationdrawercoacj />;
}

const Tab = createBottomTabNavigator();

export default function Specialistmanbur() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Homescreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "bars") {
            iconName = focused ? "menu" : "menu-outline";
          } else if (route.name === "cellular") {
            iconName = focused ? "cellular" : "cellular-outline";
          } else if (route.name === "Shop") {
            iconName = focused ? "barbell" : "barbell-outline";
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1c1b29",
        tabBarInactiveTintColor: "#fff",
        tabBarActiveBackgroundColor: "#b2f200",

        tabBarItemStyle: {
          borderRadius: 15,
          height: 40,
          tabBarShowLabel: true,
        },
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false,
      })}
    >
      <Tab.Screen
        name="Homescreen"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Shop"
        component={Trainee}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="cellular"
        component={Calendar}
        options={{ headerShown: false }}
      />

      <Tab.Screen
        name="bars"
        component={Bars}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    padding: 10,
    position: "absolute",
    bottom: 16,
    left: 16,
    right: 16,
    height: 60,
    backgroundColor: "#1c1b29",
    borderRadius: 30,
    paddingHorizontal: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
