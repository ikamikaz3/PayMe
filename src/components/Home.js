import React from "react";
import { Text, View, Button } from "react-native";

const Home = props => {
  const { navigation } = props;
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>Home screen</Text>
      <Button title="Go to Main" onPress={() => navigation.navigate("Main")} />
    </View>
  );
};

export default Home;
