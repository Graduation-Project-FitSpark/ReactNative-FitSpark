import React, { useState, useEffect, useMemo } from "react";
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ImageBackground,
  Modal,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { format, addDays, subDays } from "date-fns";
import notraining from "../../img/junkfoodday.png";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import { useCallback } from "react";

function Traineefood({ route }) {
  const navigation = useNavigation();
  const { ID_Trainer, name, Age, img } = route.params;
  const today = new Date();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedexercise, setSelectedexercise] = useState("");
  const [Itemtime, setItemtime] = useState("");
  const formattedDate = useMemo(() => {
    return today.toLocaleDateString("en-US", { weekday: "long" });
  }, [today]);
  const [selectedtime, setselectedtime] = useState("");
  const [foodData, setfoodData] = useState([
    {
      ID_Food: 1,
      Food_Name: "Grilled Chicken",
      Details: "A simple grilled chicken breast with herbs.",
      Img: "http://example.com/image1.jpg",
      cal: 165,
      min: 15,
      ingredient_ids: [1, 34, 35],
    },
    {
      ID_Food: 10,
      Food_Name: "Tofu Stir-Fry",
      Details: "Tofu stir-fried with bell peppers and onions.",
      Img: "https://media.istockphoto.com/id/1291750007/vector/takeaway-food-symbol-take-away-paper-food-bag-icon-daily-meal-in-paper-bag-vector.jpg?s=612x612&w=0&k=20&c=LZtxpCqVZfB1-qNAXFBWCHoJvwzbozGwwRur605NLK8=",
      cal: 250,
      min: 10,
      ingredient_ids: [2, 34, 12, 36],
    },
    {
      ID_Food: 11,
      Food_Name: "Baked Sweet Potato",
      Details: "A baked sweet potato topped with cinnamon.",
      Img: "http://example.com/image11.jpg",
      cal: 103,
      min: 50,
      ingredient_ids: [3, 34],
    },
    {
      ID_Food: 12,
      Food_Name: "Almond Butter Toast",
      Details: "A slice of whole-grain toast with almond butter.",
      Img: "http://example.com/image12.jpg",
      cal: 200,
      min: 3,
      ingredient_ids: [4, 5],
    },
    {
      ID_Food: 13,
      Food_Name: "Brown Rice",
      Details: "Steamed brown rice served with vegetables.",
      Img: "http://example.com/image13.jpg",
      cal: 215,
      min: 20,
      ingredient_ids: [6, 34],
    },
    {
      ID_Food: 14,
      Food_Name: "Spinach Salad",
      Details: "Fresh spinach leaves topped with cherry tomatoes.",
      Img: "http://example.com/image14.jpg",
      cal: 50,
      min: 5,
      ingredient_ids: [7, 34, 36],
    },
    {
      ID_Food: 15,
      Food_Name: "Baked Chicken Thighs",
      Details: "Oven-baked chicken thighs seasoned with herbs.",
      Img: "http://example.com/image15.jpg",
      cal: 230,
      min: 30,
      ingredient_ids: [8, 34],
    },
    {
      ID_Food: 16,
      Food_Name: "Turkey Wrap",
      Details: "Whole grain wrap filled with turkey and lettuce.",
      Img: "http://example.com/image16.jpg",
      cal: 200,
      min: 20,
      ingredient_ids: [9, 20, 7, 36],
    },
    {
      ID_Food: 17,
      Food_Name: "Cottage Cheese",
      Details: "Low-fat cottage cheese served with fruit.",
      Img: "http://example.com/image17.jpg",
      cal: 120,
      min: 3,
      ingredient_ids: [10],
    },
    {
      ID_Food: 18,
      Food_Name: "Lentil Soup",
      Details: "Hearty lentil soup cooked with vegetables.",
      Img: "http://example.com/image18.jpg",
      cal: 180,
      min: 25,
      ingredient_ids: [11, 36, 35, 34],
    },
    {
      ID_Food: 19,
      Food_Name: "Grilled Asparagus",
      Details: "Grilled asparagus drizzled with olive oil.",
      Img: "http://example.com/image19.jpg",
      cal: 50,
      min: 5,
      ingredient_ids: [12, 34],
    },
    {
      ID_Food: 20,
      Food_Name: "Oatmeal",
      Details: "Healthy oatmeal cooked with almond milk.",
      Img: "http://example.com/image20.jpg",
      cal: 200,
      min: 7,
      ingredient_ids: [13, 38],
    },
    {
      ID_Food: 21,
      Food_Name: "Chia Pudding",
      Details: "A simple chia seed pudding with vanilla.",
      Img: "http://example.com/image21.jpg",
      cal: 200,
      min: 5,
      ingredient_ids: [14, 38],
    },
    {
      ID_Food: 22,
      Food_Name: "Pancakes with Maple Syrup",
      Details: "Fluffy pancakes served with maple syrup.",
      Img: "http://example.com/image22.jpg",
      cal: 300,
      min: 15,
      ingredient_ids: [13, 38, 15],
    },
    {
      ID_Food: 23,
      Food_Name: "Scrambled Eggs with Spinach",
      Details: "Light and fluffy scrambled eggs with spinach.",
      Img: "http://example.com/image23.jpg",
      cal: 150,
      min: 7,
      ingredient_ids: [16, 7, 34],
    },
    {
      ID_Food: 24,
      Food_Name: "Smoothie Bowl",
      Details: "A refreshing blend of fruits in a bowl.",
      Img: "http://example.com/image24.jpg",
      cal: 300,
      min: 10,
      ingredient_ids: [17, 18, 21, 39],
    },
    {
      ID_Food: 25,
      Food_Name: "Whole Grain Waffles",
      Details: "Crisp whole grain waffles with syrup.",
      Img: "http://example.com/image25.jpg",
      cal: 300,
      min: 15,
      ingredient_ids: [19],
    },
    {
      ID_Food: 26,
      Food_Name: "Egg and Avocado Breakfast Burrito",
      Details: "A soft tortilla filled with egg and avocado.",
      Img: "http://example.com/image26.jpg",
      cal: 300,
      min: 15,
      ingredient_ids: [16, 20, 31],
    },
    {
      ID_Food: 27,
      Food_Name: "Overnight Oats",
      Details: "Rolled oats soaked overnight with almond milk.",
      Img: "http://example.com/image27.jpg",
      cal: 250,
      min: 15,
      ingredient_ids: [13, 38, 39],
    },
    {
      ID_Food: 28,
      Food_Name: "Greek Yogurt Parfait",
      Details: "Layers of creamy Greek yogurt with granola.",
      Img: "http://example.com/image28.jpg",
      cal: 150,
      min: 10,
      ingredient_ids: [21, 18, 39],
    },
    {
      ID_Food: 29,
      Food_Name: "Grilled Vegetable Panini",
      Details: "A pressed sandwich filled with grilled vegetables.",
      Img: "http://example.com/image29.jpg",
      cal: 350,
      min: 10,
      ingredient_ids: [37, 34, 26],
    },
    {
      ID_Food: 30,
      Food_Name: "Chicken Caesar Wrap",
      Details:
        "Grilled chicken, romaine lettuce, and Caesar dressing in a wrap.",
      Img: "http://example.com/image30.jpg",
      cal: 400,
      min: 10,
      ingredient_ids: [20, 1, 7, 34],
    },
    {
      ID_Food: 31,
      Food_Name: "Greek Yogurt",
      Details: "A bowl of plain Greek yogurt with honey.",
      Img: "http://example.com/image31.jpg",
      cal: 100,
      min: 3,
      ingredient_ids: [21],
    },
  ]);

  const [trainerCoachData, settrainerCoachData] = useState([
    { ID_Trainer: 1, ID_Food: 10, Day_Of_Week: "Saturday", Times: "Breakfast" },
    { ID_Trainer: 1, ID_Food: 12, Day_Of_Week: "Sunday", Times: "Lunch" },
    { ID_Trainer: 1, ID_Food: 14, Day_Of_Week: "Saturday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 17, Day_Of_Week: "Wednesday", Times: "Lunch" },
    { ID_Trainer: 1, ID_Food: 18, Day_Of_Week: "Saturday", Times: "Lunch" },
    { ID_Trainer: 1, ID_Food: 19, Day_Of_Week: "Tuesday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 20, Day_Of_Week: "Monday", Times: "Breakfast" },
    { ID_Trainer: 1, ID_Food: 20, Day_Of_Week: "Sunday", Times: "Breakfast" },
    { ID_Trainer: 1, ID_Food: 22, Day_Of_Week: "Monday", Times: "Lunch" },
    {
      ID_Trainer: 1,
      ID_Food: 26,
      Day_Of_Week: "Wednesday",
      Times: "Breakfast",
    },
    { ID_Trainer: 1, ID_Food: 29, Day_Of_Week: "Friday", Times: "Lunch" },
    { ID_Trainer: 1, ID_Food: 31, Day_Of_Week: "Sunday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 31, Day_Of_Week: "Wednesday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 29, Day_Of_Week: "Monday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 33, Day_Of_Week: "Friday", Times: "Breakfast" },
    { ID_Trainer: 1, ID_Food: 35, Day_Of_Week: "Friday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 39, Day_Of_Week: "Tuesday", Times: "Lunch" },
    { ID_Trainer: 1, ID_Food: 40, Day_Of_Week: "Tuesday", Times: "Breakfast" },
    { ID_Trainer: 1, ID_Food: 6, Day_Of_Week: "Thursday", Times: "Dinner" },
    { ID_Trainer: 1, ID_Food: 7, Day_Of_Week: "Thursday", Times: "Breakfast" },
  ]);

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

  const [filteredPlan, setFilteredPlan] = useState([]);
  const [trineday, setTrineday] = useState([]);

  useFocusEffect(
    useCallback(() => {
      console.log(selectedtime);
      const matchingTrains = trainerCoachData
        .filter(
          (train) =>
            train.Day_Of_Week === formattedDate &&
            train.ID_Trainer === ID_Trainer
        )
        .map((train) => ({ id: train.ID_Food }));

      const matchingPlan = foodData
        .filter((plan) =>
          matchingTrains.some((train) => plan.ID_Food === train.id)
        )
        .map((plan) => {
          const train = trainerCoachData.find(
            (train) =>
              train.ID_Food === plan.ID_Food &&
              train.Day_Of_Week === formattedDate &&
              train.ID_Trainer === ID_Trainer
          );
          return { ...plan, Times: train.Times, day: train.Day_Of_Week };
        });

      setFilteredPlan(matchingPlan);

      setData((prevData) =>
        prevData.map((item) =>
          item.Day_Of_Week === formattedDate
            ? { ...item, isSelected: true }
            : { ...item, isSelected: false }
        )
      );
      const timeselect = () => {
        const currentHour = new Date().getHours();
        if (currentHour >= 5 && currentHour < 12) {
          return "Breakfast";
        } else if (currentHour >= 12 && currentHour < 18) {
          return "Lunch";
        } else {
          return "Dinner";
        }
      };
      setselectedtime(timeselect());
    }, [formattedDate, foodData, ID_Trainer])
  );

  const selectDay = (selectedDay) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.Day_Of_Week === selectedDay.Day_Of_Week
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );

    const matchingTrains = trainerCoachData
      .filter(
        (train) =>
          train.Day_Of_Week === selectedDay.Day_Of_Week &&
          train.ID_Trainer === ID_Trainer
      )
      .map((train) => ({ id: train.ID_Food }));

    const matchingPlan = foodData
      .filter((plan) =>
        matchingTrains.some((train) => plan.ID_Food === train.id)
      )
      .map((plan) => {
        const train = trainerCoachData.find(
          (train) =>
            train.ID_Food === plan.ID_Food &&
            train.Day_Of_Week === selectedDay.Day_Of_Week &&
            train.ID_Trainer === ID_Trainer
        );
        return { ...plan, Times: train.Times, day: train.Day_Of_Week };
      });

    setFilteredPlan(matchingPlan);
  };

  const addExercise = () => {
    if (!selectedexercise || !Itemtime) {
      alert("Please select an exercise and enter steps!");
      return;
    }

    const newEntry = {
      ID_Trainer,
      ID_Food: selectedexercise.ID_Food,

      Day_Of_Week: data.find((d) => d.isSelected)?.Day_Of_Week || "",
      Times: Itemtime,
    };

    settrainerCoachData([...trainerCoachData, newEntry]);
    setFilteredPlan([
      ...filteredPlan,
      { ...selectedexercise, Times: newEntry.Times },
    ]);
    setModalVisible(false);
  };

  const remove = (ex) => {
    const newar1 = trainerCoachData.filter(
      (train) =>
        !(
          train.ID_Food === ex.ID_Food &&
          train.ID_Trainer === ID_Trainer &&
          train.Day_Of_Week === ex.day
        )
    );
    settrainerCoachData(newar1);
    const newar2 = filteredPlan.filter((plan) => plan.ID_Food !== ex.ID_Food);
    setFilteredPlan(newar2);
  };

  const renderRightActions = (ex) => (
    <TouchableOpacity style={styles.removeButton} onPress={() => remove(ex)}>
      <Text style={styles.removeButtonText}>Remove</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.toptitle}>
          <TouchableOpacity onPress={navigation.goBack}>
            <IconIonicons name="chevron-back-outline" size={25} color="#000" />
          </TouchableOpacity>
          <View style={styles.toptitlenamecontener}>
            <Text style={styles.toptitlename}>Trainer Plan</Text>
          </View>
        </View>
        <View style={styles.containertrinret}>
          <Image source={{ uri: img }} style={styles.trainerImagetrinret} />
          <View style={styles.inercontainertrinret}>
            <Text style={styles.nameTexttrinret}>{name}</Text>
            <Text style={styles.ageTexttrinret}>Age: {Age}</Text>
          </View>
        </View>
        <ScrollView
          horizontal
          contentContainerStyle={styles.scrollContainer2}
          showsHorizontalScrollIndicator={false}
        >
          {data.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.dayContainer,
                item.isSelected && styles.selectedDay,
              ]}
              onPress={() => selectDay(item)}
            >
              <Text
                style={[
                  styles.dayText,
                  item.isSelected && styles.selectedDayText,
                ]}
              >
                {item.day}
              </Text>
              <Text
                style={[
                  styles.dateText,
                  item.isSelected && styles.selectedDayText,
                ]}
              >
                {item.date}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.planContainer}>
          <View style={styles.headerandadd}>
            <Text style={styles.header}>Today's Meals</Text>

            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Add Meals</Text>
            </TouchableOpacity>
          </View>
          <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContainer}>
                <Text style={styles.modalTitle}>Add New Exercise</Text>
                <Picker
                  selectedValue={selectedexercise}
                  style={styles.picker}
                  onValueChange={(itemValue) => setSelectedexercise(itemValue)}
                >
                  {foodData.map((item) => (
                    <Picker.Item
                      key={item.ID_Food}
                      label={item.Food_Name}
                      value={item}
                    />
                  ))}
                </Picker>
                <Picker
                  selectedValue={Itemtime}
                  style={styles.picker}
                  onValueChange={(itemValue) => {
                    setItemtime(itemValue);
                  }}
                  color="#fff"
                >
                  <Picker.Item label="Breakfast" value="Breakfast" />
                  <Picker.Item label="Lunch" value="Lunch" />
                  <Picker.Item label="Dinner" value="Dinner" />
                </Picker>
                <View style={styles.buttonRow}>
                  <TouchableOpacity
                    title="Cancel"
                    onPress={() => setModalVisible(false)}
                    style={styles.Cancel}
                  >
                    <Text style={styles.textCancel}>Cancel</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    title="Add"
                    onPress={addExercise}
                    style={styles.Add}
                  >
                    <Text style={styles.textAdd}>Add</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          {filteredPlan.length > 0 ? (
            ["Breakfast", "Lunch", "Dinner"].map((mealType) => (
              <View key={mealType}>
                <Text style={styles.header}>{mealType}</Text>
                {filteredPlan
                  .filter((planItem) => planItem.Times === mealType)
                  .map((planItem) => (
                    <Swipeable
                      key={planItem.ID_Food}
                      renderRightActions={() => renderRightActions(planItem)}
                    >
                      <View style={styles.exerciseCard}>
                        <Image
                          source={{ uri: planItem.Img }}
                          style={styles.image}
                        />
                        <View style={styles.details}>
                          <Text style={styles.name}>{planItem.Food_Name}</Text>

                          <View style={styles.contdis}>
                            <View style={styles.detailcamin}>
                              <IconIonicons
                                name="flame-outline"
                                size={18}
                                color="#000"
                              />
                              <Text style={styles.dis}>{planItem.cal}</Text>
                            </View>
                            <View style={styles.detailcamin}>
                              <IconIonicons
                                name="time-outline"
                                size={18}
                                color="#000"
                              />

                              <Text style={styles.dis}>{planItem.min}</Text>
                            </View>
                          </View>
                        </View>
                      </View>
                    </Swipeable>
                  ))}
              </View>
            ))
          ) : (
            <View style={styles.container2}>
              <ImageBackground
                source={notraining}
                resizeMode="cover"
                style={styles.image2}
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
  },
  containertrinret: {
    padding: 10,
    alignItems: "center",
    backgroundColor: "transparent",
    gap: 50,
    flexDirection: "row",
  },
  inercontainertrinret: {},
  nameTexttrinret: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    color: "#333",
  },
  ageTexttrinret: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
  },
  trainerImagetrinret: {
    width: 100,
    height: 100,
    borderRadius: 50,
    resizeMode: "cover",
  },
  treanouter: {
    padding: 20,
  },
  headerandadd: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#333333",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: "#0056b3",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 3,
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
  },
  container: {
    backgroundColor: "#fff",
    width: "100%",
    height: "100%",
    paddingTop: 30,
  },
  textheader: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  toptitlenamecontener: {
    alignItems: "center",
    justifyContent: "center",
    width: "90%",
  },
  toptitle: {
    flexDirection: "row",
    width: "100%",
    paddingLeft: 10,
    marginBottom: 10,
  },
  toptitlename: {
    fontWeight: "bold",
    fontSize: 20,
  },
  outer: {
    marginTop: 5,
  },
  outeritem: {
    width: "100%",
    height: 110,
    marginVertical: 5,
    borderRadius: 11,
    backgroundColor: "#eaf3fc",
    flexDirection: "row",
    padding: 10,
    alignItems: "center",
  },
  imagetrine: {
    width: "30%",
  },
  image: {
    resizeMode: "cover",
    borderRadius: 10,
    width: 80,
    height: 70,
  },
  detailsContainer: {
    flex: 1,
    paddingLeft: 10,
    gap: 5,
  },
  itemName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  descriptionContainer: {
    backgroundColor: "#000",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 5,
    alignSelf: "flex-start",
    marginVertical: 5,
  },
  descriptionText: {
    color: "gray",
    fontSize: 14,
  },

  progressBarContainer: {
    height: 15,
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    overflow: "hidden",
    position: "relative",
  },

  progressText: {
    position: "absolute",
    right: 5,
    top: 1,
    fontSize: 10,
    fontWeight: "bold",
    color: "#000",
  },
  scrollContainer2: {
    paddingLeft: 10,
  },
  dayContainer: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#BBF246",
    padding: 10,
    borderRadius: 15,
    marginHorizontal: 5,
    width: 50,
    height: 50,
  },
  selectedDay: {
    backgroundColor: "#333333",
  },
  selecteddayText: {
    color: "#fff",
  },
  dayText: {
    fontSize: 16,
    color: "#000",
  },
  dateText: {
    fontSize: 12,
    color: "#000",
  },

  selectedDayText: {
    color: "#fff",
  },

  planContainer: {
    padding: 20,
  },

  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },

  exerciseCard: {
    flexDirection: "row",
    marginVertical: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: "#eaf3fc",
  },

  details: {
    paddingLeft: 10,
    gap: 5,
  },

  name: {
    fontSize: 18,
    fontWeight: "bold",
  },

  goal: {
    color: "gray",
    fontSize: 14,
  },

  progressBar: {
    height: 10,
    backgroundColor: "#dcdcdc",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 5,
  },

  progress: {
    height: "100%",
    backgroundColor: "#b2f200",
  },
  container2: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: 20,
  },

  image2: {
    resizeMode: "cover",
    borderRadius: 11,
    width: 300,
    height: 300,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    width: "100%",
  },
  buttonRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  uniqueContainer: {
    marginTop: 5,
    flexDirection: "row",
    gap: 10,
    marginLeft: -5,
  },
  uniqueButton: {
    backgroundColor: "#BBF246",
    alignItems: "center",

    borderRadius: 20,
    height: 28,
    width: 28,
  },
  uniqueButtonText: {
    color: "#000",
    fontSize: 19,
    fontWeight: "bold",
  },
  uniqueCountText: {
    fontSize: 30,
    fontWeight: "bold",
    marginHorizontal: 10,
  },
  removeButton: {
    backgroundColor: "#FF3B30",
    justifyContent: "center",
    alignItems: "center",
    width: 80,
    borderRadius: 8,
    marginVertical: 10,
  },
  removeButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  Cancel: {
    backgroundColor: "#FF3B30",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  Add: {
    backgroundColor: "#333333",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  textAdd: {
    color: "#fff",
  },
  textCancel: {
    color: "#fff",
  },
  picker1: {
    width: 50,
    height: 50,
    marginLeft: 50,
    marginBottom: 10,
  },
  time: {
    fontSize: 18,
    marginLeft: 15,
    marginRight: -60,
    marginTop: 13,
  },
  contdis: {
    flexDirection: "row",
    gap: 20,
  },
  detailcamin: {
    flexDirection: "row",
  },
});

export default Traineefood;
