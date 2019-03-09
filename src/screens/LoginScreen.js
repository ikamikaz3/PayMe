import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { connect } from "react-redux";
import { login } from "../api/firebaseAuthentication";
import { goToRegister } from "../redux/actions/actionCreators";

const resizeMode = "center";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#00BFFF"
  },
  header: {
    backgroundColor: "#00BFFF"
  },

  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
    bottom: 550,
    alignSelf: "center",
    position: "absolute",
    marginTop: 130
  },

  inputContainer: {
    borderBottomColor: "#F5FCFF",
    backgroundColor: "#FFFFFF",
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 300,
    height: 45,
    marginBottom: 20,
    alignItems: "center",

    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: "#FFFFFF",
    flex: 1
  },

  inputIcon: {
    width: 30,
    height: 30,
    marginRight: 15,
    flexDirection: "row",
    justifyContent: "flex-end"
  },

  digiTitre: {
    bottom: 50
  },

  notRegisterStyle: {
    backgroundColor: "#db0867",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19
  },
  buttonContainer: {
    height: 45,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
    width: 300,
    borderRadius: 30,
    backgroundColor: "transparent"
  },
  btnForgotPassword: {
    height: 15,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    marginBottom: 10,
    width: 300,
    backgroundColor: "transparent"
  },
  loginButton: {
    backgroundColor: "#00ec56",
    shadowColor: "#808080",
    shadowOffset: {
      width: 0,
      height: 9
    },
    shadowOpacity: 0.5,
    shadowRadius: 12.35,

    elevation: 19
  },
  loginText: {
    color: "white"
  },
  bgImage: {
    flex: 1,
    resizeMode,
    position: "absolute",
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  btnText: {
    color: "white",
    fontWeight: "bold"
  }
});

class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "admin@example.com",
      password: "password"
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
          justifyContent: "center",
          backgroundColor: "#00BFFF"
        }}
      >
        <Image
          style={styles.avatar}
          source={{
            uri:
              "https://img.freepik.com/free-vector/hand-holding-smartphone-scan-qr-code-pay_32996-137.jpg?size=338&ext=jpg"
          }}
        />

        <Text style={styles.digiTitre}>My digi Pay </Text>

        <View style={styles.inputContainer}>
          <TextInput
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            value={password}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          title="Login"
          onPress={() => loginAction(email, password)}
        >
          <Text>Login</Text>

          {loginErrorMessage !== null && <Text>{loginErrorMessage}</Text>}
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.notRegisterStyle]}
          title="Not registered yet?"
          onPress={() => goToRegisterAction()}
        >
          <Text>Not registered yet !</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

LoginScreen.propTypes = {
  loginErrorMessage: PropTypes.string,
  loginAction: PropTypes.func.isRequired,
  goToRegisterAction: PropTypes.func.isRequired
};

LoginScreen.defaultProps = {
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
)(LoginScreen);
