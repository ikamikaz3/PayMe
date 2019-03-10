import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

class AppText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { style, children } = this.props;
    return (
      <View>
        <Text style={style}>{children}</Text>
      </View>
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

AppText.propTypes = {
  style: Text.propTypes.style,
  children: PropTypes.node
};

AppText.defaultProps = {
  style: styles.baseText,
  children: "Text missing."
};

export default AppText;
