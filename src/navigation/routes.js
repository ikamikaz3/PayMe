import React, { Component } from "react";
import { connect } from "react-redux";
import {
  createStackNavigator,
  createAppContainer,
  addNavigationHelpers
} from "react-navigation";
import {
  createReactNavigationReduxMiddleware,
  reduxifyNavigator,
  createNavigationReducer
} from "react-navigation-redux-helpers";

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

const initialState = AppNavigator.router.getStateForAction(
  AppNavigator.router.getActionForPathAndParams("Login")
);

console.log(initialState);

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

const navMiddleware = createReactNavigationReduxMiddleware(
  "root",
  state => state.nav
);

const App = reduxifyNavigator(AppNavigator, "root");

const mapStateToProps = state => ({
  state: state.nav
});

const AppWithNavigationState = connect(mapStateToProps)(App);

export { AppWithNavigationState, navMiddleware, navReducer };
