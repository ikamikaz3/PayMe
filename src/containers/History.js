import React from "react";
import { StyleSheet, Text, View } from "react-native";

import SwipeableList from "../components/SwipeableList";

const listData = [
  { key: "1. element" },
  { key: "2. element" },
  { key: "3. element" },
  { key: "4. element" },
  { key: "5. element" },
  { key: "6. element" },
  { key: "7. element" },
  { key: "8. element" },
  { key: "9. element" },
  { key: "10. element" },
  { key: "11. element" },
  { key: "12. element" },
  { key: "13. element" }
];

const styles = StyleSheet.create({
  separatorViewStyle: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  separatorStyle: {
    height: 1,
    backgroundColor: "#000"
  }
});

const History = () => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Text>History Screen</Text>
    <SwipeableList data={listData} styles={styles} />
  </View>
);

export default History;
