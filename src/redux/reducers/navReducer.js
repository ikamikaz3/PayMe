import { NavigationActions, StackActions } from "react-navigation";

import AppNavigator from "../../navigation/routes";
import * as screenNames from "../../navigation/screenNames";
import { LOGIN_SUCCESS } from "../actions/actionTypes";

const initialNavState = AppNavigator.router.getStateForAction(
  NavigationActions.navigate({
    routeName: screenNames.LOGIN
  })
);

const navigationReducer = (state = initialNavState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return AppNavigator.router.getStateForAction(
        NavigationActions.navigate({ routeName: screenNames.HOME })
      );
    default:
      return AppNavigator.router.getStateForAction(action, state) || state;
  }
  /*  switch (action.type) {
    case "@@redux/INIT":
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          actionForLoggedIn,
          stateForLoggedOut
        )
      };
    case "LOGIN_SUCCESS":
      return {
        ...state
      };
    case "LOGOUT":
      return {
        ...state,
        stateForLoggedOut: AppNavigator.router.getStateForAction(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: "Login" })]
          })
        )
      };
    default:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          action,
          state.stateForLoggedIn
        )
      };
  } */
};

export default navigationReducer;
