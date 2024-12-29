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
import Coachomepage from "./Coach/Homescreen/Coachomepage";
import Coachmanbur from "./Coach/Homescreen/Coachmanbur";
import Traineeexercise from "./Coach/CachActivities/Traineeexercise";
import Competitions from "./Coach/CachActivities/Competitions";
import Requesttraining from "./Coach/CachActivities/Requesttraining";
import Specialistmanbur from "./HSpecialist/Homescreen/Specialistmanbur";
import Traineefood from "./HSpecialist/SpecialistActivities/Traineefood";
import Requesttrainingspecilat from "./HSpecialist/SpecialistActivities/Requesttrainingspecilat";
import AnalyticsSectionSpecilalist from "./HSpecialist/SpecialistActivities/AnalyticsSectionSpecilalist";
import Adminmanbur from "./Adminuser/homescreen/Adminmanbur";
import Alltatistics from "./Adminuser/AdminActivities/Alltatistics";
import Chosseuser from "./Adminuser/AdminActivities/Chosseuser";
import EditTrainees from "./Adminuser/AdminActivities/Editeuser/EditTrainees";
import EditCoach from "./Adminuser/AdminActivities/Editeuser/EditCoach";
import EditSpecialist from "./Adminuser/AdminActivities/Editeuser/EditSpecialist";
import AddAwards from "./Adminuser/AdminActivities/AddAwards";
import Applicantscoach from "./Adminuser/AdminActivities/Applicantscoach";
import ApplicantsSpecialist from "./Adminuser/AdminActivities/ApplicantsSpecialist";
import Requestcoachspecialist from "./Adminuser/AdminActivities/Requestcoachspecialist";
import Checkout from "./Homescreen/Checkout.jsx";
import Completshot from "./Homescreen/Completshot.jsx";
const Stack = createStackNavigator();

export default function App() {
  return (
    <MyProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Menubar">
          {/*Menubar for tranine and Coachmanbur for coach */}
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
          <Stack.Screen
            name="Checkout"
            component={Checkout}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Completshot"
            component={Completshot}
            options={{ headerShown: false }}
          />
          {/*coach from her */}
          <Stack.Screen
            name="Coachomepage"
            component={Coachomepage}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Coachmanbur"
            component={Coachmanbur}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Traineeexercise"
            component={Traineeexercise}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Competitions"
            component={Competitions}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Requesttraining"
            component={Requesttraining}
            options={{ headerShown: false }}
          />

          {/*Specialist from her */}
          <Stack.Screen
            name="Specialistmanbur"
            component={Specialistmanbur}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Traineefood"
            component={Traineefood}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Requesttrainingspecilat"
            component={Requesttrainingspecilat}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AnalyticsSectionSpecilalist"
            component={AnalyticsSectionSpecilalist}
            options={{ headerShown: false }}
          />
          {/*Admin from her */}
          <Stack.Screen
            name="Adminmanbur"
            component={Adminmanbur}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Alltatistics"
            component={Alltatistics}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Chosseuser"
            component={Chosseuser}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditTrainees"
            component={EditTrainees}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditCoach"
            component={EditCoach}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditSpecialist"
            component={EditSpecialist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="AddAwards"
            component={AddAwards}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Applicantscoach"
            component={Applicantscoach}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ApplicantsSpecialist"
            component={ApplicantsSpecialist}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Requestcoachspecialist"
            component={Requestcoachspecialist}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </MyProvider>
  );
}
