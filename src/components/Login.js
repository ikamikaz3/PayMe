import React, { Component } from "react";
import PropTypes from "prop-types";
import { Text, View, Button, TextInput } from "react-native";
import { connect } from "react-redux";
import { login } from "../redux/reducers/loginReducer";

class LoginComponent extends Component {
  constructor(props) {
    super(props);
    const { navigation } = props;
    this.state = {
      email: "Enter email",
      password: "Enter password"
    };
  }

  render() {
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
          value={this.state.email}
          onChangeText={email => this.setState({ email })}
        />
        <TextInput
          value={this.state.password}
          onChangeText={password => this.setState({ password })}
        />
        <Button title={"Login"}
          onPress={() => this.props.login(this.state.email, this.state.password)}
        />
      </View>
    );
  }
}

LoginComponent.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired
};

const mapStateToProps = state => {
  return {
    isLoginPending: state.isLoginPending,
    isLoginSuccessful: state.isLoginSuccessful,
    loginErrorMessage: state.loginErrorMessage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    login: (email, password) => dispatch(login(email, password))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);
