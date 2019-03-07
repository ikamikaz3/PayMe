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
    // const children = this.props.children;

    // Props don't exist
    if (typeof props === "undefined") {
      console.log("Props are always undefined");
      return (
        <View>
          {/* //   <Text style={[styles.baseText]}>{children}</Text> */}
          <Text style={[styles.baseText, this.props.style]}>
            {this.props.children}
          </Text>
        </View>
      );
    }
    // Props exist
    return (
      <View>
        {/* <Text style={[styles.baseText, props]}>{children}</Text>; */}
        {/* <Text style={[styles.baseText, this.props.style]}>
          {this.props.children} */}
        {/* </Text> */}
      </View>
    );
  }
}

AppText.PropType = {
  children: PropTypes.node
};

export default AppText;
