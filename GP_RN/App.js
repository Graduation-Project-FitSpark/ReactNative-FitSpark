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
import Iteamshop from "./Homescreen/Iteamshop.jsx";
import Cart from "./Homescreen/Cart.jsx";
import MyProvider from "./MyProvider";
import Workout from "./Homescreen/Activities/Workout";
import Exercise from "./Homescreen/Activities/Exercise";
import StartExercise from "./Homescreen/Activities/StartExercise";
import Counttostart from "./Homescreen/Activities/Counttostart";
import Foodplan from "./Homescreen/Meals/Foodplan";
import Detelsfoode from "./Homescreen/Meals/Detelsfoode";
const Stack = createStackNavigator();

export default function App() {
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Menubar">
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
          <Stack.Screen
            name="Iteamshop"
            component={Iteamshop}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Cart"
            component={Cart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Workout"
            component={Workout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Exercise"
            component={Exercise}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="StartExercise"
            component={StartExercise}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Counttostart"
            component={Counttostart}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Foodplan"
            component={Foodplan}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Detelsfoode"
            component={Detelsfoode}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
}
