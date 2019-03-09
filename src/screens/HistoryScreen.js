import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Animated, PanResponder, StyleSheet } from "react-native";

import HistEntry from "../components/HistEntry";
import { GoToProfile, GoToHome } from "../redux/actions/actionCreators";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fff"
  }
});

class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: "Paiment History",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center"
    }
  };

  constructor(props) {
    super(props);

    this.gestureDelay = -35;

    const position = new Animated.ValueXY();
    this.state = { position, scrollEnabled: true };

    const { goToHomeAction, goToProfileAction } = this.props;

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => false,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderTerminationRequest: () => false,
      onPanResponderMove: (evt, gestureState) => {
        const { scrollEnabled } = this.state;
        if (gestureState.dx < -35) {
          const newX = gestureState.dx - this.gestureDelay;
          if (scrollEnabled) this.setState({ scrollEnabled: false });
          position.setValue({ x: newX, y: 0 });
        } else if (gestureState.dx > 35) {
          const newX = gestureState.dx + this.gestureDelay;
          if (scrollEnabled) this.setState({ scrollEnabled: false });
          position.setValue({ x: newX, y: 0 });
        }
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (gestureState.dx < -175) {
          Animated.timing(position, {
            toValue: { x: -300, y: 0 },
            duration: 150
          }).start(() => {
            goToProfileAction();
          });
        } else if (gestureState.dx > 175) {
          Animated.timing(position, {
            toValue: { x: 300, y: 0 },
            duration: 300
          }).start(() => {
            goToHomeAction();
          });
        } else {
          Animated.timing(position, {
            toValue: { x: 0, y: 0 },
            duration: 300
          }).start(this.setState({ scrollEnabled: true }));
        }
      }
    });
  }

  render() {
    const { position, scrollEnabled } = this.state;
    return (
      <Animated.ScrollView
        style={[position.getLayout(), styles.container]}
        {...this.panResponder.panHandlers}
        scrollEnabled={scrollEnabled}
      >
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
      </Animated.ScrollView>
    );
  }
}
HistoryScreen.propTypes = {
  goToHomeAction: PropTypes.func.isRequired,
  goToProfileAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  goToHomeAction: () => dispatch(GoToHome()),
  goToProfileAction: () => dispatch(GoToProfile())
});

export default connect(
  null,
  mapDispatchToProps
)(HistoryScreen);
