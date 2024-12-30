import React, { useState, useEffect } from "react";
import { StyleSheet, View, Dimensions, Text } from "react-native";
import { WebView } from "react-native-webview";
import Svg, { Circle, Line } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const API_KEY = "f2485e0b-d055-465c-ac91-307e9a5b011a";
const POSETRACKER_API = "https://app.posetracker.com/pose_tracker/tracking";

const CUSTOM_SKELETON_ID = "fc49aa91-8634-43cf-a462-f8c6ae2fea5e";

const PoseEstimation = () => {
  const [poseData, setPoseData] = useState(null);
  const [leftCount, setLeftCount] = useState(0);
  const [rightCount, setRightCount] = useState(0);
  const [message, setMessage] = useState("");
  const [leftAngle, setLeftAngle] = useState(0);
  const [rightAngle, setRightAngle] = useState(0);

  const posetrackerUrl = `${POSETRACKER_API}?token=${API_KEY}&exercise=squat&difficulty=easy&width=${width}&height=${height}&isMobile=true&skeleton=${CUSTOM_SKELETON_ID}`;

  const jsBridge = `
    window.addEventListener('message', function(event) {
      window.ReactNativeWebView.postMessage(JSON.stringify(event.data));
    });

    window.webViewCallback = function(data) {
      window.ReactNativeWebView.postMessage(JSON.stringify(data));
    };

    const originalPostMessage = window.postMessage;
    window.postMessage = function(data) {
      window.ReactNativeWebView.postMessage(typeof data === 'string' ? data : JSON.stringify(data));
    };
    true;
  `;

  const onMessage = (event) => {
    try {
      const parsedData = JSON.parse(event.nativeEvent.data);
      setPoseData(parsedData);

      // Print each keypoint with its number (if keypoints are available)
      if (parsedData && parsedData.keypoints) {
        printKeypoints(parsedData.keypoints);
      } else {
        console.warn("Keypoints data is unavailable");
      }
    } catch (error) {
      console.error("Error processing message:", error);
    }
  };

  const printKeypoints = (keypoints) => {
    if (!keypoints) return;

    keypoints.forEach((point, index) => {
      if (point) {
        console.log(`Keypoint ${index}: x = ${point.x}, y = ${point.y}`);
      }
    });
  };

  // Helper function to calculate the angle between two vectors (shoulder-elbow and elbow-wrist)
  const calculateAngleBetweenVectors = (a, b, c) => {
    // Vector AB = (b.x - a.x, b.y - a.y)
    const AB = { x: b.x - a.x, y: b.y - a.y };
    // Vector BC = (c.x - b.x, c.y - b.y)
    const BC = { x: c.x - b.x, y: c.y - b.y };

    // Dot product of AB and BC
    const dotProduct = AB.x * BC.x + AB.y * BC.y;
    // Magnitudes of AB and BC
    const magAB = Math.sqrt(AB.x * AB.x + AB.y * AB.y);
    const magBC = Math.sqrt(BC.x * BC.x + BC.y * BC.y);

    // Cosine of the angle
    const cosTheta = dotProduct / (magAB * magBC);
    // Angle in radians, then converted to degrees
    const angle = Math.acos(cosTheta) * (180 / Math.PI);
    return angle;
  };

  // Check pose data for counting reps based on angle between shoulder, elbow, and wrist
  const checkReps = (keypoints) => {
    if (!keypoints) return;

    const leftShoulder = keypoints[5];
    const leftElbow = keypoints[6];
    const leftWrist = keypoints[7];

    const rightShoulder = keypoints[2];
    const rightElbow = keypoints[3];
    const rightWrist = keypoints[4];

    if (leftShoulder && leftElbow && leftWrist) {
      const leftArmAngle = calculateAngleBetweenVectors(
        leftShoulder,
        leftElbow,
        leftWrist
      );
      setLeftAngle(leftArmAngle);
      if (leftArmAngle < 30) {
        setLeftCount((prev) => {
          const newCount = prev + 1;
          if (newCount % 5 === 0) {
            setMessage("Nicely Done!");
          }
          if (newCount >= 20) {
            setMessage("Great Work! You Done It!");
          }
          return newCount;
        });
      }
    }

    if (rightShoulder && rightElbow && rightWrist) {
      const rightArmAngle = calculateAngleBetweenVectors(
        rightShoulder,
        rightElbow,
        rightWrist
      );
      setRightAngle(rightArmAngle);
      if (rightArmAngle < 30) {
        setRightCount((prev) => {
          const newCount = prev + 1;
          if (newCount % 5 === 0) {
            setMessage("Keep Working!");
          }
          if (newCount >= 20) {
            setMessage("Great Work! You Done It!");
          }
          return newCount;
        });
      }
    }
  };

  const renderPose = () => {
    if (!poseData || !poseData.keypoints || !poseData.lines) return null;

    const keypoints = poseData.keypoints;
    const lines = poseData.lines;
    checkReps(keypoints);

    return (
      <Svg style={styles.svg}>
        {lines.map(([startIdx, endIdx], index) => {
          const start = keypoints[startIdx];
          const end = keypoints[endIdx];
          if (start && end) {
            return (
              <Line
                key={index}
                x1={start.x * width}
                y1={start.y * height}
                x2={end.x * width}
                y2={end.y * height}
                stroke="red"
                strokeWidth="2"
              />
            );
          }
          return null;
        })}
        {keypoints.map(
          (point, index) =>
            point && (
              <Circle
                key={index}
                cx={point.x * width}
                cy={point.y * height}
                r="5"
                fill="blue"
              />
            )
        )}
      </Svg>
    );
  };

  return (
    <View style={styles.container}>
      <WebView
        javaScriptEnabled={true}
        domStorageEnabled={true}
        allowsInlineMediaPlayback={true}
        mediaPlaybackRequiresUserAction={false}
        style={styles.webView}
        source={{ uri: posetrackerUrl }}
        originWhitelist={["*"]}
        injectedJavaScript={jsBridge}
        onMessage={onMessage}
        debuggingEnabled={true}
        mixedContentMode="compatibility"
        onError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView error:", nativeEvent);
        }}
        onLoadingError={(syntheticEvent) => {
          const { nativeEvent } = syntheticEvent;
          console.warn("WebView loading error:", nativeEvent);
        }}
      />
      {renderPose()}
      <View style={styles.overlay}>
        <Text style={styles.countText}>Left Count: {leftCount}</Text>
        <Text style={styles.countText}>Right Count: {rightCount}</Text>
        <Text style={styles.angleText}>
          Left Arm Angle: {leftAngle.toFixed(2)}°
        </Text>
        <Text style={styles.angleText}>
          Right Arm Angle: {rightAngle.toFixed(2)}°
        </Text>
        {message && <Text style={styles.message}>{message}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
  },
  webView: {
    width: "100%",
    height: "100%",
    zIndex: 1,
  },
  svg: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    zIndex: 2,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 3,
  },
  countText: {
    fontSize: 24,
    color: "white",
    marginBottom: 10,
  },
  angleText: {
    fontSize: 18,
    color: "yellow",
    marginBottom: 10,
  },
  message: {
    fontSize: 24,
    color: "yellow",
  },
});

export default PoseEstimation;
