import { createStackNavigator } from "react-navigation";

import * as screenNames from "./screenNames";

import Home from "../components/Home";
import Login from "../components/Login";

const AppNavigator = createStackNavigator({
  [screenNames.HOME]: {
    screen: Home
  },
  [screenNames.LOGIN]: {
    screen: Login
  }
});

export default AppNavigator;
