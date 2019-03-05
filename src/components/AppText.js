import React from "react";
import { StyleSheet, Text } from "react-native";

export default class AppText extends React.Component {
  render() {
    return (
      <Text style={[styles.baseText, this.props.style]}>
        {this.props.children}
      </Text>
    );
  }
}

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "openSansSemiBold",
    fontSize: 32,
    color: "#000"
  }
});
