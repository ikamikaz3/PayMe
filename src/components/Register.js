import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image
} from "react-native";
import { register } from "../redux/reducers/authReducer";

const resizeMode = "center";

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
    const { styles, registerErrorMessage, registerAction } = this.props;
    const { email, password, confirmPassword } = this.state;
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
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/message/ultraviolet/50/3498db"
            }}
          />

          <TextInput
            keyboardType="email-address"
            underlineColorAndroid="transparent"
            value={email}
            onChangeText={text => this.setState({ email: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
            }}
          />

          <TextInput
            value={password}
            onChangeText={text => this.setState({ password: text })}
          />
        </View>

        <View style={styles.inputContainer}>
          <Image
            style={styles.inputIcon}
            source={{
              uri: "https://png.icons8.com/key-2/ultraviolet/50/3498db"
            }}
          />

          <TextInput
            value={confirmPassword}
            onChangeText={text => this.setState({ confirmPassword: text })}
          />
        </View>

        <TouchableOpacity
          style={[styles.buttonContainer, styles.loginButton]}
          title="Register"
          onPress={() => registerAction(email, password)}
        >
          <Text>Confirm</Text>
          {registerErrorMessage !== null && <Text>{registerErrorMessage}</Text>}
        </TouchableOpacity>
      </View>
    );
  }
}

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
    marginRight: 2

    // justifyContent: 'center'
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
    backgroundColor: "#ec00dc",
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

RegisterComponent.propTypes = {
  registerErrorMessage: PropTypes.string,
  registerAction: PropTypes.func.isRequired,
  styles
};

RegisterComponent.defaultProps = {
  registerErrorMessage: null,
  styles
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
)(RegisterComponent);
