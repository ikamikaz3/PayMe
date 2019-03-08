import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, StyleSheet } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { connect } from "react-redux";

import { createPayment, getUser } from "../api/firebaseDatabase";
import {
  PaymentError,
  PaymentPending,
  PaymentSuccess
} from "../redux/actions/actionCreators";

class Pay extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasCameraPermission: null
    };
  }

  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  handleBarCodeRead = ({ data }) => {
    const {
      paymentSuccessAction,
      isPaymentPending,
      paymentPendingAction,
      paymentErrorAction
    } = this.props;

    if (!isPaymentPending) {
      paymentPendingAction(true);
      const newPayment = {
        amount: 100
      };
      getUser(data).then(userSnapshot => {
        if (userSnapshot.val() && userSnapshot.val().email) {
          createPayment(newPayment, userSnapshot, data).then(() => {
            paymentPendingAction(false);
            paymentSuccessAction(true);
          });
        } else {
          paymentPendingAction(false);
          paymentErrorAction("Couldn't pay this user: User not found");
        }
      });
    }
  };

  render() {
    const { hasCameraPermission } = this.state;

    if (hasCameraPermission === null) {
      return <Text>Requesting for camera permission</Text>;
    }
    if (hasCameraPermission === false) {
      return <Text>No access to camera</Text>;
    }
    return (
      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeRead}
          style={StyleSheet.absoluteFill}
        />
      </View>
    );
  }
}

Pay.propTypes = {
  isPaymentPending: PropTypes.bool.isRequired,
  paymentPendingAction: PropTypes.func.isRequired,
  paymentSuccessAction: PropTypes.func.isRequired,
  paymentErrorAction: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  isPaymentPending: state.paymentReducer.isPaymentPending
});

const mapDispatchToProps = dispatch => ({
  paymentPendingAction: isPaymentPending =>
    dispatch(PaymentPending(isPaymentPending)),
  paymentSuccessAction: isPaymentSuccessful =>
    dispatch(PaymentSuccess(isPaymentSuccessful)),
  paymentErrorAction: paymentErrorMessage =>
    dispatch(PaymentError(paymentErrorMessage))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pay);
