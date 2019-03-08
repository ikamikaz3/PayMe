import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  ViewPropTypes,
  View,
  Animated,
  Dimensions,
  PanResponder
} from "react-native";

const { width, height } = Dimensions.get("window");

class GestureNavigator extends Component {
  constructor(props) {
    super(props);

    this.gestureDelay = -35;

    const position = new Animated.ValueXY();
    this.state = { position };
    const { actionForLeft, actionForRight } = this.props;

    // noinspection JSUnusedGlobalSymbols
    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (evt, gestureState) => {
        if (gestureState.dx < -35) {
          const newX = gestureState.dx - this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        } else if (gestureState.dx > 35) {
          const newX = gestureState.dx + this.gestureDelay;
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        console.log(gestureState.dx);
        if (gestureState.dx < -175) {
          Animated.timing(position, {
            toValue: { x: -300, y: 0 },
            duration: 150
          }).start(() => {
            actionForRight();
          });
        } else if (gestureState.dx > 175) {
          Animated.timing(position, {
            toValue: { x: 300, y: 0 },
            duration: 300
          }).start(() => {
            actionForLeft();
          });
        } else {
          console.log("RESET");
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 300
          }).start();
        }
      }
    });
  }

  render() {
    const { position } = this.state;
    const { children, styles } = this.props;
    return (
      <Animated.View
        style={[position.getLayout()]}
        {...this.panResponder.panHandlers}
      >
        {children}
      </Animated.View>
    );
  }
}

const styles = {
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  width,
  height
};

GestureNavigator.propTypes = {
  styles: ViewPropTypes.style,
  children: PropTypes.node.isRequired,
  actionForLeft: PropTypes.func.isRequired,
  actionForRight: PropTypes.func.isRequired
};

GestureNavigator.defaultProps = {
  styles
};

export default GestureNavigator;
