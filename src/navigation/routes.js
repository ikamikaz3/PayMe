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
import Pay from "../components/Pay";
import Collect from "../components/Collect";

const AppNavigator = createStackNavigator(
  {
    [screenNames.AUTHSTACK]: {
      screen: createStackNavigator({
        [screenNames.LOGIN]: { screen: Login },
        [screenNames.REGISTER]: { screen: Register }
      })
    },
    [screenNames.MAINSTACK]: {
      screen: createBottomTabNavigator(
        {
          [screenNames.HISTORY]: { screen: History },
          [screenNames.PROFILE]: { screen: Profile },
          [screenNames.WALLETSTACK]: {
            screen: createStackNavigator({
              [screenNames.PAYMENT]: { screen: Payment },
              [screenNames.PAY]: { screen: Pay },
              [screenNames.COLLECT]: { screen: Collect }
            })
          }
        },
        {
          order: [
            screenNames.WALLETSTACK,
            screenNames.PROFILE,
            screenNames.HISTORY
          ]
        }
      )
    }
  },
  {
    navigationOptions: () => ({ header: null })
  }
);

export default AppNavigator;
