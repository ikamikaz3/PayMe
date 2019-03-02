import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { login } from "../api/firebaseAuthentication";
import { goToRegister } from "../redux/actions/actionCreators";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "admin@example.com",
      password: "admin"
    };
  }

  render() {
    const { email, password } = this.state;
    const { loginErrorMessage, loginAction, goToRegisterAction } = this.props;
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text> Login Screen </Text>
        <TextInput
          value={email}
          onChangeText={text => this.setState({ email: text })}
        />
        <TextInput
          value={password}
          onChangeText={text => this.setState({ password: text })}
        />
        <Button title="Login" onPress={() => loginAction(email, password)} />
        {loginErrorMessage !== null && <Text>{loginErrorMessage}</Text>}
        <Button
          title="Not registered yet?"
          onPress={() => goToRegisterAction()}
        />
      </View>
    );
  }
}

LoginComponent.propTypes = {
  loginErrorMessage: PropTypes.string,
  loginAction: PropTypes.func.isRequired,
  goToRegisterAction: PropTypes.func.isRequired
};

LoginComponent.defaultProps = {
  loginErrorMessage: null
};

const mapStateToProps = state => ({
  isLoginPending: state.authReducer.isLoginPending,
  isLoginSuccessful: state.authReducer.isLoginSuccessful,
  loginErrorMessage: state.authReducer.loginErrorMessage
});

const mapDispatchToProps = dispatch => ({
  loginAction: (email, password) => dispatch(login(email, password)),
  goToRegisterAction: () => dispatch(goToRegister())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
