import React, { useRef, useState, useEffect } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Video } from "expo-av";
import Slider from "@react-native-community/slider";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";

function StartExercise({ route }) {
  const navigation = useNavigation();
  const { videolink, cal } = route.params;

  const video = useRef(null);

  const [isPlaying, setIsPlaying] = useState(true);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const updateProgress = setInterval(async () => {
      if (video.current) {
        const status = await video.current.getStatusAsync();
        setPosition(status.positionMillis);
        setDuration(status.durationMillis);
        if (time === 0 && status.durationMillis > 0) {
          setTime(Math.floor(status.durationMillis / 1000));
        }
      }
    }, 1000);

    return () => clearInterval(updateProgress);
  }, []);

  useEffect(() => {
    if (time > 0) {
      const countdownInterval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(countdownInterval);
    }
  }, [time]);

  const togglePlayPause = async () => {
    if (video.current) {
      if (isPlaying) {
        await video.current.pauseAsync();
      } else {
        await video.current.playAsync();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleRewind = async () => {
    if (video.current) {
      const status = await video.current.getStatusAsync();
      await video.current.setPositionAsync(
        Math.max(status.positionMillis - 10000, 0)
      );
    }
  };

  const handleFastForward = async () => {
    if (video.current) {
      const status = await video.current.getStatusAsync();
      await video.current.setPositionAsync(
        Math.min(status.positionMillis + 10000, status.durationMillis)
      );
    }
  };

  const onSliderValueChange = async (value) => {
    if (video.current) {
      await video.current.setPositionAsync(value);
    }
  };

  const formatTime = (millis) => {
    const minutes = Math.floor(millis / 60000);
    const seconds = ((millis % 60000) / 1000).toFixed(0);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const percentageCompleted = duration
    ? ((position / duration) * 100).toFixed(0)
    : 0;

  return (
    <View style={styles.container}>
      <View style={styles.controalpage}>
        <View style={styles.infocal}>
          <View style={styles.cal}>
            <Text style={styles.caltext}>{cal}</Text>
            <IconIonicons
              name="flame-outline"
              size={18}
              color="#000"
              style={styles.iconfire}
            />
          </View>
          <Text>KCAL BURNED</Text>
        </View>

        <TouchableOpacity
          style={styles.stoppage}
          onPress={() => {
            navigation.pop(2);
          }}
        >
          <IconIonicons name="close-outline" size={25} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.videoSection}>
        <Video
          ref={video}
          source={{
            uri: `${videolink}`,
          }}
          style={styles.video}
          useNativeControls
          resizeMode="contain"
          shouldPlay={isPlaying}
        />
      </View>

      <View style={styles.controlevideo}>
        <View style={styles.timerSection}>
          <Text style={styles.mainTimer}>{formatTime(time * 1000)}</Text>
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
          <Text style={styles.timeText}>{percentageCompleted}%</Text>
        </View>
        <View style={styles.timeInfo}>
          <Text style={styles.labelText}>TOTAL TIME</Text>
          <Text style={styles.labelText}>COMPLETED</Text>
        </View>
        <Slider
          style={styles.slider}
          minimumValue={0}
          maximumValue={duration}
          value={position}
          onSlidingComplete={onSliderValueChange}
          minimumTrackTintColor="#BBF246"
          maximumTrackTintColor="#fff"
          thumbTintColor="#BBF246"
        />

        <View style={styles.buttons}>
          <TouchableOpacity onPress={handleRewind}>
            <Text style={styles.controlText}>Prev</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.playPauseButton}
            onPress={togglePlayPause}
          >
            <IconIonicons
              name={isPlaying ? "pause" : "play"}
              size={30}
              color="#000"
            />
          </TouchableOpacity>

          <TouchableOpacity onPress={handleFastForward}>
            <Text style={styles.controlText}>Next</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  videoSection: {
    width: "100%",
    height: "40%",
    justifyContent: "center",
    alignItems: "center",
  },
  video: {
    width: "100%",
    height: "100%",
  },
  controlevideo: {
    height: "40%",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#1a1a2e",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 10,
    position: "absolute",
    bottom: 0,
  },
  timeInfo: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  timeText: {
    fontSize: 24,
    color: "#FFF",
  },
  labelText: {
    fontSize: 12,
    color: "#FFF",
    opacity: 0.7,
  },
  slider: {
    width: "100%",
    height: 40,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "80%",
  },
  controlText: {
    fontSize: 25,
    color: "#FFF",
  },
  playPauseButton: {
    backgroundColor: "#BBF246",
    height: 80,
    width: 80,
    borderRadius: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  controalpage: {
    marginTop: 15,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  infocal: {},
  stoppage: {
    backgroundColor: "#ededed",
    height: 50,
    width: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  cal: {
    flexDirection: "row",
    gap: 4,
  },
  caltext: {
    fontSize: 26,
    fontStyle: "sans-serif",
  },
  iconfire: {
    marginTop: 11,
    fontStyle: "sans-serif",
  },
  timerSection: {
    width: "100%",
    marginBottom: 30,
  },
  mainTimer: {
    fontSize: 50,
    color: "#FFF",
  },
});

export default StartExercise;
