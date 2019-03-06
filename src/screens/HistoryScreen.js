import React from "react";
import { connect } from "react-redux";
import { ScrollView, StyleSheet } from "react-native";
import HistEntry from "../components/HistEntry";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: "#fff"
  }
});

class HistoryScreen extends React.Component {
  static navigationOptions = {
    title: "Paiment History",
    headerTitleStyle: {
      flex: 1,
      textAlign: "center"
    }
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        {/* <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" />
        <HistEntry company="MacDonald's" amount={10.99} date="Today" /> */}
      </ScrollView>
    );
  }
}

export default connect(
  null,
  null
)(HistoryScreen);
