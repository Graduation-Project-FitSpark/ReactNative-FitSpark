import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Image,
  FlatList,
  ScrollView,
} from "react-native";
import { format, addDays, subDays } from "date-fns";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { Foodplanstyle } from "./Foodplanstyle";
import { useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import URL from "../../enum";

const colors = ["#EDF7DB", "#DAF0F6", "#F4D8D4", "#F6EDD7"];
function Foodplan() {
  const [food, setFood] = useState("");
  const navigation = useNavigation();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [foodData, setFoodData] = useState([]);

  const [mealPlan, setMealPlan] = useState([]);

  const [daysOfWeek, setDaysOfWeek] = useState([
    {
      day: "S",
      date: format(subDays(today, today.getDay()), "dd"),
      isSelected: today.getDay() === 0,
      dayOfWeek: "Sunday",
    },
    {
      day: "M",
      date: format(addDays(subDays(today, today.getDay()), 1), "dd"),
      isSelected: today.getDay() === 1,
      dayOfWeek: "Monday",
    },
    {
      day: "T",
      date: format(addDays(subDays(today, today.getDay()), 2), "dd"),
      isSelected: today.getDay() === 2,
      dayOfWeek: "Tuesday",
    },
    {
      day: "W",
      date: format(addDays(subDays(today, today.getDay()), 3), "dd"),
      isSelected: today.getDay() === 3,
      dayOfWeek: "Wednesday",
    },
    {
      day: "T",
      date: format(addDays(subDays(today, today.getDay()), 4), "dd"),
      isSelected: today.getDay() === 4,
      dayOfWeek: "Thursday",
    },
    {
      day: "F",
      date: format(addDays(subDays(today, today.getDay()), 5), "dd"),
      isSelected: today.getDay() === 5,
      dayOfWeek: "Friday",
    },
    {
      day: "S",
      date: format(addDays(subDays(today, today.getDay()), 6), "dd"),
      isSelected: today.getDay() === 6,
      dayOfWeek: "Saturday",
    },
  ]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const trainerId = await AsyncStorage.getItem("ID");
        try {
          const response = await fetch(`${URL}/getAllFoods`);
          if (!response.ok) {
            throw new Error("Failed to fetch food data");
          }
          const data = await response.json();
          setFoodData(data);
        } catch (error) {
          console.error("Error fetching food data:", error);
        }
        try {
          const response = await fetch(`${URL}/getAllFoodsTrainer`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ trainerId }),
          });
          if (!response.ok) {
            throw new Error("Failed to fetch meal plan");
          }
          const data = await response.json();
          setMealPlan(data);
        } catch (error) {
          console.error("Error fetching meal plan:", error);
        }
      } catch (error) {
        console.error("Error fetching:", error);
      }

      if (selectedDate) {
        setDaysOfWeek((prevDays) =>
          prevDays.map((day) =>
            day.dayOfWeek === selectedDate
              ? { ...day, isSelected: true }
              : { ...day, isSelected: false }
          )
        );
      }

      const currentHour = new Date().getHours();
      if (currentHour >= 3 && currentHour < 12) {
        setFood("Breakfast");
      } else if (currentHour >= 12 && currentHour < 18) {
        setFood("Lunch");
      } else {
        setFood("Dinner");
      }
    };
    fetchUserData();
  }, [selectedDate]);

  const selectDay = (selectedDay) => {
    setSelectedDate(selectedDay.dayOfWeek);
  };

  const renderFoodItem = ({ item, index }) => (
    <View
      style={[
        Foodplanstyle.foodContainer,
        { backgroundColor: colors[index % colors.length] },
      ]}
    >
      <Image
        source={{
          uri: item.img,
        }}
        style={Foodplanstyle.foodImage}
      />
      <View style={Foodplanstyle.outercontenierfood}>
        <Text style={Foodplanstyle.foodName}>{item.food_name}</Text>
        <View style={Foodplanstyle.outerinfoItem}>
          <View style={Foodplanstyle.infoItem}>
            <IconIonicons name="time-outline" size={20} color="#000" />
            <Text style={Foodplanstyle.foodDetails}>{item.min} min</Text>
          </View>
          <View style={Foodplanstyle.infoItem}>
            <IconIonicons name="flame-outline" size={20} color="#000" />
            <Text style={Foodplanstyle.foodDetails}>{item.cal} Cal</Text>
          </View>
        </View>
      </View>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={Foodplanstyle.container}>
      <View style={Foodplanstyle.hader}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={Foodplanstyle.icon}
        >
          <IconIonicons name="chevron-back-outline" size={30} color="#000" />
        </TouchableOpacity>
        <View style={Foodplanstyle.titlecontener}>
          <Text style={Foodplanstyle.title}>Find The Best Food You</Text>
        </View>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={Foodplanstyle.scrollContainer}
      >
        {daysOfWeek.map((item) => (
          <TouchableOpacity
            key={`${item.day}-${item.dayOfWeek}`}
            style={[
              Foodplanstyle.dayContainer,
              item.isSelected && Foodplanstyle.selectedDay,
            ]}
            onPress={() => selectDay(item)}
          >
            <Text style={Foodplanstyle.dayText}>{item.day}</Text>
            <Text style={Foodplanstyle.dateText}>{item.date}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={Foodplanstyle.mainpicker}>
        <Text style={Foodplanstyle.sectionTitle}>Main Meal</Text>
        <View style={Foodplanstyle.pickerContainer}>
          <Picker
            selectedValue={food}
            onValueChange={(itemValue) => setFood(itemValue)}
            style={Foodplanstyle.picker}
            dropdownIconColor="#000"
          >
            <Picker.Item label="Breakfast" value="Breakfast" />
            <Picker.Item label="Lunch" value="Lunch" />
            <Picker.Item label="Dinner" value="Dinner" />
          </Picker>
          <IconIonicons
            name="chevron-down"
            size={20}
            color="#000"
            style={Foodplanstyle.icon2}
          />
        </View>
      </View>
      <View style={Foodplanstyle.outermainMealContainer}>
        {mealPlan
          .filter(
            (item) =>
              food === item.time &&
              daysOfWeek.find(
                (day) => day.isSelected && day.dayOfWeek === item.dayOfWeek
              )
          )
          .map((item) => {
            const foodItem = foodData.find((food) => food.id === item.idFood);
            if (foodItem) {
              return (
                <TouchableOpacity
                  key={foodItem.id}
                  style={Foodplanstyle.mainMealContainer}
                  onPress={() => navigation.navigate("Detelsfoode", foodItem)}
                >
                  <Image
                    source={{
                      uri: foodItem.img,
                    }}
                    style={Foodplanstyle.mainMealImage}
                  />
                  <View style={Foodplanstyle.infoContainer}>
                    <Text style={Foodplanstyle.mainMealTitle}>
                      {foodItem.name}
                    </Text>
                    <View style={Foodplanstyle.outerinfoItem}>
                      <View style={Foodplanstyle.infoItem}>
                        <IconIonicons
                          name="time-outline"
                          size={20}
                          color="#FFFFFF"
                        />
                        <Text style={Foodplanstyle.infoText}>
                          {foodItem.min} min
                        </Text>
                      </View>
                      <View style={Foodplanstyle.infoItem}>
                        <IconIonicons
                          name="flame-outline"
                          size={20}
                          color="#FFFFFF"
                        />
                        <Text style={Foodplanstyle.infoText}>
                          {foodItem.cal} Cal
                        </Text>
                      </View>
                    </View>
                  </View>
                </TouchableOpacity>
              );
            }
            return null;
          })}
      </View>

      <View>
        <Text style={Foodplanstyle.sectionTitle}>Appetizers</Text>
        <View style={Foodplanstyle.Appetizers}>
          <TouchableOpacity
            style={[
              Foodplanstyle.mainMealContainer,
              { backgroundColor: "#E6BFCF" },
            ]}
          >
            <Image
              source={{
                uri: "https://breadsandsweets.com/wp-content/uploads/2022/08/choc-pudding-sq-1-of-1.jpg",
              }}
              style={Foodplanstyle.mainMealImage}
            />
            <View style={Foodplanstyle.infoContainer}>
              <Text style={Foodplanstyle.mainMealTitle}>Diet chocolate</Text>
              <View style={Foodplanstyle.outerinfoItem}>
                <View style={Foodplanstyle.infoItem}>
                  <IconIonicons name="time-outline" size={20} color="#FFFFFF" />
                  <Text style={Foodplanstyle.infoText}>15 min</Text>
                </View>
                <View style={Foodplanstyle.infoItem}>
                  <IconIonicons
                    name="flame-outline"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text style={Foodplanstyle.infoText}>30 Cal</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              Foodplanstyle.mainMealContainer,
              { backgroundColor: "#AEE6E9" },
            ]}
          >
            <Image
              source={{
                uri: "https://images.unsplash.com/photo-1548839140-29a749e1cf4d?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTl8fGdsYXNzJTIwd2F0ZXJ8ZW58MHx8MHx8fDA%3D",
              }}
              style={Foodplanstyle.mainMealImage}
            />
            <View style={Foodplanstyle.infoContainer}>
              <Text style={Foodplanstyle.mainMealTitle}>Glass Of Water</Text>
              <View style={Foodplanstyle.outerinfoItem}>
                <View style={Foodplanstyle.infoItem}>
                  <IconIonicons name="time-outline" size={20} color="#FFFFFF" />
                  <Text style={Foodplanstyle.infoText}>1 min</Text>
                </View>
                <View style={Foodplanstyle.infoItem}>
                  <IconIonicons
                    name="flame-outline"
                    size={20}
                    color="#FFFFFF"
                  />
                  <Text style={Foodplanstyle.infoText}>0 Cal</Text>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

export default Foodplan;
