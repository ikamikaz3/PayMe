import { NavigationActions } from "react-navigation";

import AppNavigator from "../../navigation/routes";
import * as screenNames from "../../navigation/screenNames";
import { GO_TO_REGISTER, LOGIN_SUCCESS } from "../actions/actionTypes";

const initialNavState = AppNavigator.router.getStateForAction(
  NavigationActions.navigate({
    routeName: screenNames.LOGIN
  })
);

const ActionForLoggedIn = AppNavigator.router.getActionForPathAndParams(
  "mainFlow"
);

const ActionForRegisterScreen = AppNavigator.router.getActionForPathAndParams(
  "loginFlow/Register"
);

const navigationReducer = (state = initialNavState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return AppNavigator.router.getStateForAction(ActionForLoggedIn);
    case GO_TO_REGISTER:
      return AppNavigator.router.getStateForAction(ActionForRegisterScreen);
    default:
      return AppNavigator.router.getStateForAction(action, state) || state;
  }
};

export default navigationReducer;
