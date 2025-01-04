import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { BarChart, PieChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";
import { ProgressBar } from "react-native-paper";
import IconIonicons from "react-native-vector-icons/Ionicons";
import URL from "../enum";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
const screenWidth = Dimensions.get("window").width;
const WeeklyPlan = () => {
  const [idtrinee, setIdTrainee] = useState(0);
  const [bmi, setBmi] = useState(0);
  const [bmr, setbmr] = useState(0);
  const [genderData, setGenderData] = useState([]);

  const [initialTableData, setInitialTableData] = useState([]);

  const [fullTableDatacal, setfullTableDatacal] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const id = await AsyncStorage.getItem("ID");
        setIdTrainee(id);
        const response = await fetch(`${URL}/getTrainerSpecificDetails`);
        console.log(id);

        if (!response.ok) {
          throw new Error("Failed to fetch trainer details");
        }
        const data = await response.json();
        setInitialTableData(data);

        const response2 = await fetch(`${URL}/getTrainerClorieDetails`);

        if (!response2.ok) {
          throw new Error("Failed to fetch coach details");
        }
        const data2 = await response2.json();
        setfullTableDatacal(data2);
        console.log(initialTableData);
        console.log(fullTableDatacal);
      } catch (err) {
        console.error("Error fetching trainer details:", err);
      }
    };
    fetchUsers();
  }, []);
  const [filterChar, setFilterChar] = useState({
    labels: [],
    datasets: [
      {
        label: "Points",
        data: [],
        backgroundColor: "rgba(75,192,192,0.4)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 1,
      },
    ],
  });

  const byPoint = () => {
    const groupedData = fullTableDatacal.reduce((acc, item) => {
      if (item.ID_Trainer === idtrinee) {
        if (!acc[item.Day]) {
          acc[item.Day] = 0;
        }
        acc[item.Day] += item.Calories;
      }
      return acc;
    }, {});

    return {
      labels: Object.keys(groupedData),
      datasets: [
        {
          data: Object.values(groupedData),
        },
      ],
    };
  };

  useEffect(() => {
    const find = initialTableData.find((item) => item.ID_Trainer === idtrinee);
    if (find) {
      setBmi((find.Weight / (find.Height / 100) ** 2).toFixed(2));
    }

    const findbmr = initialTableData.find(
      (item) => item.ID_Trainer === idtrinee
    );
    if (findbmr) {
      const bmr =
        10 * findbmr.Weight +
        6.25 * findbmr.Height -
        5 * findbmr.Age +
        (findbmr.Gender === "Male" ? 5 : -161);

      setbmr(bmr.toFixed(2));
    }

    const findfatwater = initialTableData.find(
      (item) => item.ID_Trainer === idtrinee
    );

    if (findfatwater) {
      const water =
        findfatwater.Weight * (findfatwater.Gender === "Male" ? 0.6 : 0.5);
      const fat =
        1.2 * bmi +
        0.23 * findfatwater.Age -
        10.8 * (findfatwater.Gender === "Male" ? 1 : 0) -
        5.4;
      setGenderData([
        {
          name: "Fat",
          population: fat,
          color: "#DAE174",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
        {
          name: "Water",
          population: water,
          color: "#8CDEBD",
          legendFontColor: "#7F7F7F",
          legendFontSize: 15,
        },
      ]);
    }

    setFilterChar(byPoint());
  }, [idtrinee, bmi, fullTableDatacal, initialTableData]);

  return (
    <ScrollView style={styles.palncont}>
      <View style={styles.section}>
        <Text style={styles.subHeader}>BMI</Text>
        <Text>Your BMI is: {bmi}</Text>
        <ProgressBar
          progress={bmi / 40}
          color="#6EDB87"
          style={styles.progressBar}
        />
        <Text>
          {bmi < 18.5
            ? "Category: Underweight"
            : bmi >= 18.5 && bmi <= 24.9
            ? "Category: Normal weight"
            : bmi >= 25 && bmi <= 29.9
            ? "Category: Overweight"
            : bmi >= 30 && bmi <= 34.9
            ? "Category: Obesity (Class I)"
            : bmi >= 35 && bmi <= 39.9
            ? "Category: Obesity (Class II)"
            : "Category: Extreme Obesity (Class III)"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>BMR</Text>
        <Text>Your BMR is: {bmr}</Text>
        <ProgressBar
          progress={bmr / 3857}
          color="#6EDB87"
          style={styles.progressBar}
        />

        <Text>
          {bmr < 1200
            ? "Activity Level: Sedentary (little to no exercise)"
            : bmr >= 1200 && bmr <= 1400
            ? "Activity Level: Lightly active (light exercise/sports 1–3 days/week)"
            : bmr > 1400 && bmr <= 1600
            ? "Activity Level: Moderately active (moderate exercise/sports 3–5 days/week)"
            : bmr > 1600 && bmr <= 1800
            ? "Activity Level: Very active (hard exercise/sports 6–7 days/week)"
            : "Activity Level: Extra active (very hard exercise/physical job)"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Calories by Week</Text>
        <BarChart
          data={filterChar}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subHeader}>Fat/Water</Text>
        <PieChart
          data={genderData.map((item) => ({
            ...item,
            name: item.name,
          }))}
          width={screenWidth * 0.9}
          height={220}
          chartConfig={chartConfig}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
        />
      </View>
    </ScrollView>
  );
};

const chartConfig = {
  backgroundGradientFrom: "#fff",
  backgroundGradientTo: "#fff",
  color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: {
    borderRadius: 16,
  },
};

const styles = StyleSheet.create({
  palncont: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  section: {
    marginBottom: 20,
    padding: 15,
    border: "2px solid #ccc",
    borderRadius: 10,
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 1)",
    backgroundColor: "#f9f9f9",
  },
  progressBar: {
    height: 10,
    borderRadius: 5,
    marginVertical: 10,
  },
  headrequst: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    marginTop: 20,
  },
  bouttonback: {
    marginTop: 5,
    marginRight: -50,
  },
  traineertitle: {
    width: "100%",
    alignItems: "center",
    paddingLeft: 10,
  },
  titlepaln: {
    marginTop: 5,
    fontWeight: "bold",
    fontSize: 20,
  },
});

export default WeeklyPlan;
