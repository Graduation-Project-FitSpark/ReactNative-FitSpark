import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;
export const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fff",
  },
  welcom: {
    marginTop: 5,
    marginBottom: 10,
    paddingHorizontal: 20,
    paddingVertical: 5,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  namedate: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  date: {
    marginTop: 4,
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 0,
    marginBottom: 0,
  },
  card: {
    width: windowWidth * 0.8,
    height: windowWidth * 0.45,
    marginHorizontal: 10,
    borderRadius: 15,
    overflow: "hidden",
    backgroundColor: "#fff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  image: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#fff",
  },
  cardSubtitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#9fff00",
  },
  textContainer: {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    padding: 20,
    borderRadius: 8,
    width: "60%",
    justifyContent: "space-between",
    height: "100%",
  },
  buttonContainer: {
    position: "absolute",
    bottom: 20,
    right: 20,
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#9fff00",
    justifyContent: "center",
    alignItems: "center",
  },
  playIcon: {
    fontSize: 30,
    color: "#fff",
  },
  arrow: {
    fontSize: 18,
  },
});
