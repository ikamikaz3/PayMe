import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppText from "./AppText";

export default class Contact extends React.Component {
  render() {
    return (
      <View style={styles.elements}>
        <View style={styles.aligned}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
            size={50}
          />
          <Ionicons
            name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
            size={50}
          />
          <Ionicons
            name={Platform.OS === "ios" ? "ios-contact" : "md-contact"}
            size={50}
          />
        </View>
        <View style={styles.aligned}>
          <AppText style={styles.textStyle}>John</AppText>
          <AppText style={styles.textStyle}>Doe</AppText>
          <AppText style={styles.textStyle}>John</AppText>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  elements: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "space-evenly",
    marginTop: 25,
    marginBottom: 25
  },
  aligned: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  textStyle: {
    fontSize: 24
  }
});
