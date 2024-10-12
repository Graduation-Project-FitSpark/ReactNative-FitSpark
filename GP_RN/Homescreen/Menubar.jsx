import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; // Import the icon library
import Homepage from "./Homepage.jsx";
import Navigationdrawer from "./Navigationdrawer.jsx";
// Screens for the menu items
function HomeScreen() {
  return <Homepage />;
}

function Shop() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Shop Screen Content */}
    </View>
  );
}

function Calendar() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {/* Calendar Screen Content */}
    </View>
  );
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

          // Choose icons based on the route name
          if (route.name === "Homescreen") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "bars") {
            iconName = focused ? "menu" : "menu-outline";
          } else if (route.name === "Calendar") {
            iconName = focused ? "calendar" : "calendar-outline";
          } else if (route.name === "Shop") {
            iconName = focused ? "storefront" : "storefront-outline";
          }

          // Return the icon component
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#1c1b29", // Active icon color
        tabBarInactiveTintColor: "#fff", // Inactive icon color
        tabBarActiveBackgroundColor: "#b2f200", // Background color for active tab
        // Rounded tab bar style
        tabBarItemStyle: {
          borderRadius: 15,
          height: 40,
          tabBarShowLabel: true,
        },
        tabBarStyle: styles.tabBar,
        tabBarShowLabel: false, // Hides the label
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
    borderRadius: 30, // Rounded tab bar
    paddingHorizontal: 10,
  },
  tabBarLabel: {
    fontSize: 12,
    fontWeight: "bold",
  },
});
