import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { CameraView, Camera } from "expo-camera";
import { Canvas, Skia } from "@shopify/react-native-skia";
import "@tensorflow/tfjs-react-native";
import * as tf from "@tensorflow/tfjs";
import * as posedetection from "@tensorflow-models/pose-detection";

export default function App() {
  const [model, setModel] = useState(null);
  const [poses, setPoses] = useState([]);
  const cameraRef = useRef(null);
  const canvasRef = useRef(null);
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    const loadModel = async () => {
      try {
        await tf.ready();
        console.log("TensorFlow.js is ready");
        const detector = await posedetection.createDetector(
          posedetection.SupportedModels.MoveNet
        );
        setModel(detector);
        console.log("Pose model loaded successfully");
      } catch (error) {
        console.error("Error loading pose detection model:", error);
      }
    };
    loadModel();
  }, []);

  const handleCameraStream = async (frame) => {
    if (model) {
      try {
        const imageData = new ImageData(
          new Uint8ClampedArray(frame.data),
          frame.width,
          frame.height
        );
        const detectedPoses = await model.estimatePoses(imageData);
        console.log("Detected Poses:", detectedPoses);
        setPoses(detectedPoses);
      } catch (error) {
        console.error("Error processing frame:", error);
      }
    }
  };

  const drawPose = (canvas) => {
    if (!canvas || !poses || poses.length === 0) return;
    const keypoints = poses[0].keypoints;
    console.log("Keypoints:", keypoints);
    const connections = [
      [5, 7],
      [7, 9],
      [6, 8],
      [8, 10],
      [5, 6],
      [11, 13],
      [13, 15],
      [12, 14],
      [14, 16],
      [11, 12],
      [0, 5],
      [0, 6],
      [1, 2],
      [2, 3],
      [3, 4],
    ];
    const paint = Skia.Paint();
    paint.setColor(Skia.Color("red"));
    paint.setStrokeWidth(2);
    paint.setStyle(Skia.PaintStyle.Stroke);
    canvas.clear(Skia.Color("black"));
    keypoints.forEach((keypoint) => {
      if (keypoint.score > 0.5) {
        canvas.drawCircle(keypoint.x, keypoint.y, 5, paint);
      }
    });
    connections.forEach(([startIdx, endIdx]) => {
      const start = keypoints[startIdx];
      const end = keypoints[endIdx];
      if (start.score > 0.5 && end.score > 0.5) {
        canvas.drawLine(start.x, start.y, end.x, end.y, paint);
      }
    });
  };

  return (
    <View style={styles.container}>
      <CameraView
        ref={cameraRef}
        style={styles.camera}
        facing="front"
        onAccessibilityAction={() => {
          const camera = cameraRef.current;
          if (camera) {
            const { width, height } = camera.getSupportedRatiosAsync();
            console.log(`Camera ready with dimensions: ${width}x${height}`);
          }
        }}
        ratio="16:9"
      />
      <View style={[styles.overlay, { width, height }]}>
        <Canvas
          ref={canvasRef}
          style={{ width, height }}
          onDraw={(canvas) => drawPose(canvas)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#000",
  },
  camera: {
    width: "100%",
    height: "100%",
    position: "absolute",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});
