import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import Homepage from "./Homepage.jsx";
import Navigationdrawer from "./Navigationdrawer.jsx";
import Store from "./Shop.jsx";
import Calender from "./Calender.jsx";
function HomeScreen() {
  return <Homepage />;
}

function Shop() {
  return <Store />;
}

function Calendar() {
  return <Calender />;
}

function Bars() {
  return <Navigationdrawer />;
}

const Tab = createBottomTabNavigator();

export default function Menubar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Homescreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "bars") {
            iconName = focused ? "menu" : "menu-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "mail-open" : "mail-open-outline";
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
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Shop"
        component={Shop}
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
