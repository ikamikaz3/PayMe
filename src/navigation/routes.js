import React from "react";
import { Platform } from "react-native";
import PropTypes from "prop-types";

import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import * as screenNames from "./screenNames";

import Register from "../containers/Register";
import Login from "../containers/Login";
// import History from "../containers/History";
// import Profile from "../containers/Profile";

// import Payment from "../containers/Payment";
import Pay from "../containers/Pay";
import Collect from "../containers/Collect";

import Home from "../screens/HomeScreen";
import History from "../screens/HistoryScreen";
import Profile from "../screens/ProfileScreen";
import TabBarIcon from "../components/TabBarIcon";

const HistoryStack = createStackNavigator({
  [screenNames.HISTORY]: History
});
HistoryStack.navigationOptions = {
  tabBarLabel: "History",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-paper" : "md-paper"}
    />
  )
};

const ProfileStack = createStackNavigator({
  [screenNames.PROFILE]: Profile
});
ProfileStack.navigationOptions = {
  tabBarLabel: "Profile",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? "ios-person" : "md-person"}
    />
  )
};

const WalletStack = {
  // [screenNames.HOME]: Home
  screen: createStackNavigator({
    [screenNames.HOME]: { screen: Home },
    [screenNames.PAY]: { screen: Pay },
    [screenNames.COLLECT]: { screen: Collect }
  })
};
WalletStack.navigationOptions = {
  tabBarLabel: "Home",
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === "ios"
          ? `ios-home${focused ? "" : "-outline"}`
          : "md-home"
      }
    />
  )
};

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
          // [screenNames.HISTORY]: { screen: History },
          [screenNames.HISTORY]: HistoryStack,
          [screenNames.PROFILE]: ProfileStack,
          [screenNames.WALLETSTACK]: WalletStack
        },
        {
          order: [
            screenNames.WALLETSTACK,
            screenNames.HISTORY,
            screenNames.PROFILE
          ]
        }
      )
    }
  },
  {
    navigationOptions: () => ({ header: null })
  }
);

WalletStack.propTypes = {
  focused: PropTypes.bool.isRequired
};

export default AppNavigator;
