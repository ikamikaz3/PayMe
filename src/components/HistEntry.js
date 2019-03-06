import React from "react";
import { StyleSheet, View, Platform, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import AppText from "./AppText";

const styles = StyleSheet.create({
  card: {
    height: 100,
    // borderWidth: 0.5,
    flexDirection: "row"
  },
  logo: {
    flex: 0.165,
    flexDirection: "column",
    justifyContent: "center"
  },
  target: {
    flex: 0.5,
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 15
  },
  amount: {
    flex: 0.33,
    alignItems: "flex-end",
    justifyContent: "center"
  },
  text: {
    fontSize: 18
  }
});

class HistEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

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

HistEntry.propTypes = {
  company: PropTypes.string,
  date: PropTypes.string,
  amount: PropTypes.number
};

export default HistEntry;
