import { StyleSheet } from "react-native";

export const Traineetablestyle = StyleSheet.create({
  trainerTableContainer: {
    backgroundColor: "#f8f8f8",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingTop: 30,
    gap: 20,
    height: "100%",
  },
  boxInfoTrainer: {
    width: "80%",
    height: 100,
    backgroundColor: "#ffffff",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,

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
