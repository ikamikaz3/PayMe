import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Text, View, TextInput, Button } from "react-native";
import { register } from "../redux/reducers/authReducer";
import { navigateBack } from "../redux/actions/actionCreators";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "user@example.com",
      password: "password",
      confirmPassword: "enter password (again)"
    };
  }

  render() {
    const { registerErrorMessage, registerAction, navigateBackAction } = this.props;
    const { email, password, confirmPassword } = this.state;
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Register screen</Text>
        <TextInput
          value={email}
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          value={password}
          onChangeText={text => this.setState({ password: text })}
        />
        <TextInput
          value={confirmPassword}
          onChangeText={text => this.setState({ confirmPassword: text })}
        />
        <Button
          title="Register"
          onPress={() => registerAction(email, password)}
        />
        {registerErrorMessage !== null && <Text>{registerErrorMessage}</Text>}
        <Button title="Back" onPress={() => navigateBackAction()} />
      </View>
    );
  }
}

RegisterComponent.propTypes = {
  registerErrorMessage: PropTypes.string,
  registerAction: PropTypes.func.isRequired,
  navigateBackAction: PropTypes.func.isRequired
};

RegisterComponent.defaultProps = {
  registerErrorMessage: null
};

const mapStateToProps = state => ({
  isRegisterPending: state.authReducer.isRegisterPending,
  isRegisterSuccessful: state.authReducer.isRegisterSuccessful,
  registerErrorMessage: state.authReducer.registerErrorMessage
});

const mapDispatchToProps = dispatch => ({
  navigateBackAction: () => dispatch(navigateBack()),
  registerAction: (email, password) => dispatch(register(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterComponent);
