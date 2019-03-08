import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, View, Button } from "react-native";
import * as firebase from "firebase";

import {
  GoToCollect,
  GoToPay,
  SetWalletAmount
} from "../redux/actions/actionCreators";

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
    const { goToPayAction, goToCollectAction, walletAmount } = this.props;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Payment Screen</Text>
        <Text>{walletAmount}</Text>
        <Button title="Pay" onPress={() => goToPayAction()} />
        <Button title="Collect" onPress={() => goToCollectAction()} />
      </View>
    );
  }
}

Payment.propTypes = {
  walletAmount: PropTypes.number.isRequired,
  goToPayAction: PropTypes.func.isRequired,
  goToCollectAction: PropTypes.func.isRequired,
  setWalletAmountAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  walletAmount: state.paymentReducer.walletAmount
});

const mapDispatchToProps = dispatch => ({
  goToPayAction: () => dispatch(GoToPay()),
  goToCollectAction: () => dispatch(GoToCollect()),
  setWalletAmountAction: amountReceived =>
    dispatch(SetWalletAmount(amountReceived))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Payment);
