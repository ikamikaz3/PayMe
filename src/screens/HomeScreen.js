import React from "react";
import { StyleSheet, View } from "react-native";
import { connect } from "react-redux";

import AppText from "../components/AppText";
// import Contact from "../components/Contact";
import MoneyButton from "../components/MoneyButton";

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: "#f7faff"
  },
  container: {
    flex: 1,
    marginLeft: 25,
    marginRight: 25,
    marginTop: 25,
    marginBottom: 25,
    flexDirection: "column",
    justifyContent: "space-evenly"
  },
  balance: {
    flex: 0.6,
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: 25,
    borderWidth: 0.5,
    borderRadius: 10,
    backgroundColor: "#fff"
  },
  buttonsLayout: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  // contacts: {
  //   flexDirection: "row",
  //   marginTop: 20,
  //   marginBottom: 20,
  //   justifyContent: "space-evenly"
  // },
  text: {
    marginLeft: 5,
    fontSize: 24
  }
});

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "MyDigiPay",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center"
    }
  };

  render() {
    return (
      <View style={styles.page}>
        <View style={styles.container}>
          <View style={styles.balance}>
            <AppText>Current Balance</AppText>
            <AppText>1000</AppText>
          </View>
          {/* <AppText style={styles.text}>Send to recent contact:</AppText>
          <Contact /> */}
          <View style={styles.buttonsLayout}>
            <MoneyButton type="pay" />
            <MoneyButton type="collect" />
          </View>
        </View>
      </View>
    );
  }
}

// const mapStateToProps = state => ({
//   isLoginPending: state.authReducer.isLoginPending,
//   isLoginSuccessful: state.authReducer.isLoginSuccessful,
//   loginErrorMessage: state.authReducer.loginErrorMessage
// });

// const mapDispatchToProps = dispatch => ({
//   loginAction: (email, password) => dispatch(login(email, password)),
//   goToRegisterAction: () => dispatch(goToRegister())
// });

export default connect(
  null,
  null
)(HomeScreen);
