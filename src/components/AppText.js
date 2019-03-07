import React from "react";
import PropTypes from "prop-types";
import { StyleSheet, View, Text } from "react-native";

class AppText extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { styles, children } = this.props;
    return (
      <View>
        <Text style={[styles.baseText]}>{children}</Text>
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
  styles: PropTypes.shape({
    baseText: PropTypes.arrayOf({
      fontFamily: PropTypes.string.isRequired,
      fontSize: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired
    }).isRequired
  }),
  children: PropTypes.string.isRequired
};

AppText.defaultProps = {
  styles
};

export default AppText;
