import React from "react";
import { StyleSheet, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import PropTypes from "prop-types";
import AppText from "./AppText";

class HistEntry extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { styles, company, date, amount } = this.props;
    return (
      <View style={styles.card}>
        <View style={styles.logo}>
          <Ionicons
            name={Platform.OS === "ios" ? "ios-card" : "md-card"}
            size={55}
          />
        </View>
        <View style={styles.target}>
          <AppText style={styles.text}>{company}</AppText>
          <AppText style={styles.text}>{date}</AppText>
        </View>
        <View style={styles.amount}>
          <AppText style={styles.text}>
            -€
            {amount}
          </AppText>
        </View>
      </View>
    );
  }
}

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

HistEntry.propTypes = {
  company: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  amount: PropTypes.number.isRequired,
  styles
};

HistEntry.defaultProps = {
  styles
};
export default HistEntry;
