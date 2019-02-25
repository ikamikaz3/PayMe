import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { login } from "../redux/reducers/loginReducer";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "Enter email",
      password: "Enter password"
    };
  }

  render() {
    const { email, password } = this.state;
    const { loginErrorMessage, loginAction } = this.props;
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
      </View>
    );
  }
}

LoginComponent.propTypes = {
  loginErrorMessage: PropTypes.string,
  loginAction: PropTypes.func.isRequired
};

LoginComponent.defaultProps = {
  loginErrorMessage: null
};

const mapStateToProps = state => {
  return {
    isLoginPending: state.loginReducer.isLoginPending,
    isLoginSuccessful: state.loginReducer.isLoginSuccessful,
    loginErrorMessage: state.loginReducer.loginErrorMessage
  };
};

const mapDispatchToProps = dispatch => ({
  loginAction: (email, password) => dispatch(login(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
