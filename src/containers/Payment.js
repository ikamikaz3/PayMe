import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, View, Button, Dimensions } from "react-native";
import * as firebase from "firebase";

import {
  GoToCollect,
  GoToPay,
  SetWalletAmount,
  GoToHistory,
  GoToProfile
} from "../redux/actions/actionCreators";
import GestureNavigator from "../components/GestureNavigator";

class Payment extends Component {
  constructor(props) {
    super(props);
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
  }

  render() {
    const {
      goToPayAction,
      goToCollectAction,
      walletAmount,
      goToHistoryAction,
      goToProfileAction
    } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <GestureNavigator
          actionForLeft={() => goToHistoryAction()}
          actionForRight={() => goToProfileAction()}
        >
          <Text>Payment Screen</Text>
          <Text>{walletAmount}</Text>
          <Button title="Pay" onPress={() => goToPayAction()} />
          <Button title="Collect" onPress={() => goToCollectAction()} />
        </GestureNavigator>
      </View>
    );
  }
}

Payment.propTypes = {
  walletAmount: PropTypes.number.isRequired,
  goToPayAction: PropTypes.func.isRequired,
  goToCollectAction: PropTypes.func.isRequired,
  goToHistoryAction: PropTypes.func.isRequired,
  goToProfileAction: PropTypes.func.isRequired,
  setWalletAmountAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  walletAmount: state.paymentReducer.walletAmount
});

const mapDispatchToProps = dispatch => ({
  goToPayAction: () => dispatch(GoToPay()),
  goToCollectAction: () => dispatch(GoToCollect()),
  goToHistoryAction: () => dispatch(GoToHistory()),
  goToProfileAction: () => dispatch(GoToProfile()),
  setWalletAmountAction: amountReceived =>
    dispatch(SetWalletAmount(amountReceived))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
