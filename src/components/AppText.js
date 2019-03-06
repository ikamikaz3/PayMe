import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, Text } from "react-native";

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "openSansSemiBold",
    fontSize: 32,
    color: "#000"
  }
});

class AppText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { props } = PropTypes.objectOf(this.props);

    return <Text style={[styles.baseText, props.style]}>{props.children}</Text>;
  }
}

export default AppText;
