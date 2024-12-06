import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  Image,
  TouchableOpacity,
} from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useFocusEffect } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import URL from "../../enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const AnalyticsSectionSpecilalist = ({ route }) => {
  const navigation = useNavigation();
  const { ID_Trainer, name, Age, img } = route.params;
  const screenWidth = Dimensions.get("window").width;
  const [IDSpecialist, setIDSpecialist] = useState(0);

  const [trainerCoachData, setTrainerCoachData] = useState([]);

  const [initialTableData, setInitialTableData] = useState([]);

  const [fullTableDatacal, setfullTableData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchSpecialistDetails = async () => {
        try {
          const username = await AsyncStorage.getItem("username");
          const ID = await AsyncStorage.getItem("ID");
          setIDSpecialist(ID);

          const response1 = await fetch(`${URL}/getTrainerSpecificDetails`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (!response1.ok) throw new Error(`Failed: ${response1.status}`);
          const data1 = await response1.json();
          setInitialTableData(data1);
          const response2 = await fetch(`${URL}/getTrainerSpecialist`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (!response2.ok) throw new Error(`Failed: ${response2.status}`);
          const data2 = await response2.json();
          setTrainerCoachData(data2);
          const response3 = await fetch(`${URL}/getTrainerClorieDetails`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (!response3.ok) throw new Error(`Failed: ${response3.status}`);
          const data3 = await response3.json();
          setfullTableData(data3);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchSpecialistDetails();
    }, [])
  );
  const [filterchar, setfilterchar] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });
  const [filtercharcal, setfiltercharcal] = useState({
    labels: [],
    datasets: [
      {
        data: [],
      },
    ],
  });

  const bycal = () => {
    const filteredData = fullTableDatacal.filter(
      (item) => item.ID_Trainer === ID_Trainer
    );

    const accumulator = filteredData.map((item) => ({
      ID_Trainer: item.ID_Trainer,
      Calories: item.Calories,
      Username:
        trainerCoachData.find(
          (trainer) => trainer.ID_Trainer === item.ID_Trainer
        )?.Username || "Unknown",
      day: item.Day,
    }));

    console.log("Filtered trainerCoachData (m):", accumulator);

    const chartData = {
      labels: accumulator.map((item) => `${item.day}`),
      datasets: [
        {
          data: accumulator.map((item) => item.Calories),
        },
      ],
    };

    return chartData;
  };

  useEffect(() => {
    const chartDatacal = bycal();
    setfiltercharcal(chartDatacal);
  }, [trainerCoachData, IDSpecialist, initialTableData, fullTableDatacal]);

  const Chartbycal = () => {
    if (!filtercharcal.datasets[0].data.length) {
      return (
        <View style={styles.containerbar}>
          <Text>No data available</Text>
        </View>
      );
    }

    return (
      <View style={styles.containerbar}>
        <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 10 }}>
          Weekly Calorie Details for Trainee
        </Text>
        <BarChart
          data={filtercharcal}
          width={screenWidth - 40}
          height={350}
          chartConfig={{
            backgroundColor: "#1c1b29",
            backgroundGradientFrom: "#1c1b29",
            backgroundGradientTo: "#1c1b29",
            decimalPlaces: 0,
            color: (opacity = 2) => `rgba(178, 242, 1, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 20,
            },
            propsForDots: {
              r: "5",
              strokeWidth: "2",
              stroke: "#b2f200",
            },
            barPercentage: 0.6,
          }}
          verticalLabelRotation={15}
          style={{
            marginVertical: 10,
            borderRadius: 20,
          }}
        />
      </View>
    );
  };

  const Info = () => {
    const trainerExists = initialTableData.find(
      (item) => ID_Trainer === item.ID_Trainer
    );
    console.log(trainerExists);

    if (!trainerExists) {
      return null;
    }

    return (
      <View style={styles.infoContainer}>
        <View style={styles.infoSection}>
          <View style={styles.inerinfoSection}>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Weight</Text>
              <Text style={styles.infoTitle}>{trainerExists.Weight}kg</Text>
            </View>
            <View style={styles.infoCard}>
              <Text style={styles.infoTitle}>Height</Text>
              <Text style={styles.infoTitle}>{trainerExists.Height}cm</Text>
            </View>
          </View>

          <View style={styles.infoBmiContainer}>
            <Text style={styles.infoBmiText}>Activity_Level:</Text>
            <Text style={styles.infoBmiText}>
              {trainerExists.Activity_Level}
            </Text>
          </View>
        </View>
        <View style={styles.infoSectionparttow}>
          <View style={styles.infoCard1}>
            <Text style={styles.infoBMRText}>BMR:</Text>
            <Text style={styles.infoBMRText}>
              {["Male", "male", "MALE"].includes(trainerExists.Gender)
                ? 10 * trainerExists.Weight +
                  6.25 * trainerExists.Height -
                  5 * Age +
                  5
                : 10 * trainerExists.Weight +
                  6.25 * trainerExists.Height -
                  5 * Age -
                  161}
            </Text>
          </View>
          <View style={styles.infoCard1}>
            <Text style={styles.infoBMRText}>BMI:</Text>
            <Text style={styles.infoBMRText}>
              {(trainerExists.Weight / trainerExists.Height) ^ 2}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const Userinfo = () => {
    return (
      <View style={styles.outerboxInfoTrainer}>
        <View style={styles.boxInfoTrainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <IconIonicons name="chevron-back-outline" size={25} color="#000" />
          </TouchableOpacity>
          <Image source={{ uri: img }} style={styles.trainerImage} />
          <View style={styles.trainerinfodetels}>
            <Text>Name: {name}</Text>
            <Text>Age: {Age}</Text>
          </View>
        </View>
      </View>
    );
  };
  return (
    <View style={styles.containerchart}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Userinfo />
        <Info />
        <Chartbycal></Chartbycal>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    backgroundColor: "#fff",
    gap: 30,
    paddingTop: 30,
  },
  containerchart: {
    flex: 1,

    height: "100%",
  },
  containerbar: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  infoContainer: {
    width: "100%",
    justifyContent: "center",
    backgroundColor: "#fff",
    flexDirection: "row",
    gap: 20,
  },
  infoSection: {
    width: "48%",
    justifyContent: "space-between",
  },
  inerinfoSection: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    gap: 20,
  },
  infoCard: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "45%",
  },
  infoTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#495057",
    textAlign: "center",
  },
  infoBmiContainer: {
    backgroundColor: "#6c757d",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },
  infoBMRText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#000",
  },
  infoBmiText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#ffffff",
  },
  infoSectionparttow: {
    width: "35%",
    gap: 15,
  },
  infoCard1: {
    backgroundColor: "#ffffff",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    width: "100%",
    height: 70,
    alignItems: "center",
  },
  trainerTableContainer: {
    backgroundColor: "#f8f8f8",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
    gap: 20,
    height: "100%",
  },
  outerboxInfoTrainer: {
    width: "100%",
    alignItems: "center",
  },
  boxInfoTrainer: {
    width: "100%",
    height: 100,
    backgroundColor: "#ffffff",

    flexDirection: "row",
    gap: 20,
    padding: 10,
  },
  text: {
    fontSize: 16,
    color: "#333",
  },
  trainerImage: {
    width: "30%",
    height: "100%",
    borderRadius: 10,
    marginBottom: 10,
  },
  trainerinfodetels: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  traineertitle: {
    width: "100%",
    alignItems: "center",
    paddingLeft: 10,
  },
  title: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default AnalyticsSectionSpecilalist;
