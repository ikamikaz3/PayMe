import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
  KeyboardAvoidingView
} from "react-native";
import { register } from "../api/firebaseAuthentication";

import AppText from "../components/AppText";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "rgba(0, 191, 255, 0.5)",
    justifyContent: "space-evenly"
  },
  background: {
    flex: 0.85
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white"
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
  // inputIcon: {
  //   width: 30,
  //   height: 30,
  //   marginRight: 2
  // },
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
  registerButton: {
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
  title: {
    fontSize: 50
  },
  text: {
    fontSize: 18
  }
});

class RegisterScreen extends Component {
  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "user@example.com",
      password: "password",
      confirmPassword: "enter password (again)"
    };
  }

  render() {
    const { registerErrorMessage, registerAction } = this.props;
    const { email, password, confirmPassword } = this.state;
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <StatusBar hidden />
        <Image
          style={styles.avatar}
          source={{
            uri:
              "https://img.freepik.com/free-vector/hand-holding-smartphone-scan-qr-code-pay_32996-137.jpg?size=338&ext=jpg"
          }}
        />
        <AppText style={{ fontSize: 50 }}>My DigiPay</AppText>
        <View style={styles.background}>
          <View style={styles.inputContainer}>
            {/* <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
              }}
            /> */}

            <TextInput
              keyboardType="email-address"
              underlineColorAndroid="transparent"
              value={email}
              style={styles.text}
              onChangeText={text => this.setState({ email: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            {/* <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
              }}
            /> */}

            <TextInput
              value={password}
              style={styles.text}
              onChangeText={text => this.setState({ password: text })}
            />
          </View>

          <View style={styles.inputContainer}>
            {/* <Image
              style={styles.inputIcon}
              source={{
                uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
              }}
            /> */}

            <TextInput
              value={confirmPassword}
              style={styles.text}
              onChangeText={text => this.setState({ confirmPassword: text })}
            />
          </View>

          <TouchableOpacity
            style={[styles.buttonContainer, styles.registerButton]}
            title="Register"
            onPress={() => registerAction(email, password)}
          >
            <AppText style={styles.text}>Register</AppText>
            {registerErrorMessage !== null && (
              <AppText style={styles.text}>{registerErrorMessage}</AppText>
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

RegisterScreen.propTypes = {
  registerErrorMessage: PropTypes.string,
  registerAction: PropTypes.func.isRequired
};

RegisterScreen.defaultProps = {
  registerErrorMessage: null
};

const mapStateToProps = state => ({
  isRegisterPending: state.authReducer.isRegisterPending,
  isRegisterSuccessful: state.authReducer.isRegisterSuccessful,
  registerErrorMessage: state.authReducer.registerErrorMessage
});

const mapDispatchToProps = dispatch => ({
  registerAction: (email, password) => dispatch(register(email, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterScreen);
