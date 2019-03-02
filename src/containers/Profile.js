import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, View, Button } from "react-native";
import { Logout } from "../redux/actions/actionCreators";

const Profile = props => {
  const { logoutAction } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Profile Screen</Text>
      <Button title="Logout" onPress={() => logoutAction()} />
    </View>
  );
};

Profile.propTypes = {
  logoutAction: PropTypes.func.isRequired
};

const mapDispatchToProps = dispatch => ({
  logoutAction: () => dispatch(Logout())
});

export default connect(
  null,
  mapDispatchToProps
)(Profile);
