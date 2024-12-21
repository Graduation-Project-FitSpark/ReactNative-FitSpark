import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Homescreen from "./Homescreen.jsx";
import Navigationadmin from "./Navigationadmin.jsx";
import Chosseuser from "../AdminActivities/Chosseuser";
import LocationsMap from "./LocationsMap.jsx";
////////////////////
function HomeScreen() {
  return <Homescreen />;
}

function Trainee() {
  return <LocationsMap />;
}

function Server() {
  return <Chosseuser />;
}

function Bars() {
  return <Navigationadmin />;
}

const Tab = createBottomTabNavigator();

export default function Adminmanbur() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Homescreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "bars") {
            iconName = focused ? "menu" : "menu-outline";
          } else if (route.name === "Server") {
            iconName = focused ? "server" : "server-outline";
          } else if (route.name === "Shop") {
            iconName = focused ? "storefront" : "storefront-outline";
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
        name="Server"
        component={Server}
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
