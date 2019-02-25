import React from "react";
import PropTypes from "prop-types";
import { Text, View, Button } from "react-native";

const Home = props => {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home screen</Text>
    </View>
  );
};

Home.propTypes = {
  navigation: PropTypes.shape({ navigate: PropTypes.func.isRequired })
    .isRequired
};

export default Home;
