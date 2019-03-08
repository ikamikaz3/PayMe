import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, View, Button } from "react-native";
import {
  GoToHistory,
  GoToPayment,
  Logout
} from "../redux/actions/actionCreators";
import GestureNavigator from "../components/GestureNavigator";

const Profile = props => {
  const { goToPaymentAction, goToHistoryAction, logoutAction } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <GestureNavigator
        actionForLeft={() => goToPaymentAction()}
        actionForRight={() => goToHistoryAction()}
      >
        <Text>Profile Screen</Text>
        <Button title="Logout" onPress={() => logoutAction()} />
      </GestureNavigator>
    </View>
  );
};

Profile.propTypes = {
  goToPaymentAction: PropTypes.func.isRequired,
  goToHistoryAction: PropTypes.func.isRequired,
  logoutAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  goToPaymentAction: () => dispatch(GoToPayment()),
  goToHistoryAction: () => dispatch(GoToHistory()),
  logoutAction: () => dispatch(Logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Profile);
