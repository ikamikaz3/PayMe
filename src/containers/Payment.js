import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, View, Button } from "react-native";
import { GoToCollect, GoToPay } from "../redux/actions/actionCreators";

const Payment = props => {
  const { goToPayAction, goToCollectAction } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Payment Screen</Text>
      <Button title="Pay" onPress={() => goToPayAction()} />
      <Button title="Collect" onPress={() => goToCollectAction()} />
    </View>
  );
};

Payment.propTypes = {
  goToPayAction: PropTypes.func.isRequired,
  goToCollectAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  goToPayAction: () => dispatch(GoToPay()),
  goToCollectAction: () => dispatch(GoToCollect())
});

export default connect(
  null,
  mapDispatchToProps
)(Payment);
