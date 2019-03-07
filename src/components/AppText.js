import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

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
    const { children } = this.props;

    // Props don't exist
    if (typeof props === "undefined")
      return (
        <View>
          <Text style={[styles.baseText]}>{children}</Text>
          {/* <Text>SOME TEXT</Text> */}
        </View>
      );
    // Props exist
    return <Text style={[styles.baseText, props]}>{children}</Text>;
  }
}

AppText.PropType = {
  children: PropTypes.node
};

export default AppText;
