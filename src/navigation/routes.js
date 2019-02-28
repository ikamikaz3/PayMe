import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import * as screenNames from "./screenNames";

import Register from "../components/Register";
import Login from "../components/Login";
import History from "../components/History";
import Profile from "../components/Profile";
import Payment from "../components/Payment";

const AppNavigator = createStackNavigator({
  loginFlow: {
    screen: createStackNavigator({
      [screenNames.LOGIN]: { screen: Login },
      [screenNames.REGISTER]: { screen: Register }
    })
  },
  mainFlow: {
    screen: createBottomTabNavigator({
      [screenNames.HISTORY]: { screen: History },
      [screenNames.PROFILE]: { screen: Profile },
      [screenNames.PAYMENT]: { screen: Payment }
    })
  }
});

export default AppNavigator;
