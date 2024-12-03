import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";

function Pointtransformer() {
  const [transfre, settransfre] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [points, setpionts] = useState(193.5); //هون انت بس جيب البونت لليوزير الي داخل

  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/ILS")
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[selectedCurrency];
        if (rate) {
          const convertedValue = (points * 5 * rate).toFixed(2);
          settransfre(convertedValue);
        }
      })
      .catch((error) => console.error("Error fetching exchange rate:", error));
  }, [selectedCurrency]);

  return (
    <View style={styles.pointtranfercontner}>
      <View style={styles.pointtranfercontneriner}>
        <Text style={styles.headerText}>Your Points</Text>
        <View style={styles.pointvlaue}>
          <Text style={styles.pointsText}>{points} Points</Text>
        </View>

        <View style={styles.line} />
        <View style={styles.pointcash}>
          <Text style={styles.textcash}>Cash Value:</Text>
          <View style={styles.cash}>
            <Text style={styles.currencyText}>
              {transfre} {selectedCurrency}
            </Text>
            <Picker
              selectedValue={selectedCurrency}
              style={styles.picker}
              onValueChange={(itemValue) => setSelectedCurrency(itemValue)}
              color="#fff"
            >
              <Picker.Item label="USD" value="USD" />
              <Picker.Item label="ILS" value="ILS" />
              <Picker.Item label="SAR" value="SAR" />
            </Picker>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  pointtranfercontner: {
    justifyContent: "center",
    alignItems: "center",

    height: 80,
  },
  pointtranfercontneriner: {
    width: "90%",
    backgroundColor: "#1c1b29",
    borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 8,
  },
  pointvlaue: {
    marginTop: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  line: {
    height: 1,
    backgroundColor: "#fff",
    marginBottom: 10,
    width: "100%",
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#fff",
    alignItems: "flex-start",
  },
  pointsText: {
    fontSize: 18,
    marginBottom: 20,
    color: "#fff",
  },
  pointcash: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  textcash: {
    fontSize: 16,
    fontWeight: "600",
    color: "#fff",
  },
  cash: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 10,
  },
  currencyText: {
    fontSize: 16,
    color: "#fff",
    marginLeft: 5,
  },
  picker: {
    width: "20%",
    marginTop: -15,
    color: "#fff",
  },
});

export default Pointtransformer;
