import React from "react";
import PropTypes from "prop-types";
import { Button, Text, View } from "react-native";

const Main = props => {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Main screen</Text>
      <Button
        title="Go back to Home"
        onPress={() => navigation.navigate("Home")}
      />
    </View>
  );
};

Main.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired
};

export default Main;
