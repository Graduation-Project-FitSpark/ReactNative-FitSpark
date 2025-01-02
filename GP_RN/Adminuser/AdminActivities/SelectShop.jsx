import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
/////////////////
function SelectShop() {
  const navigation = useNavigation();
  return (
    <View style={styles.Chosseuser}>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("AddItem")}
      >
        <ImageBackground
          source={{
            uri: "https://png.pngtree.com/thumb_back/fh260/background/20230718/pngtree-digital-retailing-illustration-laptop-keyboard-with-shopping-basket-and-e-commerce-image_3903657.jpg",
          }}
          style={styles.backgroundImage}
        >
          <View style={styles.boxshwdo}>
            <Text style={styles.text}>Add New Items</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate("SalesStatsitics")}
      >
        <ImageBackground
          source={{
            uri: "https://thumbs.dreamstime.com/b/financial-background-digital-illustration-63048926.jpg",
          }}
          style={styles.backgroundImage}
        >
          <View style={styles.boxshwdo}>
            <Text style={styles.text}>See The Last Sales Updates</Text>
          </View>
        </ImageBackground>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Chosseuser: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 10,
    gap: 10,
    paddingTop: 30,
    justifyContent: "center",
    alignItems: "center",
    marginTop: "20%",
    marginBottom: "20%",
  },
  card: {
    flex: 1,
    marginBottom: 10,
    borderRadius: 10,
    overflow: "hidden",
    width: "100%",
    maxHeight: "76%",
  },
  backgroundImage: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 30,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    textAlign: "center",
    letterSpacing: 10,
  },
  boxshwdo: {
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    width: "100%",
    height: "100%",
    justifyContent: "center",
  },
  titleUsers: {
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default SelectShop;
