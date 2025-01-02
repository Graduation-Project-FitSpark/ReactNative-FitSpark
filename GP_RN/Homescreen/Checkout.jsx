import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import IconFontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import URL from "../enum";
import AsyncStorage from "@react-native-async-storage/async-storage";
function Checkout({ route }) {
  const { Items = [] } = route.params || {};
  const navigation = useNavigation();

  const [total, setTotal] = useState(0);
  const [setshowvias, setsetshowvias] = useState(false);
  const [showcash, setshowcash] = useState(false);
  const [showpaypal, setshowpaypal] = useState(false);
  const [ID_Trainer, setID_Trainer] = useState(0);
  const [location, setLocation] = useState([]);
  const [CVC, setCVC] = useState("");
  const [ExpirationDate, setExpirationDate] = useState("");
  const [CN, setCN] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    async function getID() {
      let id = await AsyncStorage.getItem("ID");
      setID_Trainer(id);
      const username = await AsyncStorage.getItem("username");
      const trainerResponse = await axios.post(`${URL}/getTrainerDetails`, {
        username,
      });

      setCN(trainerResponse.data.trainer.Card_Number);
      setCVC(trainerResponse.data.trainer.CVC);
      setExpirationDate(trainerResponse.data.trainer.Expression_Date);
      setLocation(trainerResponse.data.trainer.Location);
      setName(
        `${trainerResponse.data.trainer.First_Name} ${trainerResponse.data.trainer.Last_Name}`
      );
    }
    getID();
    let calculatedTotal = 0;
    Items.forEach((item) => {
      calculatedTotal += item.Price * item.Quantity;
    });
    setTotal(calculatedTotal);
  }, [Items]);

  const deliveryCost = 10.0;
  const finalTotal = total + deliveryCost;

  const finalpay = async () => {
    const currentDate = new Date().toISOString();

    const updatedItems = Items.map((item) => ({
      ...item,
      ID_Trainer: ID_Trainer,
      Dateenter: currentDate,
    }));

    console.log("====================================");
    console.log("Updated Items with additional properties:", updatedItems);
    console.log("Checkout button pressed");

    try {
      const response = await fetch(`${URL}/uploadOrder`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Items: updatedItems,
          ID_Trainer: ID_Trainer,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        navigation.navigate("Completshot");
      } else {
        throw new Error("Something went wrong while uploading the order.");
      }
    } catch (error) {
      console.error("Error uploading order:", error);
      alert(error.message);
    }
  };

  return (
    <View style={styles.Checkoutouter}>
      <View style={styles.Checkout}>
        <ScrollView>
          <View style={styles.head}>
            <TouchableOpacity
              style={styles.backicon}
              onPress={() => navigation.goBack()}
            >
              <IconIonicons
                name="chevron-back-outline"
                size={20}
                color="#000"
              />
            </TouchableOpacity>
            <View style={styles.topviwe}>
              <IconIonicons name="cart-outline" size={40} color="#EA9C82" />
              <Text style={styles.headerText}>Summary</Text>
            </View>
          </View>

          <View style={styles.summaryitemouter}>
            <View style={styles.summaryItem}>
              <Text style={styles.label}>Total Required:</Text>
              <Text style={styles.value}>${total.toFixed(2)}</Text>
            </View>
            <View style={styles.summaryItem}>
              <Text style={styles.label}>Delivery Cost:</Text>
              <Text style={styles.value}>${deliveryCost.toFixed(2)}</Text>
            </View>
            <View style={styles.finalItem}>
              <Text style={styles.label}>TOTAL:</Text>
              <Text style={styles.value}>${finalTotal.toFixed(2)}</Text>
            </View>
          </View>

          <View style={styles.pay}>
            <TouchableOpacity
              onPress={() => {
                setsetshowvias((prev) => !prev);
                setshowcash(false);
                setshowpaypal(false);
              }}
              style={[styles.payButton, setshowvias && styles.payButtonActive]}
            >
              <IconFontAwesome name="cc-visa" size={35} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setshowpaypal((prev) => !prev);
                setsetshowvias(false);
                setshowcash(false);
              }}
              style={[styles.payButton, showpaypal && styles.payButtonActive]}
            >
              <IconIonicons name="logo-paypal" size={35} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setshowcash((prev) => !prev);
                setsetshowvias(false);
                setshowpaypal(false);
              }}
              style={[styles.payButton, showcash && styles.payButtonActive]}
            >
              <IconIonicons name="cash-outline" size={35} color="#000" />
            </TouchableOpacity>
          </View>

          {setshowvias && (
            <View>
              <Text style={styles.label}>CARDHOLDER'S NAME</Text>
              <TextInput
                style={styles.input}
                placeholder="John Doe"
                placeholderTextColor="#999"
                value={name}
                onChangeText={setName}
              />

              <Text style={styles.label}>CARD NUMBER</Text>
              <TextInput
                style={styles.input}
                placeholder="•••• •••• •••• 1234"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={CN}
                onChangeText={setCN}
              />

              <View style={styles.row}>
                <View style={styles.column}>
                  <Text style={styles.label}>EXP DATE</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="MM/YYYY"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={ExpirationDate.split("T")[0]}
                    onChangeText={setExpirationDate}
                  />
                </View>
                <View style={styles.column}>
                  <Text style={styles.label}>CVC/CVV2</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="•••"
                    placeholderTextColor="#999"
                    keyboardType="numeric"
                    value={CVC}
                    onChangeText={setCVC}
                  />
                </View>
              </View>
            </View>
          )}

          {showcash && (
            <View style={styles.cashContainer}>
              <Text style={styles.cashTitle}>Cash Payment</Text>
              <Text style={styles.cashText}>
                Please prepare the exact amount: ${finalTotal.toFixed(2)}
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Enter any instructions for the delivery person "
                placeholderTextColor="#999"
              />
              <View style={{ marginTop: 16 }}>
                <Text style={styles.cashInstructions}>Instructions:</Text>
                <Text style={styles.cashNote}>
                  The delivery person will collect the cash upon delivery.
                </Text>
              </View>
            </View>
          )}

          {showpaypal && (
            <View style={styles.cashContainer}>
              <Text style={styles.cashTitle}>
                PayPal is not supported, it will be available soon.
              </Text>
            </View>
          )}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.submintbutton} onPress={finalpay}>
        <Text style={styles.submintbuttontext}>PAY NOW</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  Checkoutouter: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  Checkout: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f5f5f5",
  },
  head: {
    flexDirection: "row",
    gap: 80,
  },
  backicon: {
    width: 35,
    height: 35,
    backgroundColor: "#b2f200",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: 20,
    marginRight: 20,
  },
  topviwe: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  headerText: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 10,
    color: "#EA9C82",
  },
  summaryitemouter: {
    marginVertical: 10,
  },
  summaryItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: "#fff",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  finalItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10,
    backgroundColor: "#e3f2fd",
    padding: 15,
    alignItems: "center",
    borderRadius: 10,
  },
  label: {
    fontSize: 16,
    fontWeight: "500",
    color: "#555",
  },
  value: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  pay: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 20,
  },
  submintbutton: {
    backgroundColor: "#b2f200",
    height: "7%",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  submintbuttontext: {
    color: "#000",
    fontSize: 20,
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 10,
    marginVertical: 10,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  column: {
    flex: 1,
    marginHorizontal: 5,
  },
  payButton: {
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  payButtonActive: {
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  cashContainer: {
    padding: 16,

    borderRadius: 8,
    marginTop: 10,
  },
  cashTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
    color: "#333",
  },
  cashText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 12,
  },
  cashInstructions: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 8,
    color: "#555",
  },
  cashNote: {
    fontSize: 14,
    color: "#555",
  },
});

export default Checkout;
