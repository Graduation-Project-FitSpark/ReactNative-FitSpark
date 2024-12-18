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
  Button,
  TextInput,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { format, addDays, subDays } from "date-fns";
import notraining from "../../img/notraining.png";
import { Picker } from "@react-native-picker/picker";
import { useFocusEffect } from "@react-navigation/native";
import { Swipeable } from "react-native-gesture-handler";
import { useCallback } from "react";
function Traineeexercise({ route }) {
  const navigation = useNavigation();
  const { ID_Trainer, name, Age, img } = route.params;
  const today = new Date();
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedexercise, setSelectedexercise] = useState("");
  const [Itemstepsmin, setItemstepsmin] = useState("");
  const formattedDate = useMemo(() => {
    return today.toLocaleDateString("en-US", { weekday: "long" });
  }, [today]);

  const [todayPlan, settodayPlan] = useState([
    {
      id: 1,
      name: "Push Up",
      description:
        "The lower abdomen and hips are the most difficult areas of the body to reduce when we are on a diet. Even so, in this area, especially the legs as a whole, you can reduce weight even if you don't use tools.",
      goal: "100 Push up a day",
      progress: 45,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSv8DHqz8RFaA8jEqtRODUG6o9WQktS0RX_Q&s",
      videolink:
        "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
      cal: 95,
    },
    {
      id: 2,
      name: "Sit Up",
      description:
        "The lower abdomen and hips are the most difficult areas of the body to reduce when we are on a diet. Even so, in this area, especially the legs as a whole, you can reduce weight even if you don't use tools.",

      progress: 75,
      imageUrl: "https://example.com/sit_up_image.jpg",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
      cal: 45,
    },
    {
      id: 3,
      name: "Knee Push Up",
      description: "Beginner",

      progress: 60,
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSv8DHqz8RFaA8jEqtRODUG6o9WQktS0RX_Q&s",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
      cal: 33,
    },
    {
      id: 4,
      name: "Squats",
      description: "Intermediate",
      goal: "100 Squats a day",
      progress: 30,
      imageUrl: "https://example.com/squats_image.jpg",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
      cal: 55,
    },
    {
      id: 5,
      name: "Lunges",
      description: "Beginner",

      progress: 40,
      imageUrl: "https://example.com/lunges_image.jpg",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
      cal: 45,
    },
    {
      id: 6,
      name: "Plank",
      description: "Intermediate",

      progress: 80,
      imageUrl: "https://example.com/plank_image.jpg",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
    },
    {
      id: 8,
      name: "Mountain Climbers",
      description: "Advanced",

      progress: 50,
      imageUrl: "https://example.com/mountain_climbers_image.jpg",
      videolink: "https://youtu.be/N_wrRF_j3iY?si=ey26qU0waYUNtEcR",
      cal: 45,
    },
  ]);

  const [trineday, settrineday] = useState([
    { ID_Trains: 1, ID_Trainer: 12, Day_Of_Week: "Monday", Steps: 40 },
    { ID_Trains: 2, ID_Trainer: 9, Day_Of_Week: "Tuesday", Steps: 20 },
    { ID_Trains: 6, ID_Trainer: 9, Day_Of_Week: "Wednesday", Steps: 20 },
    { ID_Trains: 1, ID_Trainer: 9, Day_Of_Week: "Wednesday", Steps: 60 },
    { ID_Trains: 5, ID_Trainer: 9, Day_Of_Week: "Wednesday", Steps: 20 },
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
  useFocusEffect(
    React.useCallback(() => {
      //   todayPlan و   trineday  هون بتاخذ من داتا بيس وبتخزنها باريي
    }, [])
  );

  const goback = () => {
    //عشان انا خليت الداتا الي في trineday وبتبدلها مكان trinedayهون بتاخذ
    //الي بالكود هون  trineday الي بداتا بيس وحط مكانها trineday نفسها بس ظاف عليها فا الداتا القديمة ما تعدلت فا امسح الي في trineday الي في الداتا بيس

    navigation.goBack(); //هاي خليها ما تقيمها
  };

  useFocusEffect(
    useCallback(() => {
      const matchingTrains = trineday
        .filter(
          (train) =>
            train.Day_Of_Week === formattedDate &&
            train.ID_Trainer === ID_Trainer
        )
        .map((train) => ({ id: train.ID_Trains }));

      const matchingPlan = todayPlan
        .filter((plan) => matchingTrains.some((train) => plan.id === train.id))
        .map((plan) => {
          const train = trineday.find(
            (train) =>
              train.ID_Trains === plan.id &&
              train.Day_Of_Week === formattedDate &&
              train.ID_Trainer === ID_Trainer
          );
          return { ...plan, Steps: train.Steps, day: train.Day_Of_Week };
        });

      setFilteredPlan(matchingPlan);

      setData((prevData) =>
        prevData.map((item) =>
          item.Day_Of_Week === formattedDate
            ? { ...item, isSelected: true }
            : { ...item, isSelected: false }
        )
      );
    }, [formattedDate, todayPlan, ID_Trainer])
  );

  const selectDay = (selectedDay) => {
    setData((prevData) =>
      prevData.map((item) =>
        item.Day_Of_Week === selectedDay.Day_Of_Week
          ? { ...item, isSelected: true }
          : { ...item, isSelected: false }
      )
    );

    const matchingTrains = trineday
      .filter(
        (train) =>
          train.Day_Of_Week === selectedDay.Day_Of_Week &&
          train.ID_Trainer === ID_Trainer
      )
      .map((train) => ({ id: train.ID_Trains }));

    const matchingPlan = todayPlan
      .filter((plan) => matchingTrains.some((train) => plan.id === train.id))
      .map((plan) => {
        const train = trineday.find(
          (train) =>
            train.ID_Trains === plan.id &&
            train.Day_Of_Week === selectedDay.Day_Of_Week &&
            train.ID_Trainer === ID_Trainer
        );
        return { ...plan, Steps: train.Steps, day: train.Day_Of_Week };
      });

    setFilteredPlan(matchingPlan);
  };

  const addExercise = () => {
    if (!selectedexercise || !Itemstepsmin) {
      alert("Please select an exercise and enter steps!");
      return;
    }

    const exerciseExistsInPlan = filteredPlan.some(
      (exercise) => exercise.id === selectedexercise.id
    );

    if (exerciseExistsInPlan) {
      alert("This exercise already exists in the plan!");
      return;
    }

    const selectedDay =
      data.find((item) => item.isSelected)?.Day_Of_Week || null;

    if (!selectedDay) {
      alert("Please select a day first!");
      return;
    }

    const duplicateFound = trineday.some(
      (existing) =>
        existing.ID_Trainer === ID_Trainer &&
        existing.ID_Trains === selectedexercise.id &&
        existing.Day_Of_Week === selectedDay
    );

    if (duplicateFound) {
      alert("This exercise is already added for the selected day!");
      return;
    }

    const newExercise = {
      ...selectedexercise,
      Steps: Itemstepsmin,
    };
    setFilteredPlan([...filteredPlan, newExercise]);

    const newEntry = {
      ID_Trains: selectedexercise.id,
      ID_Trainer: ID_Trainer,
      Day_Of_Week: selectedDay,
      Steps: parseInt(Itemstepsmin, 10),
    };
    settrineday([...trineday, newEntry]);

    alert("Exercise added successfully!");
    setSelectedexercise("");
    setItemstepsmin("");
    setModalVisible(false);
  };

  const savecahnge = () => {
    console.log("Updated trineday:", trineday);
  };

  const Modell = () => {
    return (
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
              {todayPlan.map((item) => (
                <Picker.Item key={item.id} label={item.name} value={item} />
              ))}
            </Picker>
            <TextInput
              style={styles.input}
              placeholder="steps/min"
              value={Itemstepsmin}
              onChangeText={setItemstepsmin}
            />
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
    );
  };

  const increaseCount = (item) => {
    settrineday((prevTrineday) =>
      prevTrineday.map((train) =>
        train.ID_Trains === item.id &&
        train.ID_Trainer === ID_Trainer &&
        train.Day_Of_Week === item.day
          ? { ...train, Steps: train.Steps + 1 }
          : train
      )
    );

    setFilteredPlan((prevFilteredPlan) =>
      prevFilteredPlan.map((plan) =>
        plan.id === item.id ? { ...plan, Steps: plan.Steps + 1 } : plan
      )
    );
  };

  const decreaseCount = (item) => {
    settrineday((prevTrineday) =>
      prevTrineday.map((train) =>
        train.ID_Trains === item.id &&
        train.ID_Trainer === ID_Trainer &&
        train.Day_Of_Week === item.day
          ? { ...train, Steps: Math.max(0, train.Steps - 1) }
          : train
      )
    );

    setFilteredPlan((prevFilteredPlan) =>
      prevFilteredPlan.map((plan) =>
        plan.id === item.id
          ? { ...plan, Steps: Math.max(0, plan.Steps - 1) }
          : plan
      )
    );
  };
  const remove = (ex) => {
    const newar1 = trineday.filter(
      (train) =>
        !(
          train.ID_Trains === ex.id &&
          train.ID_Trainer === ID_Trainer &&
          train.Day_Of_Week === ex.day
        )
    );
    settrineday(newar1);
    const newar2 = filteredPlan.filter((plan) => plan.id !== ex.id);
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
          <TouchableOpacity onPress={goback}>
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
            <Text style={styles.header}>Today's Plan</Text>
            <TouchableOpacity
              style={styles.button}
              onPress={() => setModalVisible(true)}
            >
              <Text style={styles.buttonText}>Add Exercise</Text>
            </TouchableOpacity>
          </View>
          <Modell />
          {filteredPlan.length > 0 ? (
            filteredPlan.map((planItem) => (
              <Swipeable
                key={planItem.id}
                renderRightActions={() => renderRightActions(planItem)}
              >
                <View style={styles.exerciseCard}>
                  <Image
                    source={{ uri: planItem.imageUrl }}
                    style={styles.image}
                  />
                  <View style={styles.details}>
                    <Text style={styles.name}>{planItem.name}</Text>
                    <View style={styles.uniqueContainer}>
                      <TouchableOpacity
                        style={styles.uniqueButton}
                        onPress={() => increaseCount(planItem)}
                      >
                        <Text style={styles.uniqueButtonText}>+</Text>
                      </TouchableOpacity>
                      <Text style={styles.name}>{planItem.Steps}</Text>
                      <TouchableOpacity
                        style={styles.uniqueButton}
                        onPress={() => decreaseCount(planItem)}
                      >
                        <Text style={styles.uniqueButtonText}>-</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Swipeable>
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
      {/*   <TouchableOpacity style={styles.button} onPress={savecahnge}>
        <Text style={styles.buttonText}>save</Text>
      </TouchableOpacity>*/}
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
    backgroundColor: "#E16A68",
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
});

export default Traineeexercise;
