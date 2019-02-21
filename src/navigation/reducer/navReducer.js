import AppNavigator from "../navigators/routes";
import * as screenNames from "../ScreenNames";

const LoginAction = AppNavigator.router.getActionForPathAndParams(
  screenNames.HOME
);

const initialState = AppNavigator.router.getStateForAction({LoginAction});

const navReducer = (state = initialState, action) => {
  const nextState = AppNavigator.router.getStateForAction(action, state);

  // Simply return the original `state` if `nextState` is null or undefined.
  return nextState || state;
};

export default navReducer;
