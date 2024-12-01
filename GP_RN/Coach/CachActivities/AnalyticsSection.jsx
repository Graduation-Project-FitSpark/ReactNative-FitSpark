import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useFocusEffect } from "@react-navigation/native";
import URL from "../../enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
const AnalyticsSection = () => {
  const screenWidth = Dimensions.get("window").width;
  const [IDCoach, setIDCoach] = useState(0);
  const [trainerCoachData, setTrainerCoachData] = useState([]);
  const [initialTableData, setInitialTableData] = useState([]);
  const [fullTableDatacal, setfullTableData] = useState([]);

  useFocusEffect(
    useCallback(() => {
      const fetchCoachDetails = async () => {
        try {
          const username = await AsyncStorage.getItem("username");
          const ID = await AsyncStorage.getItem("ID");
          setIDCoach(ID);

          const response1 = await fetch(`${URL}/getTrainerSpecificDetails`, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
          });
          if (!response1.ok) throw new Error(`Failed: ${response1.status}`);
          const data1 = await response1.json();
          setInitialTableData(data1);
          const response2 = await fetch(`${URL}/getTrainerCoach`, {
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

      fetchCoachDetails();
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

  const byPoint = (trainerCoachData, IDCoach, initialTableData) => {
    const m = trainerCoachData
      .filter((train) => train.ID_Coach === IDCoach)
      .map((train) => ({ id: train.ID_Trainer }));

    const a = initialTableData
      .filter((plan) => m.some((train) => plan.ID_Trainer === train.id))
      .map((plan) => ({
        ID_Trainer: plan.ID_Trainer,
        Points: plan.Points || 0,
        Username: plan.Username || "Unknown",
      }));

    const chartData = {
      labels: a.map((item) => `${item.Username}`),
      datasets: [
        {
          data: a.map((item) => item.Points),
        },
      ],
    };

    return chartData;
  };

  const bycal = (
    trainerCoachData,
    IDCoach,
    initialTableData,
    fullTableDatacal
  ) => {
    const m = trainerCoachData
      .filter((train) => train.ID_Coach === IDCoach)
      .map((train) => ({ id: train.ID_Trainer }));

    const a = initialTableData
      .filter((plan) => m.some((train) => plan.ID_Trainer === train.id))
      .map((plan) => ({
        ID_Trainer: plan.ID_Trainer,
        Points: plan.Points || 0,
        Username: plan.Username || "Unknown",
      }));

    const r = fullTableDatacal
      .filter((plan1) =>
        a.some((train) => plan1.ID_Trainer === train.ID_Trainer)
      )
      .map((plan1) => ({
        ID_Trainer: plan1.ID_Trainer,
        Calories: plan1.Calories || 0,
        Username:
          a.find((train) => train.ID_Trainer === plan1.ID_Trainer)?.Username ||
          "Unknown",
      }));
    console.log("Filtered trainerCoachData (m):", r);
    const e = r.reduce((accumulator, item) => {
      const trainer = accumulator.find(
        (row) => row.ID_Trainer === item.ID_Trainer
      );
      if (trainer) {
        trainer.Calories += item.Calories;
      } else {
        accumulator.push({
          ID_Trainer: item.ID_Trainer,
          Calories: item.Calories,
          Username: item.Username,
        });
      }

      return accumulator;
    }, []);
    console.log("Filtered trainerCoachData (m):", e);
    const chartData = {
      labels: e.map((item) => `${item.Username}`),
      datasets: [
        {
          data: e.map((item) => item.Calories),
        },
      ],
    };

    return chartData;
  };

  useEffect(() => {
    const chartData = byPoint(trainerCoachData, IDCoach, initialTableData);
    setfilterchar(chartData);
    const chartDatacal = bycal(
      trainerCoachData,
      IDCoach,
      initialTableData,
      fullTableDatacal
    );
    setfiltercharcal(chartDatacal);
  }, [trainerCoachData, IDCoach, initialTableData, fullTableDatacal]);

  const Chartbypoint = () => {
    if (!filterchar.datasets[0].data.length) {
      return (
        <View style={styles.containerbar}>
          <Text>No data available</Text>
        </View>
      );
    }

    return (
      <View style={styles.containerbar}>
        <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 10 }}>
          Points by Trainer
        </Text>
        <BarChart
          data={filterchar}
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
  const Chartbycal = () => {
    if (!filterchar.datasets[0].data.length) {
      return (
        <View style={styles.containerbar}>
          <Text>No data available</Text>
        </View>
      );
    }

    return (
      <View style={styles.containerbar}>
        <Text style={{ textAlign: "center", fontSize: 20, marginVertical: 10 }}>
          Calories by Trainer / Weekly
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
  return (
    <View style={styles.containerchart}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Chartbypoint />
        <Chartbycal></Chartbycal>
        <Chartbypoint />
        {/*هاي حطيها بس عشان احل مشكلة السكرول عشان الجدول تاع الكلوري يبيم لاخرو لم تخلص شغل من هاي الصفحة امسحو */}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    width: "100%",
    backgroundColor: "#fff",
    gap: 10,
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
});

export default AnalyticsSection;
