import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import SignIn from "./SignIn_Up/SignIn.jsx";
import SignUp from "./SignIn_Up/SignUp.jsx";
import QuizP1 from "./Quiz/QuizP1.jsx";
import QuizP2 from "./Quiz/QuizP2.jsx";
import QuizP3 from "./Quiz/QuizP3.jsx";
import QuizP4 from "./Quiz/QuizP4.jsx";
import QuizP5 from "./Quiz/QuizP5.jsx";
import QuizP6 from "./Quiz/QuizP6.jsx";
import { QuizProvider } from "./Quiz/QuizContext.js";
import SuccessScreen from "./Quiz/SuccessScreen.jsx";
import Authentication from "./SignIn_Up/Authentication.jsx";
import SelectCoach from "./Coaches_Specialist_Selecting/SelectCoach.jsx";
import SelectSpecialist from "./Coaches_Specialist_Selecting/SelectSpecialist.jsx";
import WalkingCalMap from "./Walking_Calories/WalkingCalMap.jsx";
import WalkingUsingPhone from "./Walking_Calories/WalkingUsingPhone.jsx";
import SelectingPage from "./Walking_Calories/SelectingPage.jsx";
import PushUps from "./StrengthTrains/PushUps.jsx";
import ChinUps from "./StrengthTrains/ChinUps.jsx";
import SelectStrengthTrain from "./StrengthTrains/SelectStrengthTrain.jsx";
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
import PhysicalTrains from "./Homescreen/PhysicalTrains.jsx";
import Detelsfoode from "./Homescreen/Meals/Detelsfoode";
import Profile from "./Homescreen/Profile.jsx";
import Calendar from "./Homescreen/Calender.jsx";
import GoToGym from "./Homescreen/GoToGym.jsx";
import SignToGym from "./Homescreen/SignToGym.jsx";
import Coachomepage from "./Coach/Homescreen/Coachomepage";
import Coachmanbur from "./Coach/Homescreen/Coachmanbur";
import Traineeexercise from "./Coach/CachActivities/Traineeexercise";
import Competitions from "./Coach/CachActivities/Competitions";
import Requesttraining from "./Coach/CachActivities/Requesttraining";
import ProfileCoach from "./Coach/Homescreen/ProfileCoach.jsx";
import Uploading from "./Coach/Homescreen/Uploading.jsx";
import Specialistmanbur from "./HSpecialist/Homescreen/Specialistmanbur";
import Traineefood from "./HSpecialist/SpecialistActivities/Traineefood";
import Requesttrainingspecilat from "./HSpecialist/SpecialistActivities/Requesttrainingspecilat";
import AnalyticsSectionSpecilalist from "./HSpecialist/SpecialistActivities/AnalyticsSectionSpecilalist";
import ProfileSpecialist from "./HSpecialist/Homescreen/ProfileSpecialist.jsx";
const Stack = createStackNavigator();

export default function App() {
  return (
    <MyProvider>
      <QuizProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="SignIn">
            <Stack.Screen name="Uploading" component={Uploading} />
            <Stack.Screen name="ProfileCoach" component={ProfileCoach} />
            <Stack.Screen name="PhysicalTrains" component={PhysicalTrains} />
            <Stack.Screen name="SignIn" component={SignIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="Authentication" component={Authentication} />
            <Stack.Screen name="QuizP1" component={QuizP1} />
            <Stack.Screen name="QuizP2" component={QuizP2} />
            <Stack.Screen name="QuizP3" component={QuizP3} />
            <Stack.Screen name="QuizP4" component={QuizP4} />
            <Stack.Screen name="QuizP5" component={QuizP5} />
            <Stack.Screen name="QuizP6" component={QuizP6} />
            <Stack.Screen name="SuccessScreen" component={SuccessScreen} />
            <Stack.Screen name="SelectCoach" component={SelectCoach} />
            <Stack.Screen
              name="SelectSpecialist"
              component={SelectSpecialist}
            />
            <Stack.Screen name="WalkingCalMap" component={WalkingCalMap} />
            <Stack.Screen name="SelectingPage" component={SelectingPage} />
            <Stack.Screen name="PushUps" component={PushUps} />
            <Stack.Screen name="ChinUps" component={ChinUps} />
            <Stack.Screen
              name="SelectStrengthTrain"
              component={SelectStrengthTrain}
            />

            <Stack.Screen
              name="WalkingUsingPhone"
              component={WalkingUsingPhone}
            />

            <Stack.Screen
              name="Menubar"
              component={Menubar}
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
              name="Profile"
              component={Profile}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Calendar"
              component={Calendar}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="GoToGym"
              component={GoToGym}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SignToGym"
              component={SignToGym}
              options={{ headerShown: false }}
            />
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
            <Stack.Screen
              name="ProfileSpecialist"
              component={ProfileSpecialist}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QuizProvider>
    </MyProvider>
  );
}
