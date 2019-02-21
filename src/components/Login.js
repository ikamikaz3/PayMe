import React from "react";
import PropTypes from "prop-types";
import { Text, View, Button } from "react-native";

const Login = props => {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Login Screen</Text>
      <Button title="Go to Home" onPress={() => navigation.navigate("Home")} />
    </View>
  );
};

Login.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired
};

export default Login;
