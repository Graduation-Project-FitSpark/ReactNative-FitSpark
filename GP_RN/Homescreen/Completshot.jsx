import React, { useEffect } from "react";
import { StyleSheet, View, Image } from "react-native";
import { WebView } from "react-native-webview";
import { useNavigation } from "@react-navigation/native";

const Completshot = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate("Menubar");
    }, 2300);

    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <View style={styles.viewgif}>
      <Image source={require("../img/7efs.gif")} style={styles.webview} />
    </View>
  );
};

const styles = StyleSheet.create({
  viewgif: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  webview: {
    flex: 1,
  },
});

export default Completshot;
