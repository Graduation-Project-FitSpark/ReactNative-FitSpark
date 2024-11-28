import React, { useState, useEffect, useCallback } from "react";
import { View, Text, StyleSheet, Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { useFocusEffect } from "@react-navigation/native";
const AnalyticsSection = () => {
  const screenWidth = Dimensions.get("window").width;
  const [IDCoach, setIDCoach] = useState(10); //هون اي دي الي داخل هلا

  const [trainerCoachData, setTrainerCoachData] = useState([
    { ID_Trainer: 1, ID_Coach: 10, Accepted: true },
    { ID_Trainer: 3, ID_Coach: 10, Accepted: false },
    { ID_Trainer: 5, ID_Coach: 6, Accepted: true },
    { ID_Trainer: 7, ID_Coach: 8, Accepted: false },
    { ID_Trainer: 9, ID_Coach: 10, Accepted: true },
    { ID_Trainer: 10, ID_Coach: 11, Accepted: false },
    { ID_Trainer: 12, ID_Coach: 10, Accepted: false },
    { ID_Trainer: 13, ID_Coach: 10, Accepted: true },
    { ID_Trainer: 15, ID_Coach: 16, Accepted: false },
    { ID_Trainer: 17, ID_Coach: 18, Accepted: true },
    { ID_Trainer: 19, ID_Coach: 20, Accepted: false },
  ]);

  const [initialTableData, setInitialTableData] = useState([
    {
      ID_Trainer: 1,
      Gender: "Male",
      Class_Type: "Cardio",
      Location: "[37.74798825940199, -122.420727407486164]",
      Activity_Level: "Fat",
      Card_Number: "594949494",
      Expression_Date: "2000-06-07 00:00:00",
      CVC: 594,
      Points: 0,
      Image: null,
      WatchedVideos: 0,
      Token: null,
      Username: "user_7737",
    },
    {
      ID_Trainer: 3,
      Gender: "Male",
      Class_Type: "Cardio",
      Location: "Nablus",
      Activity_Level: "Fat",
      Card_Number: "065061563",
      Expression_Date: "2000-08-02 00:00:00",
      CVC: 321,
      Points: 500,
      Image: "N",
      WatchedVideos: 0,
      Token: null,
      Username: "user_7733",
    },
    {
      ID_Trainer: 9,
      Gender: "Male",
      Class_Type: "Cardio",
      Location: "[37.68169336082543, -122.44336623698473]",
      Activity_Level: "Fat",
      Card_Number: "594949494",
      Expression_Date: "2005-06-01 00:00:00",
      CVC: 493,
      Points: 100,
      Image: null,
      WatchedVideos: 0,
      Token: null,
      Username: "user_7737",
    },
  ]);

  const [fullTableDatacal, setfullTableData] = useState([
    {
      ID_Trainer: 1,
      ID_Calorie: "0e813dde-9419-4012-b3cb-01f41b9bdcc4",
      Calories: 100,
      Steps: 10000,
      Day: "Monday",
      Date: "2024-10-28",
      Distance: null,
    },

    {
      ID_Trainer: 1,
      ID_Calorie: "dc3cb01-83eb-48a8-9a29-de2c8284ceed",
      Calories: 200,
      Steps: 1000,
      Day: "Thursday",
      Date: "2024-11-14",
      Distance: 400,
    },

    {
      ID_Trainer: 3,
      ID_Calorie: "752e3515-55ff-419f-947c-48c06fe037e5",
      Calories: 100,
      Steps: 0,
      Day: "Friday",
      Date: "2024-11-22",
      Distance: 0,
    },
    {
      ID_Trainer: 3,
      ID_Calorie: "752e3515-55ff-419f-947c-48c06fe037e5",
      Calories: 200,
      Steps: 0,
      Day: "Friday",
      Date: "2024-11-22",
      Distance: 0,
    },
  ]);

  useFocusEffect(
    useCallback(() => {
      //هون عشان تجيب كل تيبل وتخزمها بمكانها وانتبه ان قارن بين كل تيبل وحطها بمكانها المناسب يعني اطلع على كل الداتا الي موجودة فوق وخزن الداتا المناسبه الها الي في الداتا بيس
    })
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
