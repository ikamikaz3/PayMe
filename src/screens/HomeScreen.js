import React from "react";
import PropTypes from "prop-types";
import { Animated, PanResponder, StyleSheet, View } from "react-native";
import { connect } from "react-redux";
import * as firebase from "firebase";

import AppText from "../components/AppText";
import MoneyButton from "../components/MoneyButton";
import {
  GoToCollect,
  GoToHistory,
  GoToPay,
  GoToProfile,
  SetWalletAmount
} from "../redux/actions/actionCreators";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f7faff"
  },
  container: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    marginBottom: 25,
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  balance: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 25,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  buttonsLayout: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  text: {
    marginLeft: 5,
    fontSize: 24
  }
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "MyDigiPay",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center"
    }
  };

  constructor(props) {
    super(props);

    this.gestureDelay = -35;

    const position = new Animated.ValueXY();
    this.state = { position };

    const { goToProfileAction, goToHistoryAction } = this.props;

    const { setWalletAmountAction } = this.props;

    const userUid = firebase.auth().currentUser.uid;
    firebase
      .database()
      .ref(`/users/${userUid}`)
      .on("child_changed", childrenSnapshot => {
        if (childrenSnapshot.val()) {
          setWalletAmountAction(childrenSnapshot.val());
        }
      });

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
        if (gestureState.dx < -175) {
          Animated.timing(position, {
            toValue: { x: -300, y: 0 },
            duration: 150
          }).start(() => {
            goToHistoryAction();
          });
        } else if (gestureState.dx > 175) {
          Animated.timing(position, {
            toValue: { x: 300, y: 0 },
            duration: 300
          }).start(() => {
            goToProfileAction();
          });
        } else {
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
    const { goToPayAction, goToCollectAction, walletAmount } = this.props;
    return (
      <Animated.View
        style={[position.getLayout(), styles.page]}
        {...this.panResponder.panHandlers}
      >
        <View style={styles.container}>
          <View style={styles.balance}>
            <AppText>Current Balance</AppText>
            <AppText>{walletAmount}</AppText>
          </View>
          <View style={styles.buttonsLayout}>
            <MoneyButton type="pay" actionToTrigger={() => goToPayAction()} />
            <MoneyButton
              type="collect"
              actionToTrigger={() => goToCollectAction()}
            />
          </View>
        </View>
      </Animated.View>
    );
  }
}

HomeScreen.propTypes = {
  walletAmount: PropTypes.number.isRequired,
  goToHistoryAction: PropTypes.func.isRequired,
  goToProfileAction: PropTypes.func.isRequired,
  goToPayAction: PropTypes.func.isRequired,
  goToCollectAction: PropTypes.func.isRequired,
  setWalletAmountAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  walletAmount: state.paymentReducer.walletAmount
});

const mapDispatchToProps = dispatch => ({
  goToHistoryAction: () => dispatch(GoToHistory()),
  goToProfileAction: () => dispatch(GoToProfile()),
  goToPayAction: () => dispatch(GoToPay()),
  goToCollectAction: () => dispatch(GoToCollect()),
  setWalletAmountAction: walletAmount => dispatch(SetWalletAmount(walletAmount))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);
