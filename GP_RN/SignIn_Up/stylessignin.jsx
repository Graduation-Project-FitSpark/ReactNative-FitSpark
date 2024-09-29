import { StyleSheet } from "react-native";

export const signInStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  topSection: {
    flex: 1,
    backgroundColor: "#1c1b29",
    justifyContent: "center",
    alignItems: "center",
    borderBottomLeftRadius: 50,
    borderBottomRightRadius: 0,
  },
  tinyLogo: {
    width: 200,
    height: 200,
  },
  mainContent: {
    flex: 2,
    justifyContent: "center",
    paddingHorizontal: 20,
    marginTop: 50,
  },
  title: {
    fontSize: 28,
    marginTop: 20,
    marginBottom: 30,
    textAlign: "center",
    fontWeight: "bold",
    color: "#000",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginVertical: 10,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#1c1b29",
    padding: 15,
    borderRadius: 10,
    width: "90%",
    alignSelf: "center",
    marginVertical: 15,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  footerText: {
    textAlign: "center",
    marginTop: 0,
    color: "#888",
  },
  button1: {
    backgroundColor: "#fff",
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    alignSelf: "center",
    marginLeft: 10,
  },

  buttonView: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 15,
  },
});
