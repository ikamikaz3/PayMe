import React from "react";
import { StyleSheet, View, Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";

export default class HistEntry extends React.Component {
  render() {
    return (
      <View style={styles.card}>
        <View style={styles.logo}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-card" : "md-card"}
            size={55}
          />
        </View>
        <View style={styles.target}>
          <AppText style={styles.text}>{this.props.company}</AppText>
          <AppText style={styles.text}>{this.props.date}</AppText>
        </View>
        <View style={styles.amount}>
          <AppText style={styles.text}>-€{this.props.amount}</AppText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  card: {
    height: 100,
    //borderWidth: 0.5,
    flexDirection: "row"
  },
  logo: {
    flex: 0.165,
    flexDirection: "column",
    justifyContent: "center"
    //backgroundColor: "#f00"
  },
  target: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 15
    //backgroundColor: "#aaa"
  },
  amount: {
    flex: 0.33,
    alignItems: "flex-end",
    justifyContent: "center"
    //backgroundColor: "#ff0"
  },
  text: {
    fontSize: 18
  }
});
