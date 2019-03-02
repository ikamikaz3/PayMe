import React from "react";
import PropTypes from "prop-types";
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
  PanResponder
} from "react-native";

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  listItem: {
    height: 80,
    marginLeft: -100,
    justifyContent: "center"
  },
  absoluteCell: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    width: 300,
    marginLeft: width + 100,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "red"
  },
  absoluteCellText: {
    margin: 16,
    color: "#FFF"
  },
  innerCell: {
    width,
    height: 80,
    marginLeft: 100,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  }
});

class ListItem extends React.PureComponent {
  constructor(props) {
    super(props);

    this.gestureDelay = -35;
    this.scrollViewEnabled = true;

    const position = new Animated.ValueXY();
    this.state = { position };
    const { success, text } = this.props;

    // noinspection JSUnusedGlobalSymbols
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -35) {
          this.setScrollViewEnabled(false);
          const newX = gestureState.dx - this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx > -180) {
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 150
          }).start(() => {
            this.setScrollViewEnabled(true);
          });
        } else {
          Animated.timing(position, {
            toValue: { x: width, y: 0 },
            duration: 300
          }).start(() => {
            success(text);
            this.setScrollViewEnabled(true);
          });
        }
      }
    });

    this.state = { position };
  }

  setScrollViewEnabled(enabled) {
    const { setScrollEnabled } = this.props;
    if (this.scrollViewEnabled !== enabled) {
      setScrollEnabled(enabled);
      this.scrollViewEnabled = enabled;
    }
  }

  render() {
    const { position } = this.state;
    const { text } = this.props;
    return (
      <View style={styles.listItem}>
        <Animated.View
          style={[position.getLayout()]}
          {...this.panResponder.panHandlers}
        >
          <View style={styles.innerCell}>
            <Text>{text}</Text>
          </View>
          <View style={styles.absoluteCell}>
            <Text style={styles.absoluteCellText}>DELETE</Text>
          </View>
        </Animated.View>
      </View>
    );
  }
}

ListItem.propTypes = {
  text: PropTypes.string.isRequired,
  setScrollEnabled: PropTypes.func.isRequired,
  success: PropTypes.func.isRequired
};

export default ListItem;
