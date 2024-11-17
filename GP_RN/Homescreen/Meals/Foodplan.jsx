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
// هلا لم تعمل رن رح تلاقي في وجبة بتكون بالنص فوق لونها برتقالي هاي هي الوجبة الرئ«ية وفي وجبات تحت الي تحت هاي كنت بدي احطها انو المشروب الحلو و المقبلات
const colors = ["#EDF7DB", "#DAF0F6", "#F4D8D4", "#F6EDD7"];
let trainerId = 1; // هلا هاي الاي دي لليوزر الي داخل هلا انت بتعرف تعملها الي هو كيف اعرف مين الاي دي تاع اليوزر الي داخل هلا على هاي البيج ه
//هلا مش انت  عندك في داتا بيس تو تيبل وحدة فيها كل الوجبات ووحدة على حسب ايام الاسبوع للترين شو عليه وجبة
function Foodplan() {
  const [food, setFood] = useState("");
  const navigation = useNavigation();
  const today = new Date();
  const [selectedDate, setSelectedDate] = useState(null);
  const [foodData, setFoodData] = useState([
    //هلا هون بتعمل يوز ايفيكت وبتمسح كل الوجبات الي في هاي الاريي وبتاخذ من داتا بيس وبتعملها ست
    {
      id: 1,
      name: "Baked Sweet Potato",
      details: "A baked sweet potato seasoned with cinnamon.",
      img: "https://example.com/baked_sweet_potato.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 2,
      name: "Almond Butter Toast",
      details: "A baked sweet potato seasoned with cinnamon.",
      img: "https://example.com/almond_butter_toast.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 3,
      name: "Brown Rice",
      details: "Steamed brown rice served with a side of veggies.",
      img: "https://example.com/brown_rice.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 4,
      name: "Spinach Salad",
      details: "Fresh spinach leaves tossed with olive oil and nuts.",
      img: "https://example.com/spinach_salad.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 5,
      name: "Baked Chicken Thighs",
      details: "Oven-baked chicken thighs with a mix of herbs and spices.",
      img: "https://example.com/baked_chicken_thighs.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 6,
      name: "Turkey Wrap",
      details: "Whole grain wrap filled with turkey, lettuce, and tomatoes.",
      img: "https://example.com/turkey_wrap.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 7,
      name: "Cottage Cheese",
      details: "Low-fat cottage cheese served with fresh berries.",
      img: "https://example.com/cottage_cheese.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 8,
      name: "Lentil Soup",
      details: "Hearty lentil soup cooked with carrots, onions, and spices.",
      img: "https://example.com/lentil_soup.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 9,
      name: "Grilled Asparagus",
      details: "Grilled asparagus drizzled with olive oil and lemon.",
      img: "https://example.com/grilled_asparagus.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 10,
      name: "Oatmeal",
      details: "Healthy oatmeal cooked with milk and topped with nuts.",
      img: "https://example.com/oatmeal.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 11,
      name: "Chia Pudding",
      details: "A simple chia seed pudding made with almond milk.",
      img: "https://example.com/chia_pudding.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 12,
      name: "Pancakes with Maple Syrup",
      details: "Fluffy pancakes served with a drizzle of pure maple syrup.",
      img: "https://example.com/pancakes_with_maple_syrup.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 13,
      name: "Scrambled Eggs with Veggies",
      details: "Light and fluffy scrambled eggs cooked with fresh vegetables.",
      img: "https://example.com/scrambled_eggs.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 14,
      name: "Smoothie Bowl",
      details: "A refreshing blend of bananas, berries, and almond milk.",
      img: "https://example.com/smoothie_bowl.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 15,
      name: "Whole Grain Waffles",
      details: "Crisp whole grain waffles served with peanut butter.",
      img: "https://example.com/whole_grain_waffles.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 16,
      name: "Egg and Avocado Burrito",
      details: "A soft tortilla filled with scrambled eggs and mashed avocado.",
      img: "https://example.com/egg_avocado_burrito.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 17,
      name: "Overnight Oats",
      details: "Rolled oats soaked overnight in almond milk.",
      img: "https://example.com/overnight_oats.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 18,
      name: "Greek Yogurt Parfait",
      details: "Layers of creamy Greek yogurt, granola, and fresh berries.",
      img: "https://example.com/greek_yogurt_parfait.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 19,
      name: "Grilled Vegetable Panini",
      details: "A pressed sandwich filled with grilled zucchini and peppers.",
      img: "https://example.com/grilled_vegetable_panini.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 20,
      name: "Chicken Caesar Wrap",
      details: "Grilled chicken, romaine lettuce, and Caesar dressing.",
      img: "https://example.com/chicken_caesar_wrap.jpg",
      min: 20,
      cal: 500,
    },
    {
      id: 21,
      name: "Greek Yogurt",
      details: "A bowl of plain Greek yogurt topped with honey and nuts.",
      img: "https://example.com/greek_yogurt.jpg",
      min: 20,
      cal: 500,
    },
  ]);

  const [mealPlan, setMealPlan] = useState([
    // هلا هون نفس الاشي هاي تيبل لكل يوزر شو عبيه وجبة حسب اليوم و الوقت بتعملها ست من يوز ايفيكت
    { idTrainer: 1, idFood: 3, dayOfWeek: "Monday", time: "Breakfast" },

    { idTrainer: 1, idFood: 5, dayOfWeek: "Sunday", time: "Lunch" },
    { idTrainer: 1, idFood: 6, dayOfWeek: "Monday", time: "Lunch" },

    { idTrainer: 1, idFood: 8, dayOfWeek: "Sunday", time: "Dinner" },
    { idTrainer: 1, idFood: 9, dayOfWeek: "Sunday", time: "Breakfast" },
    { idTrainer: 1, idFood: 10, dayOfWeek: "Monday", time: "Dinner" },
    { idTrainer: 1, idFood: 21, dayOfWeek: "Wednesday", time: "Breakfast" },
    { idTrainer: 1, idFood: 20, dayOfWeek: "Wednesday", time: "Dinner" },
    { idTrainer: 1, idFood: 19, dayOfWeek: "Wednesday", time: "Lunch" },
  ]);

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
              trainerId === item.idTrainer &&
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

      <Text style={Foodplanstyle.sectionTitle}>Appetizers</Text>
      <FlatList
        data={foodData}
        renderItem={renderFoodItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={Foodplanstyle.listContainer}
      />
    </ScrollView>
  );
}

export default Foodplan;
