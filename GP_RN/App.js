import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./SignIn_Up/SignIn.jsx";
import SignUp from "./SignIn_Up/SignUp.jsx";
import Authentication from "./SignIn_Up/Authentication.jsx";
import Homescreen from "./Homescreen/Homepage.jsx";
import Menubar from "./Homescreen/Menubar.jsx";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Notification from "./Homescreen/Notificationspage.jsx";
import Navigationdrawer from "./Homescreen/Navigationdrawer.jsx";
import Awards from "./Homescreen/Awards.jsx";

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
        <Stack.Screen
          name="Menubar"
          component={Menubar}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignIn"
          component={SignIn}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Authentication"
          component={Authentication}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Navigationdrawer"
          component={Navigationdrawer}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Awards"
          component={Awards}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
