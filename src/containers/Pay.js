import React, { Component } from "react";
import PropTypes from "prop-types";
import { View, StyleSheet } from "react-native";
import { BarCodeScanner, Permissions } from "expo";
import { connect } from "react-redux";

import AppText from "../components/AppText";

import { createPayment, getUser } from "../api/firebaseDatabase";
import {
  PaymentError,
  PaymentPending,
  PaymentSuccess
} from "../redux/actions/actionCreators";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: "25%",
    paddingBottom: "15%",
    paddingLeft: "5%",
    paddingRight: "5%",
    backgroundColor: "rgba(0, 191, 255, 0.5)"
  },
  text: {
    fontSize: 20,
    justifyContent: "center"
  }
});

class Pay extends Component {
  static navigationOptions = {
    title: "Scan a DigiPay QR Code to pay",
    headerTitleStyle: {
      flex: 1,
      paddingRight: 20,
      textAlign: "center"
    }
  };

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
      return (
        <AppText style={styles.text}>Requesting for camera permission</AppText>
      );
    }
    if (hasCameraPermission === false) {
      return <AppText style={styles.text}>No access to camera</AppText>;
    }
    return (
      <View style={styles.container}>
        <BarCodeScanner
          onBarCodeScanned={this.handleBarCodeRead}
          style={{ flex: 1 }}
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
