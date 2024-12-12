import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ImageBackground,
} from "react-native";
import { sendMessage, useMessages } from "../firebase";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import URL from "../enum";

function ChatTrainerCoach({ route, navigation }) {
  const [input, setInput] = useState("");
  const [trainerId, setTrainerId] = useState(null);
  const [coachId, setCoachId] = useState(null);
  const [name, setName] = useState("");
  const [img, setImg] = useState("");

  useEffect(() => {
    const getIds = async () => {
      try {
        const trainer = await AsyncStorage.getItem("ID");
        if (trainer !== null) {
          setTrainerId(trainer);
        }

        const response = await fetch(`${URL}/getTrainerSignedCoach`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID_Trainer: trainer }),
        });

        if (response.ok) {
          const data = await response.json();
          const { ID_Coach, Name, ImageUrl } = data;
          setCoachId(ID_Coach);
          setName(Name);
          setImg(ImageUrl);
        }
      } catch (e) {
        console.error("Failed to fetch IDs from AsyncStorage", e);
      }
    };

    getIds();
  }, []);

  const { messages } = useMessages(trainerId, coachId);

  const receivedMessages = Array.isArray(messages)
    ? messages.sort((a, b) => a.timestamp.toMillis() - b.timestamp.toMillis())
    : [];
  const handleSendMessage = () => {
    if (input.trim() === "") return;

    if (coachId) {
      sendMessage(input, trainerId, coachId);
      setInput("");
    }
  };

  return (
    <ImageBackground
      source={require("../assets/bg.jpg")}
      style={styles.background}
    >
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          ></TouchableOpacity>
          <Image
            source={{ uri: img ? img : "../assets/icon.jpg" }}
            style={styles.trainerImage}
          />
          <View style={styles.trainerInfo}>
            <Text style={styles.trainerName}>{name}</Text>
          </View>
        </View>
        <FlatList
          data={receivedMessages}
          keyExtractor={(item) => item.id}
          renderItem={({ item, index }) => {
            const isLastMessage =
              index === receivedMessages.length - 1 ||
              receivedMessages[index + 1]?.senderId !== item.senderId;

            return (
              <View style={styles.messageRow}>
                {item.senderId == coachId && (
                  <View style={styles.leftImageContainer}>
                    {isLastMessage && (
                      <Image
                        source={{ uri: img ? img : "../assets/icon.jpg" }}
                        style={styles.profileImage}
                      />
                    )}
                  </View>
                )}
                <View
                  style={[
                    styles.messageBubble,
                    item.senderId === coachId
                      ? styles.coachBubble
                      : styles.traineeBubble,
                  ]}
                >
                  <Text style={styles.messageText}>{item.text}</Text>
                </View>
              </View>
            );
          }}
          contentContainerStyle={styles.chatArea}
        />

        <View style={styles.inputArea}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            style={styles.sendButton}
            onPress={handleSendMessage}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#D8D8D8",
    padding: 10,
  },
  backButton: {
    marginRight: 10,
    padding: 10,
  },
  trainerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  trainerInfo: {
    justifyContent: "center",
  },
  trainerName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  chatArea: {
    flexGrow: 1,
    padding: 10,
  },
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 5,
  },
  leftImageContainer: {
    width: 40,
    justifyContent: "flex-end",
    alignItems: "center",
  },
  profileImage: {
    width: 30,
    height: 30,
    borderRadius: 15,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  traineeBubble: {
    backgroundColor: "#E0F7FA",
    alignSelf: "flex-end",
    marginLeft: "auto",
  },
  coachBubble: {
    backgroundColor: "#FFECB3",
    alignSelf: "flex-start",
    marginLeft: 10,
  },
  messageText: {
    fontSize: 16,
  },
  inputArea: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    padding: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#ddd",
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  sendButtonText: {
    fontSize: 16,
    color: "#fff",
  },
  background: {
    flex: 1,
    resizeMode: "cover",
  },
});

export default ChatTrainerCoach;
