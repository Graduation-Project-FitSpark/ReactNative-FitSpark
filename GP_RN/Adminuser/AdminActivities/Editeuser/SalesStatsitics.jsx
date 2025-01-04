import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import IconIonicons from "react-native-vector-icons/Ionicons";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import URL from "../../../enum";
import axios from "axios";
function SalesStatsitics() {
  const navigation = useNavigation();
  const [mostPurchased, setMostPurchased] = useState(null);
  const [monthlySales, setMonthlySales] = useState(0);
  const [Monthlydolor, setMonthlydolor] = useState(0);
  const [convertedValue, setConvertedValue] = useState(0);
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [salesChange, setsalesChange] = useState("");
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth() + 1;
  const currentYear = currentDate.getFullYear();
  const [selsdata, setSelsData] = useState([]);
  const [sakeItems, setSakeItems] = useState([]);

  const handlePress = (id) => {
    console.log(`Pressed row with ID_Trainer: ${id}`);
  };
  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        const response1 = await fetch(`${URL}/getAllSalesTrainers`);
        const data1 = await response1.json();
        setSelsData(data1.sales);

        const response2 = await fetch(`${URL}/getAllSales`);
        const data2 = await response2.json();
        setSakeItems(data2.sales);
      } catch (error) {
        console.error("Error fetching sales data:", error);
      }
    };
    fetchSalesData();
  }, []);

  useEffect(() => {
    let count = [];

    sakeItems.forEach((item) => {
      count.push({ Product_Name: item.Product_Name, count_value: 0 });
    });

    selsdata.forEach((value) => {
      const element = count.find(
        (el) => el.Product_Name === value.Product_Name
      );
      if (element) {
        element.count_value += value.Quantity;
      }
    });
    console.log(sakeItems);
    const maxValue = Math.max(...count.map((item) => item.count_value));
    const maxProduct = count.find((item) => item.count_value === maxValue);

    setMostPurchased(maxProduct ? maxProduct.Product_Name : null);
  }, [sakeItems, selsdata]);

  useEffect(() => {
    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();
    let countMonthly = 0;
    let countMonthlyDolor = 0;

    selsdata.forEach((item) => {
      const itemDate = new Date(item.Dateenter.split("T")[0]);
      const itemMonth = itemDate.getMonth() + 1;
      const itemYear = itemDate.getFullYear();

      if (itemMonth === currentMonth && itemYear === currentYear) {
        countMonthly += item.Quantity;
        countMonthlyDolor += item.Price * item.Quantity;
      }
    });
    setMonthlydolor(countMonthlyDolor);
    setMonthlySales(countMonthly);
  }, [selsdata, currentMonth, currentYear]);

  useEffect(() => {
    if (selectedCurrency === "USD") {
      setConvertedValue(Monthlydolor);
      return;
    }

    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        const rate = data.rates[selectedCurrency];
        if (rate) {
          const converted = (Monthlydolor * rate).toFixed(2);
          setConvertedValue(converted);
        }
      })
      .catch((error) => console.error("Error fetching exchange rate:", error));
  }, [selectedCurrency, Monthlydolor]);

  useEffect(() => {
    const countsales = selsdata.filter((user) => {
      const [year, month] = user.Dateenter.split("-");
      return currentMonth === parseInt(month) && currentYear === parseInt(year);
    }).length;

    const countTrainesspass = selsdata.filter((user) => {
      const [year, month] = user.Dateenter.split("-");
      const parsedYear = parseInt(year);
      const parsedMonth = parseInt(month);

      if (
        currentMonth === 1 &&
        currentYear === parsedYear + 1 &&
        parsedMonth === 12
      ) {
        return true;
      }

      return currentMonth - 1 === parsedMonth && currentYear === parsedYear;
    }).length;

    if (countsales > countTrainesspass) {
      setsalesChange("up vs last month ");
    } else if (countsales < countTrainesspass) {
      setsalesChange("down vs last month ");
    } else {
      setsalesChange("no change vs last month ");
    }
  }, [selsdata, currentMonth, currentYear]);
  return (
    <View>
      <View style={styles.inertheader}>
        <IconIonicons
          name="chevron-back-outline"
          size={24}
          color="#000"
          style={styles.icon}
          onPress={() => navigation.goBack()}
        />
        <Text style={styles.textheader}>Sales Info</Text>
      </View>
      <ScrollView
        style={styles.outerContener}
        contentContainerStyle={{ flexGrow: 2 }}
      >
        <View style={styles.cardContener}>
          <View style={styles.leyoutcard}>
            <View style={styles.card} onPress={() => handlePress("2000")}>
              <View style={styles.title}>
                <Text style={styles.label}>Monthly Sales</Text>
                <View style={[styles.icondiv, { backgroundColor: "#94E075" }]}>
                  <IconIonicons name="pricetags" size={16} color="#fff" />
                </View>
              </View>
              <Text style={styles.value}>{monthlySales}</Text>
              <View style={styles.footer}>
                <View style={styles.footer}>
                  {salesChange === "up vs last month " && (
                    <IconIonicons
                      name="arrow-up-outline"
                      size={16}
                      color="#4CAF50"
                    />
                  )}
                  {salesChange === "down vs last month " && (
                    <IconIonicons
                      name="arrow-down-outline"
                      size={16}
                      color="#FF5722"
                    />
                  )}
                  {salesChange === "no change vs last month " && (
                    <IconIonicons
                      name="remove-outline"
                      size={16}
                      color="#757575"
                    />
                  )}
                  <Text
                    style={[
                      styles.changeText,
                      {
                        color:
                          salesChange === "up vs last month "
                            ? "#4CAF50"
                            : salesChange === "down vs last month "
                            ? "#FF5722"
                            : "#757575",
                      },
                    ]}
                  >
                    {salesChange}
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.card} onPress={() => handlePress("2000")}>
              <View style={styles.title}>
                <Text style={styles.label}>Monthly Profit</Text>
                <View style={[styles.icondiv, { backgroundColor: "#E0DB87" }]}>
                  <IconIonicons name="cash" size={16} color="#fff" />
                </View>
              </View>
              <Text style={styles.value}>
                {convertedValue} {selectedCurrency}
              </Text>
              <View style={styles.pointcash}>
                <View style={styles.cash}>
                  <Picker
                    selectedValue={selectedCurrency}
                    style={styles.picker}
                    onValueChange={(itemValue) =>
                      setSelectedCurrency(itemValue)
                    }
                  >
                    <Picker.Item label="USD" value="USD" />
                    <Picker.Item label="ILS" value="ILS" />
                    <Picker.Item label="SAR" value="SAR" />
                  </Picker>
                </View>
              </View>
            </View>
          </View>
          <View>
            <View style={styles.card} onPress={() => handlePress("2000")}>
              <View style={styles.title}>
                <Text style={styles.label}>Most Purchased</Text>
                <View style={[styles.icondiv, { backgroundColor: "#E19083" }]}>
                  <IconIonicons name="heart" size={16} color="#fff" />
                </View>
              </View>
              <Text style={styles.value}>{mostPurchased}</Text>
            </View>
          </View>
        </View>

        <View style={styles.tableContainer}>
          <View style={styles.tableHeaderRow}>
            <Text style={styles.tableHeaderCell}>ID_Sale</Text>
            <Text style={styles.tableHeaderCell}>Name</Text>
            <Text style={[styles.tableHeaderCell, styles.Price]}>Price</Text>
            <Text style={styles.tableHeaderCell}>Quantity</Text>
            <Text style={[styles.tableHeaderCell, styles.usernameCell]}>
              Category
            </Text>
            <Text style={[styles.tableHeaderCell, styles.dateenterCell]}>
              Dateenter
            </Text>
          </View>
          {selsdata.map((row, index) => (
            <TouchableOpacity
              key={row.ID_Trainer}
              style={[
                styles.tableRow,
                index % 2 === 0 ? styles.evenRow : styles.oddRow,
              ]}
              onPress={() => handlePress(row.ID_Trainer)}
            >
              <Text style={styles.tableCell}>{row.ID_Sale}</Text>
              <Text style={styles.tableCell}>{row.Product_Name}</Text>
              <Text style={[styles.tableCell, styles.Price]}>{row.Price}</Text>
              <Text style={styles.tableCell}>{row.Quantity}</Text>
              <Text style={[styles.tableCell, styles.usernameCell]}>
                {row.Salee_Name}
              </Text>
              <Text style={[styles.tableCell, styles.dateenterCell]}>
                {row.Dateenter.split("T")[0]}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContener: {
    paddingTop: 30,
  },
  tableContainer: {
    margin: 10,
    borderRadius: 12,
    backgroundColor: "#f8f8f8",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  tableHeaderRow: {
    flexDirection: "row",
    backgroundColor: "#b2f200",
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tableHeaderCell: {
    flex: 1,
    fontWeight: "bold",
    textAlign: "center",
    color: "#000",
    fontSize: 12,
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#eaeaea",
  },
  tableCell: {
    flex: 1,
    textAlign: "center",
    fontSize: 14,
    color: "#333",
  },
  evenRow: {
    backgroundColor: "#f9f9f9",
  },
  oddRow: {
    backgroundColor: "#fff",
  },
  usernameCell: {
    flex: 1.5,
    textAlign: "center",
  },
  dateenterCell: {
    flex: 2,
    textAlign: "center",
  },
  Price: {
    flex: 0.8,
    textAlign: "center",
  },
  cardContener: {
    flexDirection: "column",
    paddingLeft: 5,
    paddingRight: 10,
  },
  leyoutcard: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  card: {
    margin: 3,
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 3,
  },
  title: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  value: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginVertical: 8,
  },
  label: {
    fontSize: 16,
    color: "#757575",
    marginBottom: 12,
    textAlign: "center",
    marginRight: 10,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    marginTop: 8,
  },
  changeText: {
    fontSize: 12,
    fontWeight: "500",
    marginLeft: 4,
  },
  icondiv: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  pointcash: {
    marginTop: -15,
    marginBottom: -25,
  },
  inertheader: {
    flexDirection: "row",
    gap: 20,
    alignItems: "center",
    justifyContent: "flex-start",
    paddingTop: 30,
    marginBottom: -20,
  },
  textheader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#000",
  },
});

export default SalesStatsitics;
