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
    marginBottom: 5, // Reduce or remove margin to reduce gap
    paddingHorizontal: 10,
    paddingVertical: 5, // Reduce vertical padding if needed
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollContainer: {
    paddingHorizontal: 10,
    paddingBottom: 0, // Ensure no padding at the bottom
    marginBottom: 0, // Ensure there is no bottom margin
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
});
