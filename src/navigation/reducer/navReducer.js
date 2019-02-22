import { NavigationActions } from "react-navigation";

import AppNavigator from "../navigators/routes";
import * as screenNames from "../ScreenNames";
import { Login, Logout } from "../actions/actionTypes";

const actionForLoggedOut = AppNavigator.router.getActionForPathAndParams(
  screenNames.LOGIN
);

const actionForLoggedIn = AppNavigator.router.getActionForPathAndParams(
  screenNames.HOME
);

const stateForLoggedIn = AppNavigator.router.getStateForAction({
  actionForLoggedIn
});

const stateForLoggedOut = AppNavigator.router.getStateForAction({
  actionForLoggedOut
});

const initialState = { stateForLoggedOut, stateForLoggedIn };

const navReducer = (state = initialState, action) => {
  switch (action.type) {
    case "@@redux/INIT":
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          actionForLoggedIn,
          stateForLoggedOut
        )
      };
    case Login:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          actionForLoggedIn,
          stateForLoggedOut
        )
      };
    case Logout:
      return {
        ...state,
        stateForLoggedIn,
        stateForLoggedOut
      };
    default:
      return {
        ...state,
        stateForLoggedIn: AppNavigator.router.getStateForAction(
          action,
          state.stateForLoggedIn
        )
      };
  }
};

export default navReducer;
