import { createSwitchNavigator, createStackNavigator } from "react-navigation";
import * as screenNames from "../ScreenNames";

// Screens
import Home from "../../components/Home";
import Main from "../../components/Main";
import Login from "../../components/Login";

const stackNavigator = createStackNavigator(
  {
    [screenNames.LOGIN]: {
      screen: Login
    },
    [screenNames.HOME]: {
      screen: Home
    },
    [screenNames.MAIN]: {
      screen: Main
    }
  },
  {
    initialRouteName: screenNames.LOGIN
  }
);

export default createSwitchNavigator({
  stackNavigator
});
