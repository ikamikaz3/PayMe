import {
  LOGIN_PENDING,
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT
} from "./actionTypes";

function LoginPending(isLoginPending) {
  return {
    type: LOGIN_PENDING,
    isLoginPending
  };
}

function LoginSuccess(isLoginSuccessful) {
  return {
    type: LOGIN_SUCCESS,
    isLoginSuccessful
  };
}

function LoginError(LoginErrorMessage) {
  return {
    type: LOGIN_ERROR,
    LoginErrorMessage
  };
}

export { LoginPending, LoginSuccess, LoginError };
