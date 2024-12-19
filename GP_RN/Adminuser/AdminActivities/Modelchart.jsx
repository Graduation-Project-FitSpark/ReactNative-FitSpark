import React from "react";
import { Modal, View, Text, StyleSheet, Button } from "react-native";

function Model({ modalVisible, setModalVisible, iteam }) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <View style={modalStyles.modalModelchart}>
        <View style={modalStyles.modalnt}>
          {console.log(iteam)}
          <Text>{iteam}</Text>
          <Button title="Close Modal" onPress={() => setModalVisible(false)} />
        </View>
      </View>
    </Modal>
  );
}

const modalStyles = StyleSheet.create({
  modalModelchart: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalnt: {
    width: 300,
    padding: 20,
    backgroundColor: "white",
    borderRadius: 10,
    alignItems: "center",
  },
});

export default Model;
