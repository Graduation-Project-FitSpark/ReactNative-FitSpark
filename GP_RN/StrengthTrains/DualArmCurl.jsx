import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, View, Button, Text } from "react-native";
import { Camera } from "expo-camera/legacy"; // Using expo-camera for mobile camera access

export default function LiveCameraFeed() {
  const [hasPermission, setHasPermission] = useState(null);
  const [isStreaming, setIsStreaming] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  // Start streaming (start capturing frames)
  const startStreaming = () => {
    setIsStreaming(true);
    streamFrames();
  };

  // Stop streaming (stop capturing frames)
  const stopStreaming = () => {
    setIsStreaming(false);
  };

  // Function to capture frames and send them to the server
  const streamFrames = async () => {
    while (cameraRef.current) {
      try {
        const photo = await cameraRef.current.takePictureAsync({
          base64: true, // Capture in base64
        });

        console.log("Captured photo base64:", photo.base64); // Debugging

        // Send the image to the server
        const response = await fetch("http://192.168.3.182:5050/upload_frame", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ image: photo.base64 }),
        });

        const result = await response.json();
        console.log("Server response:", result);

        if (!response.ok) {
          console.error("Error sending frame:", result);
        }
      } catch (error) {
        console.error("Streaming error:", error);
      }

      // Add a small delay between frames (e.g., 100ms = ~10 FPS)
      await new Promise((resolve) => setTimeout(resolve, 100));
    }
  };

  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <View style={styles.buttons}>
        {!isStreaming ? (
          <Button
            title="Start Streaming"
            onPress={startStreaming}
            disabled={!cameraReady}
          />
        ) : (
          <Button title="Stop Streaming" onPress={stopStreaming} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    margin: 20,
  },
});
