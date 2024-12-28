import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { WebView } from "react-native-webview";

const CameraStream = () => {
  // state variable 'm' to control rendering
  const [m, setM] = useState(false);

  useEffect(() => {
    // Simulate a delay or change in condition to set 'm' to true after 2 seconds
    setTimeout(() => {
      setM(true); // Change to true to show the WebView
    }, 2000);
  }, []);

  return (
    <View style={styles.container}>
      {m ? (
        <WebView
          source={{ uri: "192.168.3.182:8080/index.html" }} // Replace with the actual server IP
          style={styles.webview}
        />
      ) : (
        <Text style={styles.loadingText}>Loading...</Text> // Placeholder text while 'm' is false
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f0f0f0",
  },
  webview: {
    flex: 1,
    width: "100%",
  },
  loadingText: {
    fontSize: 20,
    color: "#333",
  },
});

export default CameraStream;
