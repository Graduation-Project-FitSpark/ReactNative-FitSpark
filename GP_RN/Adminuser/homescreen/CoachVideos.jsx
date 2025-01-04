import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import axios from "axios";
import { Video } from "expo-av";
import URL from "../../enum";

const CoachVideos = () => {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  const fetchCoachVideos = async () => {
    try {
      const response = await axios.get(`${URL}/getCoachVideos`);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching coach videos:", error);
      Alert.alert("Error", "Failed to fetch coach videos.");
    } finally {
      setLoading(false);
    }
  };

  const deleteCoachVideo = async (trainName, fileName) => {
    console.log(trainName, fileName);
    try {
      const response = await axios.post(
        `${URL}/deleteCoachVideo`,
        {
          Train_Name: trainName,
          File_Name: fileName,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        Alert.alert("Success", "Video deleted successfully!");
        fetchCoachVideos(); // Refresh the list
      } else {
        Alert.alert("Error", "Failed to delete video.");
      }
    } catch (error) {
      console.error("Error deleting coach video:", error);
      Alert.alert("Error", "Failed to delete video.");
    }
  };

  useEffect(() => {
    fetchCoachVideos();
  }, []);

  const renderItem = ({ item }) => {
    if (!item.Train_Name || !item.Videos) return null;

    return (
      <View style={styles.videoContainer}>
        <Text style={styles.trainName}>{item.Train_Name}</Text>
        <FlatList
          data={item.Videos}
          renderItem={({ item: video }) => (
            <View style={styles.videoItem}>
              {video.Coach_Image ? (
                <Image
                  source={{ uri: video.Coach_Image }}
                  style={styles.coachImage}
                />
              ) : (
                <View style={styles.coachImage} />
              )}
              <Text style={styles.username}>{video.Username}</Text>
              <View style={styles.videoWrapper}>
                {/* Video component from expo-av */}
                <Video
                  source={{
                    uri: video.Video_URL,
                  }}
                  style={styles.video}
                  useNativeControls
                  resizeMode="contain"
                  shouldPlay={isPlaying}
                />
              </View>
              <Text style={styles.fileName}>{video.File_Name}</Text>
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => {
                  Alert.alert(
                    "Confirm Delete",
                    `Are you sure you want to delete the video: ${video.File_Name}?`,
                    [
                      { text: "Cancel" },
                      {
                        text: "Delete",
                        onPress: () =>
                          deleteCoachVideo(item.Train_Name, video.File_Name),
                      },
                    ]
                  );
                }}
              >
                <Text style={styles.deleteButtonText}>Delete</Text>
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(video) => video.File_Name}
        />
      </View>
    );
  };

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={(item) => item.Train_Name}
      ListHeaderComponent={
        loading ? (
          <Text style={styles.loadingText}>Loading videos...</Text>
        ) : null
      }
    />
  );
};

const styles = StyleSheet.create({
  videoContainer: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
    paddingTop: 50,
  },
  loadingText: {
    fontSize: 18,
    textAlign: "center",
    marginTop: 20,
  },

  trainName: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  videoItem: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  coachImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#ddd",
    marginBottom: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "left",
  },
  videoWrapper: {
    borderRadius: 10,
    overflow: "hidden",
    marginBottom: 10,
  },
  video: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
  },
  fileName: {
    fontSize: 14,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#c0392b",
    alignItems: "center",
    marginTop: 10,
  },
  deleteButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default CoachVideos;
