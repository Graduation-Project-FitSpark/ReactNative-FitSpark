import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
import { format, addDays, subDays } from "date-fns";
import { Foodplanstyle } from "./Foodplanstyle";

function Foodplan() {
  const today = new Date();

  const [data, setData] = useState([
    {
      day: "S",
      date: format(subDays(today, today.getDay()), "dd"),
      isSelected: today.getDay() === 0,
      Day_Of_Week: "Sunday",
    },
    {
      day: "M",
      date: format(addDays(subDays(today, today.getDay()), 1), "dd"),
      isSelected: today.getDay() === 1,
      Day_Of_Week: "Monday",
    },
    {
      day: "T",
      date: format(addDays(subDays(today, today.getDay()), 2), "dd"),
      isSelected: today.getDay() === 2,
      Day_Of_Week: "Tuesday",
    },
    {
      day: "W",
      date: format(addDays(subDays(today, today.getDay()), 3), "dd"),
      isSelected: today.getDay() === 3,
      Day_Of_Week: "Wednesday",
    },
    {
      day: "T",
      date: format(addDays(subDays(today, today.getDay()), 4), "dd"),
      isSelected: today.getDay() === 4,
      Day_Of_Week: "Thursday",
    },
    {
      day: "F",
      date: format(addDays(subDays(today, today.getDay()), 5), "dd"),
      isSelected: today.getDay() === 5,
      Day_Of_Week: "Friday",
    },
    {
      day: "S",
      date: format(addDays(subDays(today, today.getDay()), 6), "dd"),
      isSelected: today.getDay() === 6,
      Day_Of_Week: "Saturday",
    },
  ]);

  const selectDay = (selectedItem) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.day === selectedItem.day
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );
  };

  return (
    <View style={Foodplanstyle.container}>
      <Text style={Foodplanstyle.title}>Find The Best</Text>
      <Text style={Foodplanstyle.title}>Food Around You</Text>
      <ScrollView
        horizontal
        contentContainerStyle={Foodplanstyle.scrollContainer}
        showsHorizontalScrollIndicator={false}
      >
        {data.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={[
              Foodplanstyle.dayContainer,
              item.isSelected && Foodplanstyle.selectedDay,
            ]}
            onPress={() => selectDay(item)}
          >
            <Text
              style={[
                Foodplanstyle.dayText,
                item.isSelected && Foodplanstyle.selectedDayText,
              ]}
            >
              {item.day}
            </Text>
            <Text
              style={[
                Foodplanstyle.dateText,
                item.isSelected && Foodplanstyle.selectedDayText,
              ]}
            >
              {item.date}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View>
        <View>
          <Text>Main meal</Text>
          <View>
            <Image
              source={{
                uri: "https://img.freepik.com/premium-psd/tasty-grilled-with-chicken-mushrooms-transparent-background_812337-3839.jpg",
              }}
              style={Foodplanstyle.image}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

export default Foodplan;
