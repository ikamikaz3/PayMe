import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import * as screenNames from "./screenNames";

import Register from "../containers/Register";
import Login from "../containers/Login";
import History from "../containers/History";
import Profile from "../containers/Profile";
// import Payment from "../containers/Payment";
import Pay from "../containers/Pay";
import Collect from "../containers/Collect";

import Home from "../screens/HomeScreen";

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
              [screenNames.HOME]: { screen: Home },
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
