import * as tf from "@tensorflow/tfjs";
import * as poseDetection from "@tensorflow-models/pose-detection";
import { CameraView } from "expo-camera";
import { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

export default function DualArmCurl() {
  const [count, setCount] = useState(0);
  const [stage, setStage] = useState(null);
  const [detector, setDetector] = useState(null);
  const cameraRef = useRef(null);

  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const loadModel = async () => {
      console.log("Loading TensorFlow.js...");
      try {
        await tf.ready();
        console.log("TensorFlow.js is ready!");

        const model = await poseDetection.createDetector(
          poseDetection.SupportedModels.MoveNet
        );

        console.log("Pose Detector created successfully:", model);
        setDetector(model);
        console.log("Model loaded successfully.");
      } catch (error) {
        console.error("Error loading model:", error);
      }
    };

    loadModel();
  }, []);

  const calculateAngle = (a, b, c) => {
    const radians =
      Math.atan2(c[1] - b[1], c[0] - b[0]) -
      Math.atan2(a[1] - b[1], a[0] - b[0]);
    let angle = Math.abs(radians * (180.0 / Math.PI));
    if (angle > 180.0) {
      angle = 360 - angle;
    }
    return angle;
  };

  const processPose = (landmarks) => {
    const shoulder = [landmarks[11].x, landmarks[11].y];
    const elbow = [landmarks[13].x, landmarks[13].y];
    const wrist = [landmarks[15].x, landmarks[15].y];

    const angle = calculateAngle(shoulder, elbow, wrist);

    const shoulder1 = [landmarks[12].x, landmarks[12].y];
    const elbow1 = [landmarks[14].x, landmarks[14].y];
    const wrist1 = [landmarks[16].x, landmarks[16].y];

    const angle1 = calculateAngle(shoulder1, elbow1, wrist1);

    if (angle > 90 && angle1 > 90) {
      setStage("up");
    }

    if (angle < 30 && angle1 < 30 && stage === "up") {
      setStage("down");
      setCount((prev) => prev + 1);
    }
  };

  const handleCameraFrame = async (frame) => {
    if (!detector) return;

    const frameTensor = tf.browser.fromPixels(frame);
    const poses = await detector.estimatePoses(frameTensor);

    if (poses.length > 0) {
      processPose(poses[0].keypoints);
    }
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        ref={cameraRef}
        onFrame={handleCameraFrame}
      />
      <Text style={styles.countText}>Count: {count}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  camera: {
    width: "100%",
    height: "100%",
  },
  countText: {
    position: "absolute",
    top: 10,
    left: 10,
    fontSize: 32,
    fontWeight: "bold",
    color: "green",
  },
});
