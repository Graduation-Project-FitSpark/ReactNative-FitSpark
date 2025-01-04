import { StyleSheet } from "react-native";

export const Foodplanstyle = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    padding: 20,
    paddingTop: 40,
  },
  Appetizers: {
    justifyContent: "center",
    alignItems: "center",
    gap: 40,
  },
  hader: {
    flexDirection: "row",
  },
  icon: {
    width: "10%",
  },
  titlecontener: {
    width: "90%",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  scrollContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  dayContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: "#EFEFEF",
    marginHorizontal: 5,
    alignItems: "center",
  },
  selectedDay: {
    backgroundColor: "#B2DF92",
  },
  dayText: {
    fontSize: 16,
    color: "#333",
  },
  dateText: {
    fontSize: 14,
    color: "#666",
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 15,
  },
  outermainMealContainer: {
    width: "100%",

    alignItems: "center",
  },
  mainMealContainer: {
    alignItems: "center",
    marginVertical: 15,
    backgroundColor: "#FFA07A",
    padding: 10,
    borderRadius: 10,
    width: 250,
    height: 150,
  },
  mainMealImage: {
    resizeMode: "cover",
    borderRadius: 100,
    width: 150,
    height: 150,
    position: "absolute",
    top: -50,
  },
  mainMealTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  infoContainer: {
    alignItems: "center",
    marginTop: 80,
  },
  outerinfoItem: {
    flexDirection: "row",
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },
  infoText: {
    color: "#FFFFFF",
    marginLeft: 5,
  },
  listContainer: {
    paddingVertical: 10,
  },
  foodContainer: {
    padding: 10,
    borderRadius: 10,
    alignItems: "center",
    width: "48%",
    height: 120,
    margin: 5,

    marginTop: 40,
  },
  foodImage: {
    width: 100,
    height: 100,
    resizeMode: "cover",
    borderRadius: 100,

    position: "absolute",
    top: -40,
  },
  foodName: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  foodDetails: {
    fontSize: 14,
    color: "#777",
    textAlign: "center",
  },
  outercontenierfood: {
    marginTop: 50,
    gap: 10,
  },
  pickerContainer: {
    flexDirection: "row",
    alignItems: "center",
    width: 20,
  },
  picker: {
    flex: 1,
    color: "#000",
    opacity: 0,
  },
  icon2: {
    position: "absolute",
    right: 10,
  },
  mainpicker: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
