import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, View } from "react-native";

import { GoToPayment, GoToProfile } from "../redux/actions/actionCreators";
import GestureNavigator from "../components/GestureNavigator";

const History = props => {
  const { goToPaymentAction, goToProfileAction } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <GestureNavigator
        actionForLeft={() => goToProfileAction()}
        actionForRight={() => goToPaymentAction()}
      >
        <Text>History Screen</Text>
      </GestureNavigator>
    </View>
  );
};

History.propTypes = {
  goToPaymentAction: PropTypes.func.isRequired,
  goToProfileAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  goToPaymentAction: () => dispatch(GoToPayment()),
  goToProfileAction: () => dispatch(GoToProfile())
});

export default connect(
  null,
  mapDispatchToProps
)(History);
