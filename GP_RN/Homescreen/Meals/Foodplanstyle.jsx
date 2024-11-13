import { StyleSheet } from "react-native";

export const Foodplanstyle = StyleSheet.create({
  title: {
    fontSize: 24,

    color: "#000",

    borderRadius: 5,
  },
  container: {
    paddingTop: 50,
    padding: 20,
  },
  scrollContainer: {
    marginTop: 30,
    paddingHorizontal: 10,
  },
  dayContainer: {
    alignItems: "center",
    padding: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  selectedDay: {
    backgroundColor: "blue",
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  dateText: {
    fontSize: 12,
  },
  selectedDayText: {
    color: "white",
  },
  image: {
    resizeMode: "cover",
    borderRadius: 11,
    width: 300,
    height: 300,
  },
});
